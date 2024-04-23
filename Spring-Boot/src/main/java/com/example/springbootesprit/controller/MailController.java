package com.example.springbootesprit.controller;

import com.example.springbootesprit.entities.MailStructure;
import com.example.springbootesprit.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mail")
@CrossOrigin(origins = "http://192.168.43.129:4200")


public class MailController {

    @Autowired
    private MailService mailService;
    @PostMapping("/send/{mail}")
    public String sendMail(@PathVariable String mail, @RequestBody MailStructure mailStructure){
mailService.sendMail(mail,mailStructure);
return "Successful send the mail !!";
    }
}
