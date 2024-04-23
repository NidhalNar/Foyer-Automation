package com.example.springbootesprit.repositories;

import com.example.springbootesprit.entities.Foyer;
import com.example.springbootesprit.entities.TunisianGovernorate;
import com.example.springbootesprit.entities.TypeFoyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoyerRepository extends JpaRepository<Foyer,Long> {
    @Query("SELECT f FROM Foyer f JOIN f.universite u WHERE u.grouvenerat = :grouvenerat")
    List<Foyer> findAllFoyersByGrouvenerat(@Param("grouvenerat") TunisianGovernorate grouvenerat);

    @Query("SELECT COUNT(f) FROM Foyer f JOIN f.universite u WHERE u.grouvenerat = :grouvenerat")
    Long countFoyersByGrouvenerat(@Param("grouvenerat") TunisianGovernorate grouvenerat);

    @Query("SELECT f FROM Foyer f WHERE f.type = :type")
    List<Foyer> findFoyersByType(@Param("type") TypeFoyer type);

    @Query("SELECT f.type, COUNT(f) FROM Foyer f GROUP BY f.type")
    List<Object[]> countFoyersByType();}
