import os
import json
import urllib.request
import urllib.error
from app.schemas import SecurityEvent


OLLAMA_URL = os.getenv(
    "OLLAMA_URL",
    "http://localhost:11434/api/generate"
)

OLLAMA_MODEL = os.getenv(
    "OLLAMA_MODEL",
    "llama3.2"
)


def build_ai_summary(events: list[SecurityEvent], total_lines: int) -> str:
    if not events:
        return (
            "No obvious suspicious activity was detected in this log sample. "
            "Continue monitoring for failed login spikes, unauthorized access attempts, "
            "and unusual source IP behavior."
        )

    event_preview = "\n".join(
        [
            f"- Severity: {event.severity} | Type: {event.event_type} | "
            f"IP: {event.source_ip or 'N/A'} | Message: {event.message}"
            for event in events[:12]
        ]
    )

    prompt = f"""
You are ART3MIS SOC AI, a cybersecurity analyst assistant.

Analyze the following security log findings and write a concise SOC-style incident summary.

Total log lines reviewed: {total_lines}
Suspicious events detected: {len(events)}

Detected events:
{event_preview}

Write the response with:
1. What happened
2. Why it matters
3. Risk level
4. Recommended next steps

Keep it professional, clear, and practical.
"""

    payload = {
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        "stream": False
    }

    try:
        request = urllib.request.Request(
            OLLAMA_URL,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST"
        )

        with urllib.request.urlopen(request, timeout=15) as response:
            data = json.loads(response.read().decode("utf-8"))

            return (
                data.get("response", "").strip()
                or fallback_summary(events, total_lines)
            )

    except (
        urllib.error.URLError,
        TimeoutError,
        json.JSONDecodeError
    ):
        return fallback_summary(events, total_lines)


def fallback_summary(events: list[SecurityEvent], total_lines: int) -> str:
    critical = [
        event for event in events
        if event.severity == "Critical"
    ]

    high = [
        event for event in events
        if event.severity == "High"
    ]

    if critical:
        risk = "Critical"
    elif high:
        risk = "High"
    elif events:
        risk = "Moderate"
    else:
        risk = "Low"

    top_ips = {}

    for event in events:
        if event.source_ip:
            top_ips[event.source_ip] = (
                top_ips.get(event.source_ip, 0) + 1
            )

    most_active_ip = (
        max(top_ips, key=top_ips.get)
        if top_ips
        else None
    )

    ip_sentence = (
        f" The most active suspicious source IP was {most_active_ip}."
        if most_active_ip
        else ""
    )

    return (
        f"ART3MIS SOC AI reviewed {total_lines} log lines and found "
        f"{len(events)} suspicious security event(s). Overall risk is {risk}."
        f"{ip_sentence} Recommended next steps: review affected accounts, "
        f"block or investigate suspicious IPs, verify successful logins, "
        f"and preserve the logs for incident documentation."
    )