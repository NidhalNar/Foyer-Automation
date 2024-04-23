package com.example.springbootesprit.repositories;

import com.example.springbootesprit.entities.Genre;
import com.example.springbootesprit.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {
     //Optional<User> findByFirstname(String username);
     //Boolean existsByFirstname(String firstname);
     Optional<User> findByEmail(String email);
     Boolean existsByEmail(String email);

     User findUserByEmail(String email);

     User findUsesByEmail(String email);
     List<User> findAllByGenderAndIdNot(Genre gender, Integer id);

}
