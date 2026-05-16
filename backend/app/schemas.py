from pydantic import BaseModel
from typing import Optional


class SecurityEvent(BaseModel):
    line_number: int
    source_ip: Optional[str] = None
    event_type: str
    message: str
    severity: str
    recommendation: str


class AnalysisSummary(BaseModel):
    total_lines: int
    suspicious_count: int
    critical_count: int
    high_count: int
    medium_count: int
    low_count: int
    ai_summary: str
    events: list[SecurityEvent]


class TextAnalyzeRequest(BaseModel):
    text: str


class RegisterRequest(BaseModel):
    username: str
    password: str


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"