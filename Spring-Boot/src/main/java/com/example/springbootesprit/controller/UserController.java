package com.example.springbootesprit.controller;


import com.example.springbootesprit.entities.Chambre;
import com.example.springbootesprit.entities.Reservation;
import com.example.springbootesprit.entities.User;
import com.example.springbootesprit.repositories.ChambreRepository;
import com.example.springbootesprit.repositories.UserRepository;
import com.example.springbootesprit.service.ChambreService;
import com.example.springbootesprit.service.IUserService;
import com.example.springbootesprit.service.UserServiceImp;
import com.example.springbootesprit.utils.ExportExcelUserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.util.*;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
@CrossOrigin(origins = "http://192.168.43.129:4200")


public class UserController {
    IUserService iUserService;
    private final UserRepository userRepository;
    ChambreRepository chambreRepository;
    ExportExcelUserService exportExcelUserService;
    UserServiceImp userServiceImp;
    @Autowired
    private ChambreService chambreService;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/retrieve-all-users")
    public List<User> getUsers() {
        List<User> listUsers = iUserService.retrieveAllUsers();
        return listUsers;
    }

    @GetMapping("/retrieve-user/{user-id}")
    public User retrieveUser(@PathVariable("user-id") Integer id) {
        return iUserService.retrieveUser(id);
    }


    @GetMapping("/retrieve-user-by-email")
    public User retrieveUserbyEmail(@RequestParam("email") String email) {
        User user = iUserService.findUserByEmail(email);
        return user;
    }
    @DeleteMapping("/remove-user-by-email/{email}")
    public void removeUserByEmail(@PathVariable String email) {
     iUserService.deleteUserByEmail(email);
    }
    @DeleteMapping("/remove-user/{user-id}")
    public void removeUser(@PathVariable("user-id") Integer id) {
        iUserService.removeUser(id);
    }


    @PutMapping("/update/{email}")
    public ResponseEntity<User> replaceUser(@RequestBody User newUser, @PathVariable String email) {


        return userRepository.findByEmail(email)
                .map(user -> {
                    user.setFirstname(newUser.getFirstname());
                    user.setLastname(newUser.getLastname());
                    user.setCin(newUser.getCin());
                    user.setEcole(newUser.getEcole());
                    user.setPassword(passwordEncoder.encode(newUser.getPassword()));
                    user.setEmail(newUser.getEmail());
                    return ResponseEntity.ok(userRepository.save(user));
                })
                .orElseGet(() -> {
                    newUser.setEmail(email);
                    return ResponseEntity.ok(userRepository.save(newUser));
                });
    }
    @GetMapping("/reservations/{id}")
    public ResponseEntity<Set<Chambre>> getChambresForEtudiant(@PathVariable Integer id) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            List<Reservation> reservations = optionalUser.get().getReservation();

            Set<Chambre> chambres = new HashSet<>();
            for (Reservation reservation : reservations) {
                List<Chambre> chambresDeLaReservation = chambreRepository.findByReservationsIdReservation(reservation.getIdReservation());
                chambres.addAll(chambresDeLaReservation);
            }

            chambres.forEach(chambre -> {
                Chambre detailedChambre = chambreService.retrieveChambre(chambre.getIdChambre());

            });

            return new ResponseEntity<>(chambres, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/export-excel")
    public ResponseEntity<byte[]> exportStudentsToExcel() {
        try {

            List<User> users = userServiceImp.retrieveAllUsers();
            ByteArrayOutputStream excelStream = exportExcelUserService.generateUsersExcelReport(users);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "users.xlsx");
            return ResponseEntity.ok().headers(headers).body(excelStream.toByteArray());
        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.status(500).body(null);
        }
    }
    @GetMapping("/export-excel/{userId}")
    public ResponseEntity<byte[]> exportUserToExcel(@PathVariable Integer userId) {
        try {
            // Retrieve the user by ID
            User user = userServiceImp.retrieveUser(userId);

            if (user == null) {
                // Return a 404 Not Found response if the user is not found
                return ResponseEntity.notFound().build();
            }

            // Create a list with a single user
            List<User> users = Collections.singletonList(user);

            ByteArrayOutputStream excelStream = exportExcelUserService.generateUsersExcelReport(users);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "user_" + userId + ".xlsx");

            return ResponseEntity.ok().headers(headers).body(excelStream.toByteArray());
        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.status(500).body(null);
        }
    }

    //*******************************************Pagination************************************
    @GetMapping("/page")
    public ResponseEntity<List<User>> getPagination(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize
    ) {
        List<User> list = userServiceImp.getUsersPag(pageNo, pageSize);
        return new ResponseEntity<List<User>>(list, new HttpHeaders(), HttpStatus.OK);

    }

    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Long>> getUserStatistics() {
        long totalUsers = userServiceImp.countTotalUsers();
        long UsersWithReservations = userServiceImp.countUsersWithReservations();

        Map<String, Long> statistics = new HashMap<>();
        statistics.put("totalEtudiants", totalUsers);
        statistics.put("etudiantsWithReservations", UsersWithReservations);

        return ResponseEntity.ok(statistics);
    }

}









