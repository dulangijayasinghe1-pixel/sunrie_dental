package com.dental.sunrise.pattern;

public interface NotificationObserver {

    void notify(
            String recipient,
            String subject,
            String message
    );
}