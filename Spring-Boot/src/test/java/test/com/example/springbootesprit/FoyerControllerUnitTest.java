package test.com.example.springbootesprit;
import com.example.springbootesprit.Dtos.FoyerDTO;
import com.example.springbootesprit.controller.FoyerController;
import com.example.springbootesprit.entities.Foyer;
import com.example.springbootesprit.entities.TypeFoyer;
import com.example.springbootesprit.service.FoyerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class FoyerControllerUnitTest {



    @Mock
    private FoyerService universiteService;

    @InjectMocks
    private FoyerController universiteController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        // Autres initialisations si nécessaires
    }


    @Test
    void testGetAllUniversites() {
        // Mock data
        //        Foyer foyer1 = new Foyer(19L, "Foyer1", 100L, TypeFoyer.FEMMES);
        Foyer universite1 = new Foyer(1L, "Foyer1", 100L, TypeFoyer.FEMMES);
        Foyer universite2 = new Foyer(2L, "Foyer2", 100L, TypeFoyer.FEMMES);

        //Universite universite2 = new Universite(2, "Universite2");
        List<Foyer> universiteList = Arrays.asList(universite1, universite2);

        // Mocking behavior
        when(universiteService.retrieveAllFoyers()).thenReturn(universiteList);

        // Perform the test
        List<Foyer> result = universiteController.retrieveAllFoyers();

        // Verify the interactions
        verify(universiteService, times(1)).retrieveAllFoyers();

        // Assertions
        assertEquals(2, result.size());
    }

    @Test
    void testGetUniversiteById() {
        // Mock data
        // Universite universite = new Universite(1, "Universite1");
        Foyer foyer = new Foyer(1L, "Foyer1", 100L, TypeFoyer.FEMMES);


        // Mocking behavior
        when(universiteService.retrieveFoyer(1)).thenReturn(foyer);

        // Perform the test
        ResponseEntity<Foyer> responseEntity = universiteController.retrieveFoyer(1L);

        // Verify the interactions
        verify(universiteService, times(1)).retrieveFoyer(1);

        // Assertions
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());  // Vérifiez le statut HTTP ici
        assertEquals(foyer, responseEntity.getBody());
    }


    @Test
    void testAddUniversite() {
        // Mock data
        FoyerDTO universiteDTO = new FoyerDTO();
        universiteDTO.setNomFoyer("foyer1");

        // Mocking behavior
        when(universiteService.addFoyer(any(Foyer.class))).thenReturn(new Foyer());

        // Perform the test
        ResponseEntity<Foyer> responseEntity = universiteController.addFoyer(universiteDTO);

        // Verify the interactions
        verify(universiteService, times(1)).addFoyer(any(Foyer.class));

        // Assertions
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
    }


    @Test
    void testUpdateUniversite() {
        // Mock data
        FoyerDTO universiteDTO = new FoyerDTO();
        universiteDTO.setNomFoyer("foyer1");

        // Mocking behavior
        when(universiteService.updateFoyer( any(Foyer.class))).thenReturn(new Foyer());

        // Perform the test
        ResponseEntity<Foyer> responseEntity = universiteController.updateUniversite( universiteDTO);

        // Verify the interactions
        verify(universiteService, times(1)).updateFoyer(any(Foyer.class));

        // Assertions
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
    }



}

