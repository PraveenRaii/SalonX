package com.salonx.repository;

import com.salonx.model.Stylist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StylistRepository extends JpaRepository<Stylist, String> {
    List<Stylist> findBySalonId(String salonId);
}
