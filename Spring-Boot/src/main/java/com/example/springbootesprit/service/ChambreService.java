package com.example.springbootesprit.service;
import com.example.springbootesprit.entities.Bloc;
import com.example.springbootesprit.entities.Chambre;
import com.example.springbootesprit.entities.Evaluation;
import com.example.springbootesprit.entities.Typechambre;
import com.example.springbootesprit.repositories.BlocRepository;
import com.example.springbootesprit.repositories.ChambreRepository;
import com.example.springbootesprit.repositories.EvaluationRepository;
import com.example.springbootesprit.repositories.ReservationRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.LineSeparator;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.*;
import java.util.List;


@Service
@Slf4j
@AllArgsConstructor

public class ChambreService implements IchambreService {

    private final ChambreRepository chambrerepository;

    BlocRepository blocRepository;

    EvaluationRepository evaluationRepository;
    ReservationRepository reservationrepository;
    BlocService blocc;


    public boolean isNumeroChambreUniqueInBloc(Long numeroChambre, Bloc bloc) {
        // Vérifiez si une chambre avec le même numéro existe déjà dans le bloc
        return chambrerepository.existsByNumerochambreAndBloc(numeroChambre, bloc);
    }
    @Override
    public Chambre saveChambre(Chambre chambre) {
        // Avant d'ajouter la chambre, vérifiez si le numéro de chambre est unique dans le bloc
        if (isNumeroChambreUniqueInBloc(chambre.getNumerochambre(), chambre.getBloc())) {
            // Numéro de chambre déjà utilisé dans le bloc
            // Vous pouvez gérer cela en lançant une exception, en renvoyant un message d'erreur, etc.
            throw new RuntimeException("Le numéro de chambre existe déjà dans ce bloc.");
        }
        // Si le numéro de chambre est unique, enregistrez la chambre
        return chambrerepository.save(chambre);
    }
    @Override
    public List<Chambre> retrieveAllChambre() {
        return chambrerepository.findAll();
    }

    @Override
    public Chambre addchambre(Chambre c) {
        return chambrerepository.save(c);
    }

    @Override
    public Chambre updateChambre(Chambre c) {
        return chambrerepository.save(c);
    }

    @Override
    public Chambre retrieveChambre(long idChambre) {
        return chambrerepository.findById(idChambre).get();
    }

    @Override
    public void removeChambre(long idChambre) {
        Optional<Chambre> optionalChambre = chambrerepository.findById(idChambre);

        if (optionalChambre.isPresent()) {
            Chambre chambre = optionalChambre.get();

            // Vérifiez si la chambre a des réservations
            if (chambre.getReservations() != null && !chambre.getReservations().isEmpty()) {
                // Si des réservations existent, vous pouvez choisir de lever une exception, de renvoyer un message d'erreur, etc.
                throw new RuntimeException("La chambre a des réservations en cours. Suppression impossible.");
            }

            // Si la chambre n'a pas de réservations, vous pouvez la supprimer
            chambrerepository.deleteById(idChambre);
        } else {
            // La chambre avec l'ID spécifié n'a pas été trouvée
            // Vous pouvez lever une exception ou gérer cela selon vos besoins
            throw new EntityNotFoundException("Chambre avec l'ID " + idChambre + " non trouvée.");
        }
    }

    @Override
    public List<Chambre> getChambresParNomBloc(String nomBloc) {
        Bloc bloc = blocRepository.findByNomBloc(nomBloc);

        return new ArrayList<>(bloc.getChambres());
    }

    @Override
    public long nbChambreParTypeEtBloc(Typechambre type, long idBloc) {
        return blocRepository.countChambresByTypeAndBlocId(type, idBloc);
    }

    @Scheduled(fixedRate = 10000)
    @Transactional
    @Override
    public void listeChambresParBloc() {
        blocc.retrieveAllBloc().forEach(bloc -> {
            log.info("bloc:{} ayant une capacite de :{ = " , bloc.getNomBloc(),bloc.getCapciteBloc());
            log.info("liste des chambres un bloc {}" , bloc.getNomBloc());
            bloc.getChambres().size();
            bloc.getChambres().forEach(
                    chambre -> {
                        log.info("chambre numero {} de type {}",chambre.getNumerochambre(),chambre.getTypechambre());
                    }
            );
        });
        log.info("");
//List<Bloc> blocs=blocRepository.findAll();



    }


    @Scheduled(fixedRate = 10000)
    @Transactional
    public void pourcentageChambreParTypeChambre() {
        Map<Typechambre, Long> chambreCountByType = new HashMap<>();

        // Retrieve all Chambres from the repository
        List<Chambre> allChambres = chambrerepository.findAll();

        // Count the number of Chambres for each Typechambre
        for (Chambre chambre : allChambres) {
            Typechambre typechambre = chambre.getTypechambre();
            chambreCountByType.put(typechambre, chambreCountByType.getOrDefault(typechambre, 0L) + 1);
        }

        // Calculate and log the percentage for each Typechambre
        long totalChambreCount = allChambres.size();
        for (Map.Entry<Typechambre, Long> entry : chambreCountByType.entrySet()) {
            Typechambre typechambre = entry.getKey();
            long count = entry.getValue();
            double percentage = (count * 100.0) / totalChambreCount;
            log.info("Percentage of {} chambres: {}%", typechambre, percentage);
        }
    }




//Service Avancer


    @Override
    public Chambre ajouterEvaluation(Long idChambre, Evaluation evaluation) {
        Chambre chambre = chambrerepository.findById(idChambre).orElseThrow(() -> new EntityNotFoundException("Chambre non trouvée avec l'ID : " + idChambre));

        evaluation.setChambre(chambre);
        chambre.getEvaluations().add(evaluation);

        // Mise à jour de la chambre dans la base de données
        return chambrerepository.save(chambre);
    }


    @Override
    public byte[] genererPDFChambresByBloc(Long idBloc) throws DocumentException {
        Bloc bloc = blocRepository.findById(idBloc).orElse(null);

        if (bloc == null) {
            return new byte[0];
        }

        List<Chambre> chambres = chambrerepository.findByBlocId(idBloc);

        // Create a document PDF
        Document document = new Document();
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, byteArrayOutputStream);

        document.open();

        // Set font style and color for the title
        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, BaseColor.BLUE);
        Paragraph title = new Paragraph("Liste des chambres pour le bloc spécifié: " + bloc.getNomBloc(), titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);

        // Create a table for chambre details
        PdfPTable table = new PdfPTable(2); // 2 columns

        // Set table properties
        table.setWidthPercentage(100);
        table.setSpacingBefore(10f);
        table.setSpacingAfter(10f);

        // Set font style and color for the table headers
        Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, BaseColor.WHITE);
        PdfPCell headerCell1 = new PdfPCell(new Phrase("Numéro de chambre", headerFont));
        PdfPCell headerCell2 = new PdfPCell(new Phrase("Type de chambre", headerFont));

        // Set background color for header cells
        headerCell1.setBackgroundColor(BaseColor.DARK_GRAY);
        headerCell2.setBackgroundColor(BaseColor.DARK_GRAY);

        // Add header cells to the table
        table.addCell(headerCell1);
        table.addCell(headerCell2);

        // Set font style for the table content
        Font contentFont = FontFactory.getFont(FontFactory.HELVETICA, 12, BaseColor.BLACK);

        for (Chambre chambre : chambres) {
            // Add chambre details to the table
            PdfPCell cell1 = new PdfPCell(new Phrase(String.valueOf(chambre.getNumerochambre()), contentFont));
            PdfPCell cell2 = new PdfPCell(new Phrase(chambre.getTypechambre().toString(), contentFont));


            // Add alternating background colors for better readability
            if (chambres.indexOf(chambre) % 2 == 0) {
                cell1.setBackgroundColor(BaseColor.LIGHT_GRAY);
                cell2.setBackgroundColor(BaseColor.LIGHT_GRAY);
            }

            // Add cells to the table
            table.addCell(cell1);
            table.addCell(cell2);
        }

        // Add the table to the document
        document.add(table);

        document.close();

        return byteArrayOutputStream.toByteArray();
    }



    @Override
    public List<Map<String, Object>> getStatistiqueBlocs() {
        List<Object[]> result = chambrerepository.getStatistiqueBlocs();

        List<Map<String, Object>> statistiques = new ArrayList<>();

        for (Object[] row : result) {

            Map<String, Object> statistiqueBloc = new HashMap<>();

            statistiqueBloc.put("nomBloc", (String) row[0]);
            // Vérifier si l'objet Chambre dans row[1] est non null
            if (row[1] instanceof Chambre) {
                Chambre chambre = (Chambre) row[1];
                // Vérifier si le numerochambre est non null
                if (chambre.getNumerochambre() != null) {
                    // Ajouter la valeur au map statistiqueBloc
                    statistiqueBloc.put("nombreChambres", chambre.getNumerochambre().intValue());
                } else {
                    // Gérer le cas où numerochambre est null
                    statistiqueBloc.put("nombreChambres", 0); // ou une valeur par défaut appropriée
                }
            } else {
                // Gérer le cas où l'objet Chambre dans row[1] est null
                statistiqueBloc.put("nombreChambres", 0); // ou une valeur par défaut appropriée
            }
            // Vérification et conversion du type pour Typechambre
            if (row[2] instanceof String) {
                statistiqueBloc.put("typeChambre", Typechambre.fromString((String) row[2]));
            } else {
                // Gérer le cas où le type de données n'est pas une chaîne (si nécessaire)
            }
            statistiqueBloc.put("estReserve", (Boolean) row[3]);
            statistiques.add(statistiqueBloc);
        }


        return statistiques;
    }

    @Override
    public List<Evaluation> getWellRatedEvaluations() {
        return evaluationRepository.getWellRatedEvaluations();
    }

    @Override
    public List<Evaluation> getNotWellRatedEvaluations() {
        return evaluationRepository.getNotWellRatedEvaluations();
    }


    public Evaluation getEvaluationByChambreId(Long idChambre) {

        return evaluationRepository.findByChambreIdChambre(idChambre);

    }


    public List<Chambre> getReservationsForChambreBetweenDates(Long idChambre, Date dateDebut, Date dateFin) {
        return chambrerepository.findByidChambreAndReservationsAnneeUniversitaireBetween(idChambre, dateDebut, dateFin);
    }


}




