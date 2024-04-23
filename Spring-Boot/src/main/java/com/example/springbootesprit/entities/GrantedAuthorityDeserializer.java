package com.example.springbootesprit.entities;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.security.core.GrantedAuthority;

import java.io.IOException;
import java.lang.annotation.Annotation;

public class GrantedAuthorityDeserializer extends JsonDeserializer<GrantedAuthority> {
    @Override
    public GrantedAuthority deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, IOException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        return null; // À adapter en fonction de votre logique
    }



}