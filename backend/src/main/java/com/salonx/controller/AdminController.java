package com.salonx.controller;

import com.salonx.model.Booking;
import com.salonx.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final BookingService bookingService;

    public AdminController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getPlatformStats() {
        List<Booking> allBookings = bookingService.getAllBookings();
        int totalGMV = allBookings.stream().mapToInt(Booking::getTotalAmount).sum();
        int platformCommission = (int) Math.round(totalGMV * 0.12);

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalBookings", allBookings.size());
        stats.put("totalGMV", totalGMV);
        stats.put("platformCommission", platformCommission);
        stats.put("activeSalonsCount", 6);
        stats.put("activeUsersCount", 1240);

        return ResponseEntity.ok(stats);
    }
}
