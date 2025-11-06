package com.aman.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aman.entity.Booking;
import com.aman.entity.User;
import com.aman.entity.Provider;
import com.aman.repository.BookingRepository;
import com.aman.repository.UserRepository;
import com.aman.repository.ProviderRepository;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProviderRepository providerRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {

        User user = userRepository.findById(booking.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Provider provider = providerRepository.findById(booking.getProvider().getId())
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        Booking newBooking = new Booking();
        newBooking.setUser(user);
        newBooking.setProvider(provider);
        newBooking.setBookingTime(LocalDateTime.now());
        newBooking.setStatus("Pending");
        newBooking.setDescription(booking.getDescription());
        newBooking.setPrice(booking.getPrice());
        newBooking.setBookingDate(booking.getBookingDate());
        newBooking.setExpectedTime(booking.getExpectedTime());

        bookingRepository.save(newBooking);

        return ResponseEntity.ok("Booking created successfully");
    }
    
    
    @GetMapping("/my-bookings")
    public ResponseEntity<List<Booking>> getUserBookings(@RequestParam() Integer userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        return ResponseEntity.ok(bookings);
    }
    
    @GetMapping("/my-requests")
    public ResponseEntity<List<Booking>> getProviderBookings(@RequestParam() Integer userId) {
    	 Provider provider = providerRepository.findByUserId(userId)
    	            .orElseThrow(() -> new RuntimeException("Provider not found"));
        List<Booking> bookings = bookingRepository.findByProviderId(provider.getId());
        return ResponseEntity.ok(bookings);
    }
    
    @PostMapping("/accept")
    public ResponseEntity<?> acceptBooking(@RequestBody Booking bookingRequest) {
        Booking booking = bookingRepository.findById(bookingRequest.getId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(bookingRequest.getStatus());

        bookingRepository.save(booking);

        return ResponseEntity.ok("Booking status updated successfully");
    }
    
    @PostMapping("/cancel")
    public ResponseEntity<?> cancelBooking(@RequestBody Booking bookingRequest) {
        Booking booking = bookingRepository.findById(bookingRequest.getId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(bookingRequest.getStatus());

        bookingRepository.save(booking);

        return ResponseEntity.ok("Booking status updated successfully");
    }
    
}
