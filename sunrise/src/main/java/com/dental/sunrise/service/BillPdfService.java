package com.dental.sunrise.service;

import com.dental.sunrise.entity.Bill;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.UnitValue;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;

@Service
public class BillPdfService {

    public byte[] generateBillPdf(Bill bill) {

        ByteArrayOutputStream outputStream =
                new ByteArrayOutputStream();

        PdfWriter writer =
                new PdfWriter(outputStream);

        PdfDocument pdf =
                new PdfDocument(writer);

        Document document =
                new Document(pdf);

        // =========================
        // TITLE
        // =========================

        Paragraph title =
                new Paragraph("SUNRISE DENTAL CLINIC")
                        .setBold()
                        .setFontSize(20);

        document.add(title);

        document.add(
                new Paragraph("BILL / INVOICE")
                        .setBold()
                        .setFontSize(16)
        );

        document.add(
                new Paragraph("Bill ID: " + bill.getId())
        );

        document.add(
                new Paragraph(
                        "Bill Date: " +
                        (bill.getBillDate() != null
                                ? bill.getBillDate().toString()
                                : "")
                )
        );

        // =========================
        // PATIENT DETAILS
        // =========================

        document.add(
                new Paragraph("Patient Details")
                        .setBold()
                        .setFontSize(14)
        );

        if (bill.getPatient() != null) {

            document.add(
                    new Paragraph(
                            "Patient ID: " +
                            bill.getPatient().getId()
                    )
            );

            document.add(
                    new Paragraph(
                            "Patient Name: " +
                            bill.getPatient().getName()
                    )
            );

            document.add(
                    new Paragraph(
                            "Email: " +
                            bill.getPatient().getEmail()
                    )
            );
        }

        // =========================
        // TREATMENT DETAILS
        // =========================

        document.add(
                new Paragraph("Treatment Details")
                        .setBold()
                        .setFontSize(14)
        );

        if (bill.getTreatment() != null) {

            document.add(
                    new Paragraph(
                            "Treatment: " +
                            bill.getTreatment().getTreatmentName()
                    )
            );
        }

        // =========================
        // APPOINTMENT
        // =========================

        if (bill.getAppointment() != null) {

            document.add(
                    new Paragraph(
                            "Appointment Date & Time: " +
                            bill.getAppointment()
                                    .getAppointmentDateTime()
                    )
            );
        }

        // =========================
        // BILL TABLE
        // =========================

        Table table =
                new Table(UnitValue.createPercentArray(
                        new float[]{3, 2}
                ));

        table.setWidth(UnitValue.createPercentValue(100));

        table.addCell(
                new Paragraph("Description")
                        .setBold()
        );

        table.addCell(
                new Paragraph("Amount")
                        .setBold()
        );

        table.addCell("Amount");

        table.addCell(
                formatAmount(bill.getAmount())
        );

        table.addCell("Discount");

        table.addCell(
                formatAmount(bill.getDiscount())
        );

        table.addCell(
                new Paragraph("Total Amount")
                        .setBold()
        );

        table.addCell(
                new Paragraph(
                        formatAmount(bill.getTotalAmount())
                ).setBold()
        );

        document.add(table);

        // =========================
        // DESCRIPTION
        // =========================

        if (bill.getDescription() != null
                && !bill.getDescription().isBlank()) {

            document.add(
                    new Paragraph("Description")
                            .setBold()
                            .setFontSize(14)
            );

            document.add(
                    new Paragraph(
                            bill.getDescription()
                    )
            );
        }

        // =========================
        // PAYMENT STATUS
        // =========================

        document.add(
                new Paragraph("Payment Information")
                        .setBold()
                        .setFontSize(14)
        );

        document.add(
                new Paragraph(
                        "Payment Status: " +
                        (bill.getPaymentStatus() != null
                                ? bill.getPaymentStatus().name()
                                : "")
                )
        );

        if (bill.getPaidAt() != null) {

            document.add(
                    new Paragraph(
                            "Paid At: " +
                            bill.getPaidAt()
                    )
            );
        }

        // =========================
        // FOOTER
        // =========================

        document.add(
                new Paragraph(
                        "\nThank you for choosing Sunrise Dental Clinic."
                )
        );

        document.close();

        return outputStream.toByteArray();
    }

    private String formatAmount(BigDecimal amount) {

        if (amount == null) {
            return "0.00";
        }

        return amount.setScale(
                2,
                java.math.RoundingMode.HALF_UP
        ).toString();
    }
}