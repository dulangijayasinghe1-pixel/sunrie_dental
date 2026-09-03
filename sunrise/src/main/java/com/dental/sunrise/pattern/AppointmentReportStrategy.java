package com.dental.sunrise.pattern;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class AppointmentReportStrategy implements ReportStrategy {

    @Override
    public Map<String, Object> generateReport() {

        Map<String, Object> report = new HashMap<>();

        report.put(
                "reportType",
                "APPOINTMENT"
        );

        report.put(
                "message",
                "Appointment report generated successfully."
        );

        return report;
    }
}