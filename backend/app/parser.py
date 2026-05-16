import re
from typing import Optional


IP_PATTERN = re.compile(
    r"\b(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}"
    r"(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\b"
)


def extract_ip(line: str) -> Optional[str]:
    match = IP_PATTERN.search(line)
    return match.group(0) if match else None


def split_log_lines(text: str) -> list[str]:
    return [line.strip() for line in text.splitlines() if line.strip()]
