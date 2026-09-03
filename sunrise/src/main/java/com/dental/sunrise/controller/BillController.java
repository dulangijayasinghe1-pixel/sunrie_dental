package com.dental.sunrise.controller;

import com.dental.sunrise.dto.bill.BillRequest;
import com.dental.sunrise.dto.bill.BillResponse;
import com.dental.sunrise.service.BillService;

import jakarta.validation.Valid;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/bills")
public class BillController {

    private final BillService billService;

    public BillController(BillService billService) {
        this.billService = billService;
    }

    // =====================================================
    // CREATE BILL
    // POST /api/bills
    // =====================================================

    @PostMapping
    public ResponseEntity<BillResponse> createBill(
            @Valid @RequestBody BillRequest request
    ) {

        BillResponse response =
                billService.createBill(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // =====================================================
    // GET BILL BY ID
    // GET /api/bills/{id}
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<BillResponse> getBillById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                billService.getBillById(id)
        );
    }

    // =====================================================
    // GET ALL BILLS
    // GET /api/bills
    // =====================================================

    @GetMapping
    public ResponseEntity<List<BillResponse>> getAllBills() {

        return ResponseEntity.ok(
                billService.getAllBills()
        );
    }

    // =====================================================
    // GET BILLS BY PATIENT
    // GET /api/bills/patient/{patientId}
    // =====================================================

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<BillResponse>> getBillsByPatient(
            @PathVariable Long patientId
    ) {

        return ResponseEntity.ok(
                billService.getBillsByPatient(patientId)
        );
    }

    // =====================================================
    // GET BILLS BY APPOINTMENT
    // GET /api/bills/appointment/{appointmentId}
    // =====================================================

    @GetMapping("/appointment/{appointmentId}")
    public ResponseEntity<List<BillResponse>> getBillsByAppointment(
            @PathVariable Long appointmentId
    ) {

        return ResponseEntity.ok(
                billService.getBillsByAppointment(appointmentId)
        );
    }

    // =====================================================
    // GET BILLS BY PAYMENT STATUS
    // GET /api/bills/status/{status}
    //
    // Example:
    // /api/bills/status/PAID
    // /api/bills/status/PENDING
    // /api/bills/status/CANCELLED
    // =====================================================

    @GetMapping("/status/{status}")
    public ResponseEntity<List<BillResponse>> getBillsByPaymentStatus(
            @PathVariable String status
    ) {

        return ResponseEntity.ok(
                billService.getBillsByPaymentStatus(status)
        );
    }

    // =====================================================
    // UPDATE BILL
    // PUT /api/bills/{id}
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<BillResponse> updateBill(
            @PathVariable Long id,
            @Valid @RequestBody BillRequest request
    ) {

        return ResponseEntity.ok(
                billService.updateBill(id, request)
        );
    }

    // =====================================================
    // MARK BILL AS PAID
    // PATCH /api/bills/{id}/pay
    // =====================================================

    @PatchMapping("/{id}/pay")
    public ResponseEntity<BillResponse> markAsPaid(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                billService.markAsPaid(id)
        );
    }

    // =====================================================
    // CANCEL BILL
    // PATCH /api/bills/{id}/cancel
    // =====================================================

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<BillResponse> cancelBill(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                billService.cancelBill(id)
        );
    }

    // =====================================================
    // DELETE BILL
    // DELETE /api/bills/{id}
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBill(
            @PathVariable Long id
    ) {

        billService.deleteBill(id);

        return ResponseEntity.noContent().build();
    }

    // =====================================================
    // GET TOTAL REVENUE
    // GET /api/bills/revenue
    // =====================================================

    @GetMapping("/revenue")
    public ResponseEntity<BigDecimal> getTotalRevenue() {

        return ResponseEntity.ok(
                billService.getTotalRevenue()
        );
    }

    // =====================================================
    // GET PENDING AMOUNT
    // GET /api/bills/pending-amount
    // =====================================================

    @GetMapping("/pending-amount")
    public ResponseEntity<BigDecimal> getPendingAmount() {

        return ResponseEntity.ok(
                billService.getPendingAmount()
        );
    }

    // =====================================================
    // PRINT BILL
    // GET /api/bills/{id}/print
    // =====================================================

    @GetMapping("/{id}/print")
    public ResponseEntity<byte[]> printBill(
            @PathVariable Long id
    ) {

        byte[] pdf =
                billService.printBill(id);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=bill-" + id + ".pdf"
                )
                .contentType(
                        MediaType.APPLICATION_PDF
                )
                .body(pdf);
    }
}