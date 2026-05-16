import re
from collections import Counter

from app.schemas import (
    AnalysisSummary,
    SecurityEvent,
)


SUSPICIOUS_PATTERNS = [
    {
        "pattern": r"failed password",
        "event_type": "Failed Authentication",
        "severity": "High",
        "recommendation": (
            "Review authentication logs and consider blocking the source IP."
        ),
    },
    {
        "pattern": r"invalid user",
        "event_type": "Invalid User Attempt",
        "severity": "Medium",
        "recommendation": (
            "Investigate repeated invalid account attempts."
        ),
    },
    {
        "pattern": r"brute force",
        "event_type": "Brute Force Attack",
        "severity": "Critical",
        "recommendation": (
            "Block offending IP immediately and review affected systems."
        ),
    },
    {
        "pattern": r"unauthorized access",
        "event_type": "Unauthorized Access Attempt",
        "severity": "Critical",
        "recommendation": (
            "Review access controls and audit impacted accounts."
        ),
    },
    {
        "pattern": r"sql injection|or '1'='1",
        "event_type": "SQL Injection Attempt",
        "severity": "Critical",
        "recommendation": (
            "Inspect web application firewall logs and sanitize inputs."
        ),
    },
    {
        "pattern": r"etc/passwd|system32",
        "event_type": "Path Traversal Attempt",
        "severity": "High",
        "recommendation": (
            "Review web server protections and investigate probing behavior."
        ),
    },
    {
        "pattern": r"port scan",
        "event_type": "Port Scanning Activity",
        "severity": "Medium",
        "recommendation": (
            "Monitor reconnaissance activity and consider rate limiting."
        ),
    },
    {
        "pattern": r"privilege escalation",
        "event_type": "Privilege Escalation Attempt",
        "severity": "Critical",
        "recommendation": (
            "Immediately investigate affected systems and review admin access."
        ),
    },
    {
        "pattern": r"jwt validation failed",
        "event_type": "Authentication Token Abuse",
        "severity": "High",
        "recommendation": (
            "Review token handling and monitor for session abuse."
        ),
    },
    {
        "pattern": r"dns beaconing",
        "event_type": "Possible Command and Control Traffic",
        "severity": "Critical",
        "recommendation": (
            "Inspect outbound traffic for malware or persistence activity."
        ),
    },
    {
        "pattern": r"suspicious outbound connection",
        "event_type": "Suspicious Outbound Traffic",
        "severity": "High",
        "recommendation": (
            "Review outbound connections for potential compromise."
        ),
    },
]


IP_REGEX = r"(?:\d{1,3}\.){3}\d{1,3}"


def extract_ip(text: str):
    match = re.search(IP_REGEX, text)

    if match:
        return match.group(0)

    return None


def build_ai_summary(
    events: list[SecurityEvent],
    total_lines: int,
):
    if not events:
        return (
            "No suspicious activity was detected during analysis. "
            "Log data appears normal based on current detection rules."
        )

    severity_counter = Counter(
        event.severity
        for event in events
    )

    event_counter = Counter(
        event.event_type
        for event in events
    )

    ip_counter = Counter(
        event.source_ip
        for event in events
        if event.source_ip
    )

    top_event = (
        event_counter.most_common(1)[0][0]
        if event_counter
        else "Unknown Activity"
    )

    top_ip = (
        ip_counter.most_common(1)[0][0]
        if ip_counter
        else "Unknown"
    )

    confidence = min(
        98,
        55 + (len(events) * 4)
    )

    threat_level = "LOW"

    if severity_counter["Critical"] >= 1:
        threat_level = "CRITICAL"
    elif severity_counter["High"] >= 2:
        threat_level = "HIGH"
    elif severity_counter["Medium"] >= 2:
        threat_level = "MEDIUM"

    recommendations = []

    if severity_counter["Critical"] > 0:
        recommendations.append(
            "- Investigate critical systems immediately"
        )

    if severity_counter["High"] > 0:
        recommendations.append(
            "- Review authentication and access logs"
        )

    if ip_counter:
        recommendations.append(
            "- Block or monitor suspicious source IP addresses"
        )

    recommendations.append(
        "- Continue monitoring for repeated attack behavior"
    )

    recommendation_text = "\n".join(recommendations)

    summary = f"""
Potential malicious activity detected during log analysis.

Threat Level: {threat_level}
Confidence Score: {confidence}%

Analysis Overview:
- {len(events)} suspicious security events identified
- Most common activity: {top_event}
- Primary source IP: {top_ip}
- Total log lines analyzed: {total_lines}

Observed Behavior:
The analyzed logs indicate possible hostile activity including authentication abuse,
probing behavior, web exploitation attempts, or suspicious outbound traffic patterns.
Multiple indicators suggest coordinated reconnaissance or attack activity.

Severity Breakdown:
- Critical Events: {severity_counter['Critical']}
- High Events: {severity_counter['High']}
- Medium Events: {severity_counter['Medium']}
- Low Events: {severity_counter['Low']}

Recommended Actions:
{recommendation_text}
"""

    return summary.strip()


def analyze_log_text(
    text: str
):
    lines = text.splitlines()

    events = []

    for line_number, line in enumerate(
        lines,
        start=1
    ):
        lowered = line.lower()

        for rule in SUSPICIOUS_PATTERNS:
            if re.search(
                rule["pattern"],
                lowered
            ):
                event = SecurityEvent(
                    line_number=line_number,
                    severity=rule["severity"],
                    event_type=rule["event_type"],
                    source_ip=extract_ip(line),
                    message=line.strip(),
                    recommendation=rule["recommendation"],
                )

                events.append(event)

    critical_count = sum(
        1
        for event in events
        if event.severity == "Critical"
    )

    high_count = sum(
        1
        for event in events
        if event.severity == "High"
    )

    medium_count = sum(
        1
        for event in events
        if event.severity == "Medium"
    )

    low_count = sum(
        1
        for event in events
        if event.severity == "Low"
    )

    ai_summary = build_ai_summary(
        events,
        len(lines)
    )

    return AnalysisSummary(
        total_lines=len(lines),
        suspicious_count=len(events),
        critical_count=critical_count,
        high_count=high_count,
        medium_count=medium_count,
        low_count=low_count,
        ai_summary=ai_summary,
        events=events,
    )