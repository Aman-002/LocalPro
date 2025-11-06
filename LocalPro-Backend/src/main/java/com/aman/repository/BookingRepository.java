package com.aman.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.aman.entity.Booking;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findByUserId(Integer userId);
    List<Booking> findByProviderId(Integer providerId);
}
