package com.dental.sunrise.pattern;

import com.dental.sunrise.service.EmailService;
import org.springframework.stereotype.Component;

@Component
public class EmailNotificationObserver implements NotificationObserver {

    private final EmailService emailService;

    public EmailNotificationObserver(EmailService emailService) {
        this.emailService = emailService;
    }

    @Override
    public void notify(
            String recipient,
            String subject,
            String message
    ) {
        emailService.sendEmail(
                recipient,
                subject,
                message
        );
    }
}