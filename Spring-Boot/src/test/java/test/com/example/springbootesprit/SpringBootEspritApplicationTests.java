package test.com.example.springbootesprit;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(classes = com.example.springbootesprit.SpringBootEspritApplication.class)
public class SpringBootEspritApplicationTests {

    @Test
    void contextLoads() {
        // Ajoutez une assertion pour vérifier que le contexte se charge correctement
        assertTrue(true); // Changez ceci en l'assertion appropriée pour votre test
    }
}
