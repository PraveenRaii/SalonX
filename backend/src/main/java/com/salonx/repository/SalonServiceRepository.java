package com.salonx.repository;

import com.salonx.model.SalonServiceItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalonServiceRepository extends JpaRepository<SalonServiceItem, String> {
    List<SalonServiceItem> findBySalonId(String salonId);
    List<SalonServiceItem> findByCategoryIgnoreCase(String category);
}
