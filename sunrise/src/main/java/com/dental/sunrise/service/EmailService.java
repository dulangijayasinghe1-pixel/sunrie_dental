package com.dental.sunrise.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /**
     * Send a simple text email.
     */
    public void sendEmail(
            String to,
            String subject,
            String message
    ) {

        validateEmail(to);

        try {
            MimeMessage mimeMessage =
                    mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(
                            mimeMessage,
                            true,
                            "UTF-8"
                    );

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(message, false);

            mailSender.send(mimeMessage);

        } catch (MessagingException e) {
            throw new IllegalStateException(
                    "Failed to send email.",
                    e
            );
        }
    }

    /**
     * Send an HTML email.
     */
    public void sendHtmlEmail(
            String to,
            String subject,
            String htmlContent
    ) {

        validateEmail(to);

        if (htmlContent == null || htmlContent.isBlank()) {
            throw new IllegalArgumentException(
                    "Email content is required."
            );
        }

        try {
            MimeMessage mimeMessage =
                    mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(
                            mimeMessage,
                            true,
                            "UTF-8"
                    );

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);

        } catch (MessagingException e) {
            throw new IllegalStateException(
                    "Failed to send HTML email.",
                    e
            );
        }
    }

    /**
     * Send staff email verification code.
     */
    public void sendVerificationEmail(
            String email,
            String verificationCode
    ) {

        String subject =
                "Sunrise Dental - Email Verification";

        String message =
                """
                Hello,

                Thank you for registering with Sunrise Dental.

                Your email verification code is:

                %s

                Please use this code to verify your email address.

                If you did not create this account, please ignore this email.

                Regards,
                Sunrise Dental
                """.formatted(verificationCode);

        sendEmail(
                email,
                subject,
                message
        );
    }

    /**
     * Send password reset OTP.
     */
    public void sendPasswordResetEmail(
            String email,
            String otp
    ) {

        String subject =
                "Sunrise Dental - Password Reset";

        String message =
                """
                Hello,

                We received a request to reset your Sunrise Dental account password.

                Your password reset code is:

                %s

                Please use this code to reset your password.

                If you did not request this password reset, please ignore this email.

                Regards,
                Sunrise Dental
                """.formatted(otp);

        sendEmail(
                email,
                subject,
                message
        );
    }

    /**
     * Send patient welcome email.
     */
    public void sendPatientWelcomeEmail(
            String email,
            String patientName
    ) {

        String subject =
                "Welcome to Sunrise Dental";

        String message =
                """
                Hello %s,

                Welcome to Sunrise Dental.

                Your patient profile has been successfully created.

                We look forward to providing you with quality dental care.

                Regards,
                Sunrise Dental
                """.formatted(patientName);

        sendEmail(
                email,
                subject,
                message
        );
    }

    /**
     * Send dentist welcome email.
     */
    public void sendDentistWelcomeEmail(
            String email,
            String dentistName
    ) {

        String subject =
                "Welcome to Sunrise Dental";

        String message =
                """
                Hello Dr. %s,

                Welcome to Sunrise Dental.

                Your dentist profile has been successfully created.

                Regards,
                Sunrise Dental
                """.formatted(dentistName);

        sendEmail(
                email,
                subject,
                message
        );
    }

    /**
     * Send appointment confirmation email.
     */
    public void sendAppointmentConfirmationEmail(
            String email,
            String patientName,
            String appointmentDateTime,
            String dentistName
    ) {

        String subject =
                "Sunrise Dental - Appointment Confirmation";

        String message =
                """
                Hello %s,

                Your dental appointment has been confirmed.

                Dentist:
                Dr. %s

                Appointment Date & Time:
                %s

                Please arrive a few minutes before your scheduled appointment.

                Regards,
                Sunrise Dental
                """.formatted(
                        patientName,
                        dentistName,
                        appointmentDateTime
                );

        sendEmail(
                email,
                subject,
                message
        );
    }

    /**
     * Send appointment rescheduled email.
     */
    public void sendAppointmentRescheduledEmail(
            String email,
            String patientName,
            String newAppointmentDateTime,
            String dentistName
    ) {

        String subject =
                "Sunrise Dental - Appointment Rescheduled";

        String message =
                """
                Hello %s,

                Your dental appointment has been rescheduled.

                Dentist:
                Dr. %s

                New Appointment Date & Time:
                %s

                Regards,
                Sunrise Dental
                """.formatted(
                        patientName,
                        dentistName,
                        newAppointmentDateTime
                );

        sendEmail(
                email,
                subject,
                message
        );
    }

    /**
     * Send appointment cancellation email.
     */
    public void sendAppointmentCancelledEmail(
            String email,
            String patientName,
            String appointmentDateTime
    ) {

        String subject =
                "Sunrise Dental - Appointment Cancelled";

        String message =
                """
                Hello %s,

                Your dental appointment scheduled for:

                %s

                has been cancelled.

                Please contact Sunrise Dental if you would like to schedule another appointment.

                Regards,
                Sunrise Dental
                """.formatted(
                        patientName,
                        appointmentDateTime
                );

        sendEmail(
                email,
                subject,
                message
        );
    }

    /**
     * Send dentist schedule change email.
     */
    public void sendDentistScheduleChangeEmail(
            String email,
            String dentistName,
            String scheduleDetails
    ) {

        String subject =
                "Sunrise Dental - Schedule Updated";

        String message =
                """
                Hello Dr. %s,

                Your clinic schedule has been updated.

                Updated Schedule:
                %s

                Please check your Sunrise Dental account for more details.

                Regards,
                Sunrise Dental
                """.formatted(
                        dentistName,
                        scheduleDetails
                );

        sendEmail(
                email,
                subject,
                message
        );
    }

    /**
     * Send billing email.
     */
    public void sendBillingEmail(
            String email,
            String patientName,
            String amount,
            String paymentStatus
    ) {

        String subject =
                "Sunrise Dental - Billing Information";

        String message =
                """
                Hello %s,

                Your Sunrise Dental billing information is as follows.

                Amount:
                %s

                Payment Status:
                %s

                Please contact Sunrise Dental if you have any questions regarding your bill.

                Regards,
                Sunrise Dental
                """.formatted(
                        patientName,
                        amount,
                        paymentStatus
                );

        sendEmail(
                email,
                subject,
                message
        );
    }

    /**
     * Validate recipient email.
     */
    private void validateEmail(String email) {

        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException(
                    "Recipient email is required."
            );
        }

        if (!email.matches(
                "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$"
        )) {
            throw new IllegalArgumentException(
                    "Invalid recipient email address."
            );
        }
    }
}