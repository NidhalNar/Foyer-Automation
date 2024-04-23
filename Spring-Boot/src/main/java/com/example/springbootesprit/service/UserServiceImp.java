package com.example.springbootesprit.service;

import com.example.springbootesprit.entities.User;
import com.example.springbootesprit.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImp implements IUserService {
    UserRepository userRepository;

    @Override
    public List<User> retrieveAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User addUser(User u) {
        return userRepository.save(u);
    }

    @Override
    public User updateUser(User u) {

        return userRepository.save(u);
    }


    @Override
    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Override
    public User retrieveUser(Integer id) {
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.orElse(null);
    }

//
//    @Override
//    public User retrieveUserByEmail(String email) {
//        return userRepository.findUserByEmail(email);
//    };

    @Override
    public void removeUser(Integer id) {
        userRepository.deleteById(id);

    }
    public void deleteUserByEmail(String email) {
        User user = userRepository.findUsesByEmail(email);
        if (user != null) {
            userRepository.delete(user);
            System.out.println("Utilisateur supprimé avec succès: " + user.getEmail());
        } else {
            System.out.println("Utilisateur non trouvé pour l'e-mail: " + email);
            throw new RuntimeException("Utilisateur non trouvé pour l'e-mail: " + email);
        }
    }
    @Override
    public List<User> getUsersPag(Integer pageNo, Integer pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);
        Page<User> pagedResult = userRepository.findAll(paging);


        if (pagedResult.hasContent()){
            return pagedResult.getContent();
        }
        else {
            return new ArrayList<User>();
        }
    }
    @Override
    public long countTotalUsers() {
        return userRepository.count();
    }

    @Override
    public long countUsersWithReservations() {
        return userRepository.findAll().stream()
                .filter(user -> user.getReservation() != null && !user.getReservation().isEmpty())
                .count();
    }

}
