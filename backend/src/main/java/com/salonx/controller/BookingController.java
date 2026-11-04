package com.salonx.controller;

import com.salonx.dto.BookingDTOs.*;
import com.salonx.model.Booking;
import com.salonx.model.User;
import com.salonx.service.AuthService;
import com.salonx.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;
    private final AuthService authService;

    public BookingController(BookingService bookingService, AuthService authService) {
        this.bookingService = bookingService;
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@AuthenticationPrincipal UserDetails userDetails,
                                           @RequestBody CreateBookingRequest request) {
        try {
            User user = authService.getUserByEmail(userDetails.getUsername());
            Booking booking = bookingService.createBooking(user, request);
            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            Map<String, String> err = new HashMap<>();
            err.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(err);
        }
    }

    @GetMapping("/my")
    public ResponseEntity<List<Booking>> getMyBookings(@AuthenticationPrincipal UserDetails userDetails) {
        User user = authService.getUserByEmail(userDetails.getUsername());
        List<Booking> list = bookingService.getCustomerBookings(user.getId());
        return ResponseEntity.ok(list);
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelBooking(@PathVariable String id, @RequestBody CancelRequest request) {
        try {
            Booking booking = bookingService.cancelBooking(id, request.getReason());
            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/reschedule")
    public ResponseEntity<?> rescheduleBooking(@PathVariable String id, @RequestBody RescheduleRequest request) {
        try {
            Booking booking = bookingService.rescheduleBooking(id, request.getNewDate(), request.getNewTime());
            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
