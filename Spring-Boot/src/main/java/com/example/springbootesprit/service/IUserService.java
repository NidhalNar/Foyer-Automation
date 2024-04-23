package com.example.springbootesprit.service;

import com.example.springbootesprit.entities.User;

import java.util.List;

public interface IUserService {
    List<User> retrieveAllUsers();

    User addUser(User u);

    User updateUser(User u);
    User findUserByEmail(String email);
    User retrieveUser(Integer id);
    void removeUser(Integer id);


  void deleteUserByEmail(String email);
    List<User> getUsersPag(Integer pageNo, Integer pageSize) ;
    public long countUsersWithReservations() ;
    public long countTotalUsers() ;
}
