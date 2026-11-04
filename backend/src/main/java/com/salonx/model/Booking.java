package com.salonx.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    private String id;

    private String salonId;
    private String salonName;
    private String salonAddress;
    private String salonCover;

    private Long customerId;
    private String customerName;
    private String customerPhone;

    private String stylistId;
    private String stylistName;
    private String stylistAvatar;

    private String scheduledDate;
    private String scheduledTime;
    private Integer totalDuration = 45;

    private Integer subtotal = 0;
    private Integer discount = 0;
    private Integer taxes = 0;
    private Integer convenienceFee = 30;
    private Integer totalAmount = 0;

    private String paymentMethod = "ONLINE_RAZORPAY"; // ONLINE_RAZORPAY, PAY_AT_SALON
    private String paymentStatus = "PAID"; // PAID, PENDING_SALON
    private String status = "CONFIRMED"; // CONFIRMED, COMPLETED, CANCELLED

    @Column(length = 1000)
    private String notes;

    private String cancellationReason;

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BookingItem> items = new ArrayList<>();

    public Booking() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSalonId() { return salonId; }
    public void setSalonId(String salonId) { this.salonId = salonId; }

    public String getSalonName() { return salonName; }
    public void setSalonName(String salonName) { this.salonName = salonName; }

    public String getSalonAddress() { return salonAddress; }
    public void setSalonAddress(String salonAddress) { this.salonAddress = salonAddress; }

    public String getSalonCover() { return salonCover; }
    public void setSalonCover(String salonCover) { this.salonCover = salonCover; }

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }

    public String getStylistId() { return stylistId; }
    public void setStylistId(String stylistId) { this.stylistId = stylistId; }

    public String getStylistName() { return stylistName; }
    public void setStylistName(String stylistName) { this.stylistName = stylistName; }

    public String getStylistAvatar() { return stylistAvatar; }
    public void setStylistAvatar(String stylistAvatar) { this.stylistAvatar = stylistAvatar; }

    public String getScheduledDate() { return scheduledDate; }
    public void setScheduledDate(String scheduledDate) { this.scheduledDate = scheduledDate; }

    public String getScheduledTime() { return scheduledTime; }
    public void setScheduledTime(String scheduledTime) { this.scheduledTime = scheduledTime; }

    public Integer getTotalDuration() { return totalDuration; }
    public void setTotalDuration(Integer totalDuration) { this.totalDuration = totalDuration; }

    public Integer getSubtotal() { return subtotal; }
    public void setSubtotal(Integer subtotal) { this.subtotal = subtotal; }

    public Integer getDiscount() { return discount; }
    public void setDiscount(Integer discount) { this.discount = discount; }

    public Integer getTaxes() { return taxes; }
    public void setTaxes(Integer taxes) { this.taxes = taxes; }

    public Integer getConvenienceFee() { return convenienceFee; }
    public void setConvenienceFee(Integer convenienceFee) { this.convenienceFee = convenienceFee; }

    public Integer getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Integer totalAmount) { this.totalAmount = totalAmount; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getCancellationReason() { return cancellationReason; }
    public void setCancellationReason(String cancellationReason) { this.cancellationReason = cancellationReason; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<BookingItem> getItems() { return items; }
    public void setItems(List<BookingItem> items) { this.items = items; }
}
