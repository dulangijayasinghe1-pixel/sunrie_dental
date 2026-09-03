package com.dental.sunrise.pattern;

import com.dental.sunrise.entity.Appointment;
import com.dental.sunrise.entity.Bill;
import com.dental.sunrise.entity.Patient;
import com.dental.sunrise.entity.Treatment;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class BillFactory {

    public Bill createBill(
            Patient patient,
            Treatment treatment,
            Appointment appointment,
            BigDecimal amount,
            BigDecimal discount,
            String description
    ) {

        if (discount == null) {
            discount = BigDecimal.ZERO;
        }

        BigDecimal totalAmount =
                amount.subtract(discount);

        return Bill.builder()

                .patient(patient)

                .treatment(treatment)

                .appointment(appointment)

                .amount(amount)

                .discount(discount)

                .totalAmount(totalAmount)

                .paymentStatus(
                        Bill.PaymentStatus.PENDING
                )

                .description(description)

                .build();
    }
}