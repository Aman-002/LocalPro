package com.aman.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aman.entity.User;
import com.aman.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
	@Autowired
	private UserService userService;
	
	 @PostMapping(value="/register")
	 public User register(@RequestBody User user) {
		 return userService.saveUser(user);
	}
	 
	 @PostMapping(value="/login")
	 public ResponseEntity<?> login(@RequestBody User user) {
		 Map<String,Object> response =userService.login(user);
		 return ResponseEntity.ok(response);
	 }
}









