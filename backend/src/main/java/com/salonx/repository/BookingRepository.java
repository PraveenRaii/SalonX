package com.salonx.repository;

import com.salonx.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, String> {
    List<Booking> findByCustomerIdOrderByCreatedAtDesc(Long customerId);
    List<Booking> findBySalonIdOrderByCreatedAtDesc(String salonId);
    boolean existsBySalonIdAndScheduledDateAndScheduledTimeAndStylistIdAndStatus(
        String salonId, String scheduledDate, String scheduledTime, String stylistId, String status
    );
}
