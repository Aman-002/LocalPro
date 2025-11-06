package com.aman.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aman.entity.Provider;
import com.aman.entity.User;
import com.aman.repository.ProviderRepository;
import com.aman.repository.UserRepository;

@RestController
@RequestMapping("/api/providers")
@CrossOrigin(origins = "http://localhost:3000")
public class ProviderController {

    @Autowired
    private ProviderRepository providerRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/setup")
    public ResponseEntity<?> setupProviderProfile(@RequestBody Provider providerData) {

        User user = userRepository.findByUserEmail(providerData.getUser().getUserEmail());
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (providerRepository.findByUser(user).isPresent()) {
            return ResponseEntity.badRequest().body("Provider profile already exists");
        }

        // ✅ Create new provider profile
        Provider provider = new Provider();
        provider.setUser(user);
        provider.setBio(providerData.getBio());
        provider.setHourlyRate(providerData.getHourlyRate());
        provider.setExperienceYears(providerData.getExperienceYears());
        provider.setProfileImageUrl(providerData.getProfileImageUrl());
        provider.setAvailableDays(providerData.getAvailableDays());
        provider.setCategoryId(providerData.getCategoryId());

        providerRepository.save(provider);
        return ResponseEntity.ok("Provider profile created successfully");
    }
    
    @GetMapping("/all")
    public ResponseEntity<?> getAllProviders() {
        return ResponseEntity.ok(providerRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getProviderById(@PathVariable Integer id) {
        return providerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    
}
