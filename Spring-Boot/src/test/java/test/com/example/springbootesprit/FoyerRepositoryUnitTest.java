package test.com.example.springbootesprit;
import com.example.springbootesprit.entities.Foyer;
import com.example.springbootesprit.entities.TypeFoyer;
import com.example.springbootesprit.repositories.FoyerRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.NoSuchElementException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(SpringExtension.class)
public class FoyerRepositoryUnitTest {
    @Mock
    FoyerRepository universiteRepository;

    @BeforeEach
    void setUp() {
        //        Foyer foyer1 = new Foyer(20L, "Foyer1", 100L, TypeFoyer.FEMMES);
        universiteRepository.save(new Foyer(1L, "esprit",100L, TypeFoyer.FEMMES));
        universiteRepository.save(new Foyer(2L, "nidhal",100L, TypeFoyer.HOMMES));
    }

    @AfterEach
    void destroy() {
        universiteRepository.deleteAll();
    }

    @Test
    void testGetInvalidUniversite() {
        assertThrows(NoSuchElementException.class, () -> {
            universiteRepository.findById(1L).get();
        });
    }

    @Test
    void testDeleteUniversite() {
        Foyer saved = new Foyer(3L, "esprit",100L, TypeFoyer.FEMMES);
        universiteRepository.save(saved);
        universiteRepository.delete(saved);

        assertThrows(NoSuchElementException.class, () -> {
            universiteRepository.findById(3L).get();
        });
    }

}
