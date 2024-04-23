package com.example.springbootesprit.utils;

import com.example.springbootesprit.entities.User;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class ExportExcelUserService {

    public static ByteArrayOutputStream generateUsersExcelReport(List<User> users) {
        Workbook workbook = new XSSFWorkbook();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            Sheet sheet = workbook.createSheet("Etudiants");

            // Create header row
            Row headerRow = sheet.createRow(0);
            String[] columns = {"ID", "Nom", "Prénom", "Email", "CIN", "Ecole"};
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
            }

            // Create data rows
            int rowNum = 1;
            for (User user : users) {
                Row row = sheet.createRow(rowNum++);

                row.createCell(0).setCellValue(user.getId());
                row.createCell(1).setCellValue(user.getFirstname());
                row.createCell(2).setCellValue(user.getLastname());
                row.createCell(3).setCellValue(user.getEmail());
                row.createCell(4).setCellValue(user.getCin());
                row.createCell(5).setCellValue(user.getEcole());
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
