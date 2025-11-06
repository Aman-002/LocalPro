package com.aman.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.aman.entity.Provider;
import com.aman.entity.User;
import com.aman.repository.ProviderRepository;

@Service
public class ProviderService {

    @Autowired
    private ProviderRepository profileRepo;

    public Provider createOrUpdateProfile(Provider profile) {
        return profileRepo.save(profile);
    }

    public Optional<Provider> getProfileByUserId(User user) {
        return profileRepo.findByUser(user);
    }
}
