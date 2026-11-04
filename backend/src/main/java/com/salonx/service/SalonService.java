package com.salonx.service;

import com.salonx.model.Salon;
import com.salonx.repository.SalonRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SalonService {

    private final SalonRepository salonRepository;

    public SalonService(SalonRepository salonRepository) {
        this.salonRepository = salonRepository;
    }

    public List<Salon> getAllSalons(String search, String category, String gender, Double minRating, Double maxDistance, Boolean openNow, String sortBy) {
        List<Salon> salons = salonRepository.findAll();

        return salons.stream()
                .filter(s -> {
                    if (search != null && !search.trim().isEmpty()) {
                        String q = search.toLowerCase();
                        boolean matchName = s.getName().toLowerCase().contains(q);
                        boolean matchAddress = s.getAddress().toLowerCase().contains(q);
                        boolean matchService = s.getServices().stream().anyMatch(srv -> srv.getName().toLowerCase().contains(q));
                        if (!matchName && !matchAddress && !matchService) return false;
                    }
                    if (category != null && !category.equalsIgnoreCase("all")) {
                        boolean hasCat = s.getServices().stream().anyMatch(srv -> srv.getCategory().equalsIgnoreCase(category));
                        if (!hasCat) return false;
                    }
                    if (gender != null && !gender.equalsIgnoreCase("all")) {
                        if (!s.getGender().equalsIgnoreCase("unisex") && !s.getGender().equalsIgnoreCase(gender)) {
                            return false;
                        }
                    }
                    if (minRating != null && minRating > 0) {
                        if (s.getRating() < minRating) return false;
                    }
                    if (maxDistance != null && maxDistance > 0) {
                        if (s.getDistanceKm() > maxDistance) return false;
                    }
                    if (openNow != null && openNow) {
                        if (!s.getIsOpenNow()) return false;
                    }
                    return true;
                })
                .sorted((a, b) -> {
                    if ("rating".equalsIgnoreCase(sortBy)) {
                        return Double.compare(b.getRating(), a.getRating());
                    } else if ("distance".equalsIgnoreCase(sortBy)) {
                        return Double.compare(a.getDistanceKm(), b.getDistanceKm());
                    } else if ("price_low".equalsIgnoreCase(sortBy)) {
                        return Integer.compare(a.getStartingPrice(), b.getStartingPrice());
                    }
                    return Integer.compare(b.getReviewCount(), a.getReviewCount());
                })
                .collect(Collectors.toList());
    }

    public Salon getSalonById(String id) {
        return salonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Salon not found with id: " + id));
    }
}
