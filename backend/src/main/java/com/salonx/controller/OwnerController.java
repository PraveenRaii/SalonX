package com.salonx.controller;

import com.salonx.model.Booking;
import com.salonx.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/owner")
public class OwnerController {

    private final BookingService bookingService;

    public OwnerController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/overview")
    public ResponseEntity<Map<String, Object>> getOverview(@RequestParam(defaultValue = "salon-1") String salonId) {
        List<Booking> bookings = bookingService.getSalonBookings(salonId);
        int totalEarnings = bookings.stream().mapToInt(Booking::getTotalAmount).sum();

        Map<String, Object> stats = new HashMap<>();
        stats.put("salonId", salonId);
        stats.put("totalBookings", bookings.size());
        stats.put("totalEarnings", totalEarnings);
        stats.put("bookings", bookings);

        return ResponseEntity.ok(stats);
    }
}
