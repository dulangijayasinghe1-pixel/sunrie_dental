package com.dental.sunrise.service;

import com.dental.sunrise.dto.bill.BillRequest;
import com.dental.sunrise.dto.bill.BillResponse;
import com.dental.sunrise.entity.Appointment;
import com.dental.sunrise.entity.Bill;
import com.dental.sunrise.entity.Patient;
import com.dental.sunrise.entity.Treatment;
import com.dental.sunrise.pattern.BillFactory;
import com.dental.sunrise.repository.AppointmentRepository;
import com.dental.sunrise.repository.BillRepository;
import com.dental.sunrise.repository.PatientRepository;
import com.dental.sunrise.repository.TreatmentRepository;
import com.dental.sunrise.validation.BillValidator;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BillService {

    private final BillRepository billRepository;
    private final PatientRepository patientRepository;
    private final TreatmentRepository treatmentRepository;
    private final AppointmentRepository appointmentRepository;
    private final BillValidator billValidator;
    private final BillFactory billFactory;
    private final BillPdfService billPdfService;
    private final EmailService emailService;

    public BillService(
            BillRepository billRepository,
            PatientRepository patientRepository,
            TreatmentRepository treatmentRepository,
            AppointmentRepository appointmentRepository,
            BillValidator billValidator,
            BillFactory billFactory,
            BillPdfService billPdfService,
            EmailService emailService
    ) {
        this.billRepository = billRepository;
        this.patientRepository = patientRepository;
        this.treatmentRepository = treatmentRepository;
        this.appointmentRepository = appointmentRepository;
        this.billValidator = billValidator;
        this.billFactory = billFactory;
        this.billPdfService = billPdfService;
        this.emailService = emailService;
    }

    // =====================================================
    // CREATE BILL
    // =====================================================

    public BillResponse createBill(BillRequest request) {

        billValidator.validate(
                request.getPatientId(),
                request.getTreatmentId(),
                request.getAmount()
        );

        billValidator.validateDiscount(
                request.getAmount(),
                request.getDiscount()
        );

        Patient patient = patientRepository
                .findById(request.getPatientId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Patient not found with ID: "
                                        + request.getPatientId()
                        )
                );

        Treatment treatment = treatmentRepository
                .findById(request.getTreatmentId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Treatment not found with ID: "
                                        + request.getTreatmentId()
                        )
                );

        Appointment appointment = null;

        if (request.getAppointmentId() != null) {

            appointment = appointmentRepository
                    .findById(request.getAppointmentId())
                    .orElseThrow(() ->
                            new IllegalArgumentException(
                                    "Appointment not found with ID: "
                                            + request.getAppointmentId()
                            )
                    );
        }

        Bill bill = billFactory.createBill(
                patient,
                treatment,
                appointment,
                request.getAmount(),
                request.getDiscount(),
                request.getDescription()
        );

        // Optional payment status
        if (request.getPaymentStatus() != null
                && !request.getPaymentStatus().isBlank()) {

            if (!billValidator.isValidPaymentStatus(
                    request.getPaymentStatus()
            )) {
                throw new IllegalArgumentException(
                        "Invalid payment status."
                );
            }

            Bill.PaymentStatus status =
                    Bill.PaymentStatus.valueOf(
                            request.getPaymentStatus().toUpperCase()
                    );

            bill.setPaymentStatus(status);

            if (status == Bill.PaymentStatus.PAID) {
                bill.setPaidAt(LocalDateTime.now());
            }
        }

        Bill savedBill = billRepository.save(bill);

        // =====================================================
        // SEND BILLING EMAIL TO PATIENT
        // =====================================================

        if (savedBill.getPatient() != null
                && savedBill.getPatient().getEmail() != null
                && !savedBill.getPatient().getEmail().isBlank()) {

            emailService.sendBillingEmail(
                    savedBill.getPatient().getEmail(),
                    savedBill.getPatient().getName(),
                    savedBill.getTotalAmount().toString(),
                    savedBill.getPaymentStatus() != null
                            ? savedBill.getPaymentStatus().name()
                            : "PENDING"
            );
        }

        return mapToResponse(savedBill);
    }

    // =====================================================
    // GET BILL BY ID
    // =====================================================

    public BillResponse getBillById(Long id) {

        Bill bill = billRepository
                .findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Bill not found with ID: " + id
                        )
                );

        return mapToResponse(bill);
    }

    // =====================================================
    // GET ALL BILLS
    // =====================================================

    public List<BillResponse> getAllBills() {

        return billRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // =====================================================
    // GET BILLS BY PATIENT
    // =====================================================

    public List<BillResponse> getBillsByPatient(Long patientId) {

        if (!patientRepository.existsById(patientId)) {
            throw new IllegalArgumentException(
                    "Patient not found with ID: " + patientId
            );
        }

        return billRepository
                .findByPatientIdOrderByBillDateDesc(patientId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // =====================================================
    // GET BILLS BY APPOINTMENT
    // =====================================================

    public List<BillResponse> getBillsByAppointment(
            Long appointmentId
    ) {

        if (!appointmentRepository.existsById(appointmentId)) {
            throw new IllegalArgumentException(
                    "Appointment not found with ID: "
                            + appointmentId
            );
        }

        return billRepository
                .findByAppointmentId(appointmentId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // =====================================================
    // GET BILLS BY PAYMENT STATUS
    // =====================================================

    public List<BillResponse> getBillsByPaymentStatus(
            String status
    ) {

        if (!billValidator.isValidPaymentStatus(status)) {
            throw new IllegalArgumentException(
                    "Invalid payment status."
            );
        }

        Bill.PaymentStatus paymentStatus =
                Bill.PaymentStatus.valueOf(
                        status.toUpperCase()
                );

        return billRepository
                .findByPaymentStatus(paymentStatus)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // =====================================================
    // UPDATE BILL
    // =====================================================

    public BillResponse updateBill(
            Long id,
            BillRequest request
    ) {

        Bill bill = billRepository
                .findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Bill not found with ID: " + id
                        )
                );

        billValidator.validate(
                request.getPatientId(),
                request.getTreatmentId(),
                request.getAmount()
        );

        billValidator.validateDiscount(
                request.getAmount(),
                request.getDiscount()
        );

        Patient patient = patientRepository
                .findById(request.getPatientId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Patient not found with ID: "
                                        + request.getPatientId()
                        )
                );

        Treatment treatment = treatmentRepository
                .findById(request.getTreatmentId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Treatment not found with ID: "
                                        + request.getTreatmentId()
                        )
                );

        Appointment appointment = null;

        if (request.getAppointmentId() != null) {

            appointment = appointmentRepository
                    .findById(request.getAppointmentId())
                    .orElseThrow(() ->
                            new IllegalArgumentException(
                                    "Appointment not found with ID: "
                                            + request.getAppointmentId()
                            )
                    );
        }

        bill.setPatient(patient);
        bill.setTreatment(treatment);
        bill.setAppointment(appointment);

        bill.setAmount(request.getAmount());

        if (request.getDiscount() == null) {
            bill.setDiscount(BigDecimal.ZERO);
        } else {
            bill.setDiscount(request.getDiscount());
        }

        bill.setTotalAmount(
                bill.getAmount()
                        .subtract(bill.getDiscount())
        );

        bill.setDescription(request.getDescription());

        if (request.getPaymentStatus() != null
                && !request.getPaymentStatus().isBlank()) {

            if (!billValidator.isValidPaymentStatus(
                    request.getPaymentStatus()
            )) {
                throw new IllegalArgumentException(
                        "Invalid payment status."
                );
            }

            Bill.PaymentStatus status =
                    Bill.PaymentStatus.valueOf(
                            request.getPaymentStatus().toUpperCase()
                    );

            bill.setPaymentStatus(status);

            if (status == Bill.PaymentStatus.PAID) {

                if (bill.getPaidAt() == null) {
                    bill.setPaidAt(LocalDateTime.now());
                }

            } else {
                bill.setPaidAt(null);
            }
        }

        Bill updatedBill =
                billRepository.save(bill);

        return mapToResponse(updatedBill);
    }

    // =====================================================
    // MARK BILL AS PAID
    // =====================================================

    public BillResponse markAsPaid(Long id) {

        Bill bill = billRepository
                .findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Bill not found with ID: " + id
                        )
                );

        bill.setPaymentStatus(
                Bill.PaymentStatus.PAID
        );

        bill.setPaidAt(LocalDateTime.now());

        Bill updatedBill =
                billRepository.save(bill);

        return mapToResponse(updatedBill);
    }

    // =====================================================
    // CANCEL BILL
    // =====================================================

    public BillResponse cancelBill(Long id) {

        Bill bill = billRepository
                .findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Bill not found with ID: " + id
                        )
                );

        bill.setPaymentStatus(
                Bill.PaymentStatus.CANCELLED
        );

        bill.setPaidAt(null);

        Bill updatedBill =
                billRepository.save(bill);

        return mapToResponse(updatedBill);
    }

    // =====================================================
    // DELETE BILL
    // =====================================================

    public void deleteBill(Long id) {

        Bill bill = billRepository
                .findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Bill not found with ID: " + id
                        )
                );

        billRepository.delete(bill);
    }

    // =====================================================
    // GET TOTAL REVENUE
    // =====================================================

    public BigDecimal getTotalRevenue() {

        BigDecimal revenue =
                billRepository.getTotalRevenue();

        return revenue != null
                ? revenue
                : BigDecimal.ZERO;
    }

    // =====================================================
    // GET PENDING AMOUNT
    // =====================================================

    public BigDecimal getPendingAmount() {

        BigDecimal amount =
                billRepository.getPendingAmount();

        return amount != null
                ? amount
                : BigDecimal.ZERO;
    }

    // =====================================================
    // PRINT BILL
    // =====================================================

    public byte[] printBill(Long id) {

        Bill bill = billRepository
                .findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Bill not found with ID: " + id
                        )
                );

        return billPdfService.generateBillPdf(bill);
    }

    // =====================================================
    // ENTITY -> RESPONSE DTO
    // =====================================================

    private BillResponse mapToResponse(Bill bill) {

        return BillResponse.builder()

                .billId(bill.getId())

                // Patient
                .patientId(
                        bill.getPatient() != null
                                ? bill.getPatient().getId()
                                : null
                )

                .patientName(
                        bill.getPatient() != null
                                ? bill.getPatient().getName()
                                : null
                )

                .patientEmail(
                        bill.getPatient() != null
                                ? bill.getPatient().getEmail()
                                : null
                )

                // Treatment
                .treatmentId(
                        bill.getTreatment() != null
                                ? bill.getTreatment().getId()
                                : null
                )

                .treatmentName(
                        bill.getTreatment() != null
                                ? bill.getTreatment().getTreatmentName()
                                : null
                )

                // Appointment
                .appointmentId(
                        bill.getAppointment() != null
                                ? bill.getAppointment().getId()
                                : null
                )

                .appointmentDateTime(
                        bill.getAppointment() != null
                                ? bill.getAppointment()
                                    .getAppointmentDateTime()
                                : null
                )

                // Bill
                .amount(bill.getAmount())
                .discount(bill.getDiscount())
                .totalAmount(bill.getTotalAmount())
                .description(bill.getDescription())

                // Payment
                .paymentStatus(
                        bill.getPaymentStatus() != null
                                ? bill.getPaymentStatus().name()
                                : null
                )

                // Dates
                .billDate(bill.getBillDate())
                .paidAt(bill.getPaidAt())
                .createdAt(bill.getCreatedAt())
                .updatedAt(bill.getUpdatedAt())

                .build();
    }
}