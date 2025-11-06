package com.aman.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.aman.entity.Provider;
import com.aman.entity.User;

import java.util.Optional;

public interface ProviderRepository extends JpaRepository<Provider, Integer> {
    Optional<Provider> findByUser(User user);
    Optional<Provider> findByUserId(Integer id);
}
