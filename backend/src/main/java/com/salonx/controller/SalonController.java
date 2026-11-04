package com.salonx.controller;

import com.salonx.model.Salon;
import com.salonx.service.SalonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salons")
public class SalonController {

    private final SalonService salonService;

    public SalonController(SalonService salonService) {
        this.salonService = salonService;
    }

    @GetMapping
    public ResponseEntity<List<Salon>> getSalons(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) Double minRating,
            @RequestParam(required = false) Double maxDistance,
            @RequestParam(required = false) Boolean openNow,
            @RequestParam(required = false, defaultValue = "popularity") String sortBy
    ) {
        List<Salon> salons = salonService.getAllSalons(search, category, gender, minRating, maxDistance, openNow, sortBy);
        return ResponseEntity.ok(salons);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Salon> getSalonById(@PathVariable String id) {
        Salon salon = salonService.getSalonById(id);
        return ResponseEntity.ok(salon);
    }
}
