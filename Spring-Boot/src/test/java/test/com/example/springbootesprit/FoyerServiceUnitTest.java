package test.com.example.springbootesprit;


import com.example.springbootesprit.entities.Foyer;
import com.example.springbootesprit.entities.TypeFoyer;
import com.example.springbootesprit.repositories.FoyerRepository;
import com.example.springbootesprit.service.FoyerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
public class FoyerServiceUnitTest {
    @Mock
    FoyerRepository universiteRepository;

    @InjectMocks
    FoyerService iUniversiteService;

    @BeforeEach
    public void setup() {

    }

    @Test
    void testRetrieveAllFoyers() {
        Foyer foyer1 = new Foyer(1L, "Foyer1", 100L, TypeFoyer.FEMMES);
        Foyer foyer2 = new Foyer(2L, "Foyer2", 102L, TypeFoyer.HOMMES);
        when(universiteRepository.findAll()).thenReturn(Arrays.asList(foyer1, foyer2));
        List<Foyer> universiteList = iUniversiteService.retrieveAllFoyers();
        assertEquals(2, universiteList.size());
        assertEquals("Foyer1", universiteList.get(0).getNomFoyer());
        assertEquals("Foyer2", universiteList.get(1).getNomFoyer());
    }


    @Test
    void testRetrieveFoyer() {
        Foyer foyer1 = new Foyer(1L, "Foyer1", 100L, TypeFoyer.FEMMES);
        when(universiteRepository.findById(10L)).thenReturn(Optional.of(foyer1));
        Foyer universiteById = iUniversiteService.retrieveFoyer(10);
        assertNotEquals(null, universiteById);
        assertEquals("Foyer1", universiteById.getNomFoyer());
    }

    @Test
    void testGetInvalidFoyerById() {
        when(universiteRepository.findById(17L)).thenThrow(new RuntimeException("Universite Not Found with ID"));

        Exception exception = assertThrows(RuntimeException.class, () -> {
            iUniversiteService.retrieveFoyer(17);
        });

        assertTrue(exception.getMessage().contains("Universite Not Found with ID"));
    }


    @Test
    void testAddFoyer() {
        Foyer foyer1 = new Foyer(19L, "Foyer1", 100L, TypeFoyer.FEMMES);
        iUniversiteService.addFoyer(foyer1);
        verify(universiteRepository, times(1)).save(foyer1);
        ArgumentCaptor<Foyer> universiteArgumentCaptor = ArgumentCaptor.forClass(Foyer.class);
        verify(universiteRepository).save(universiteArgumentCaptor.capture());
        Foyer universiteCreated = universiteArgumentCaptor.getValue();
        assertNotNull(universiteCreated.getIdFoyer());
        assertEquals("Foyer1", universiteCreated.getNomFoyer());
    }

    @Test
    void testRemoveFoyer() {
        Foyer foyer1 = new Foyer(20L, "Foyer1", 100L, TypeFoyer.FEMMES);
        when(universiteRepository.findById(20L)).thenReturn(Optional.of(foyer1));
        iUniversiteService.removeFoyer(foyer1.getIdFoyer());
        verify(universiteRepository, times(1)).deleteById(20L);
    }
}