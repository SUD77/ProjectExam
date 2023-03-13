package com.exam.service;

import com.exam.entity.User;
import com.exam.entity.UserRole;

import java.util.Set;

public interface UserService {

    //creating user
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;

    public User getUser(String userName) throws Exception;

    public void deleteUser(Long userId);

    public void deleteUserByUserName(String userName);

    public void update(User userDto) throws Exception;
}
