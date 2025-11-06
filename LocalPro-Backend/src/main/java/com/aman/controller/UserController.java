package com.aman.controller;

import com.aman.entity.User;
import com.aman.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(value="/createUser")
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

}

