package com.example.springbootesprit.utils;
import com.example.springbootesprit.entities.Etudiant;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.stream.IntStream;
@Service
public class ExportExcelService {

    public static ByteArrayOutputStream generateStudentsExcelReport(List<Etudiant> students) {
        Workbook workbook = new XSSFWorkbook();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            Sheet sheet = workbook.createSheet("Etudiants");

            // Create header row
            Row headerRow = sheet.createRow(0);
            String[] columns = {"ID", "Nom", "Prénom", "Email", "CIN", "Ecole", "Date de Naissance"};
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
            }

            // Create data rows
            int rowNum = 1;
            for (Etudiant etudiant : students) {
                Row row = sheet.createRow(rowNum++);

                row.createCell(0).setCellValue(etudiant.getIdEtudiant());
                row.createCell(1).setCellValue(etudiant.getFirstname());
                row.createCell(2).setCellValue(etudiant.getLastname());
                row.createCell(3).setCellValue(etudiant.getEmail());
                row.createCell(4).setCellValue(etudiant.getCin());
                row.createCell(5).setCellValue(etudiant.getEcole());
                // Assuming 'dateNaissance' is a Date type, adjust accordingly
                row.createCell(6).setCellValue(etudiant.getDateNaissance().toString());
            }

            // Auto-size columns
            for (int i = 0; i < columns.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(out);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return out;
    }
}
