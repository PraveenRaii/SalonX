package com.salonx.repository;

import com.salonx.model.Salon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalonRepository extends JpaRepository<Salon, String> {
    List<Salon> findByFeaturedTrue();
    List<Salon> findByCityIgnoreCase(String city);
}
