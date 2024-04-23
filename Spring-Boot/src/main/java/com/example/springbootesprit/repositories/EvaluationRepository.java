package com.example.springbootesprit.repositories;

import com.example.springbootesprit.entities.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    Evaluation findByChambreIdChambre(Long idChambre);

    @Query("SELECT e FROM Evaluation e WHERE e.note BETWEEN 50 AND 100")
    List<Evaluation> getWellRatedEvaluations();



    @Query("SELECT e FROM Evaluation e WHERE e.note < 50")
    List<Evaluation> getNotWellRatedEvaluations();
}


