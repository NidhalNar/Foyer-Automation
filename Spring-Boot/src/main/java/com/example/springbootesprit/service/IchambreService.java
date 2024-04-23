package com.example.springbootesprit.service;


import com.example.springbootesprit.entities.Chambre;
import com.example.springbootesprit.entities.Evaluation;
import com.example.springbootesprit.entities.Typechambre;
import com.itextpdf.text.DocumentException;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface IchambreService {
    List<Chambre> retrieveAllChambre();
    Chambre saveChambre(Chambre chambre);

    Chambre addchambre(Chambre c);

    Chambre updateChambre(Chambre c);

    Chambre retrieveChambre(long idChambre);

    void removeChambre(long idChambre);

    List<Chambre> getChambresParNomBloc(String nomBloc);

    long nbChambreParTypeEtBloc(Typechambre type, long idBloc);

    void listeChambresParBloc();

    Chambre ajouterEvaluation(Long idChambre, Evaluation evaluation);

    //  double calculerMoyenneEvaluations(Long idChambre);
    byte[] genererPDFChambresByBloc(Long idBloc) throws DocumentException;

    List<Map<String, Object>> getStatistiqueBlocs();

    List<Evaluation> getWellRatedEvaluations();

    List<Evaluation> getNotWellRatedEvaluations();

    Evaluation getEvaluationByChambreId(Long idChambre);
    public List<Chambre> getReservationsForChambreBetweenDates(Long idChambre, Date dateDebut, Date dateFin);
}