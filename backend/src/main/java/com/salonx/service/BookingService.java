package com.salonx.service;

import com.salonx.dto.BookingDTOs.*;
import com.salonx.model.*;
import com.salonx.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final SalonRepository salonRepository;
    private final SalonServiceRepository serviceRepository;
    private final StylistRepository stylistRepository;
    private final CouponRepository couponRepository;

    public BookingService(BookingRepository bookingRepository,
                          SalonRepository salonRepository,
                          SalonServiceRepository serviceRepository,
                          StylistRepository stylistRepository,
                          CouponRepository couponRepository) {
        this.bookingRepository = bookingRepository;
        this.salonRepository = salonRepository;
        this.serviceRepository = serviceRepository;
        this.stylistRepository = stylistRepository;
        this.couponRepository = couponRepository;
    }

    @Transactional
    public Booking createBooking(User customer, CreateBookingRequest request) {
        Salon salon = salonRepository.findById(request.getSalonId())
                .orElseThrow(() -> new RuntimeException("Salon not found"));

        // Double Booking Prevention
        boolean alreadyBooked = bookingRepository.existsBySalonIdAndScheduledDateAndScheduledTimeAndStylistIdAndStatus(
                request.getSalonId(),
                request.getScheduledDate(),
                request.getScheduledTime(),
                request.getStylistId(),
                "CONFIRMED"
        );

        if (alreadyBooked) {
            throw new RuntimeException("This stylist and time slot is already booked. Please choose another slot.");
        }

        // Stylist Details
        String stylistName = "Any Available Stylist";
        String stylistAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";
        if (request.getStylistId() != null && !request.getStylistId().equalsIgnoreCase("any")) {
            Stylist stylist = stylistRepository.findById(request.getStylistId()).orElse(null);
            if (stylist != null) {
                stylistName = stylist.getName();
                stylistAvatar = stylist.getAvatar();
            }
        }

        // Compute Subtotal and Duration
        List<SalonServiceItem> services = serviceRepository.findAllById(request.getServiceIds());
        if (services.isEmpty()) {
            throw new RuntimeException("Please select at least one valid service.");
        }

        int subtotal = services.stream().mapToInt(SalonServiceItem::getPrice).sum();
        int totalDuration = services.stream().mapToInt(SalonServiceItem::getDurationMinutes).sum();

        // Calculate Discount
        int discount = 0;
        if (request.getCouponCode() != null && !request.getCouponCode().trim().isEmpty()) {
            Coupon coupon = couponRepository.findByCodeIgnoreCaseAndActiveTrue(request.getCouponCode().trim()).orElse(null);
            if (coupon != null && subtotal >= coupon.getMinBookingAmount()) {
                if (coupon.getDiscountPercent() != null) {
                    discount = (subtotal * coupon.getDiscountPercent()) / 100;
                    if (coupon.getMaxDiscount() != null) {
                        discount = Math.min(discount, coupon.getMaxDiscount());
                    }
                } else if (coupon.getDiscountAmount() != null) {
                    discount = coupon.getDiscountAmount();
                }
            }
        }

        int discounted = Math.max(0, subtotal - discount);
        int taxes = (int) Math.round(discounted * 0.05); // 5% GST
        int convenienceFee = 30;
        int totalAmount = discounted + taxes + convenienceFee;

        // Generate Booking
        String bookingId = "SX-" + (10000 + new Random().nextInt(90000));
        Booking booking = new Booking();
        booking.setId(bookingId);
        booking.setSalonId(salon.getId());
        booking.setSalonName(salon.getName());
        booking.setSalonAddress(salon.getAddress());
        booking.setSalonCover(salon.getCoverImage());

        booking.setCustomerId(customer.getId());
        booking.setCustomerName(customer.getName());
        booking.setCustomerPhone(customer.getPhone());

        booking.setStylistId(request.getStylistId());
        booking.setStylistName(stylistName);
        booking.setStylistAvatar(stylistAvatar);

        booking.setScheduledDate(request.getScheduledDate());
        booking.setScheduledTime(request.getScheduledTime());
        booking.setTotalDuration(totalDuration);

        booking.setSubtotal(subtotal);
        booking.setDiscount(discount);
        booking.setTaxes(taxes);
        booking.setConvenienceFee(convenienceFee);
        booking.setTotalAmount(totalAmount);

        booking.setPaymentMethod(request.getPaymentMethod());
        booking.setPaymentStatus("ONLINE_RAZORPAY".equalsIgnoreCase(request.getPaymentMethod()) ? "PAID" : "PENDING_SALON");
        booking.setStatus("CONFIRMED");
        booking.setNotes(request.getNotes());
        booking.setCreatedAt(LocalDateTime.now());

        // Add Booking Items
        for (SalonServiceItem s : services) {
            BookingItem item = new BookingItem(booking, s.getId(), s.getName(), s.getPrice(), s.getDurationMinutes());
            booking.getItems().add(item);
        }

        return bookingRepository.save(booking);
    }

    public List<Booking> getCustomerBookings(Long customerId) {
        return bookingRepository.findByCustomerIdOrderByCreatedAtDesc(customerId);
    }

    public List<Booking> getSalonBookings(String salonId) {
        return bookingRepository.findBySalonIdOrderByCreatedAtDesc(salonId);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Transactional
    public Booking cancelBooking(String bookingId, String reason) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + bookingId));
        booking.setStatus("CANCELLED");
        booking.setCancellationReason(reason);
        return bookingRepository.save(booking);
    }

    @Transactional
    public Booking rescheduleBooking(String bookingId, String newDate, String newTime) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + bookingId));
        booking.setScheduledDate(newDate);
        booking.setScheduledTime(newTime);
        return bookingRepository.save(booking);
    }
}
