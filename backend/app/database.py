import sqlite3
from pathlib import Path
from app.schemas import AnalysisSummary

DB_PATH = Path(__file__).resolve().parent.parent / "art3mis_soc_ai.db"


def get_connection():
    return sqlite3.connect(DB_PATH)


def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS reports (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            file_name TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            total_lines INTEGER,
            suspicious_count INTEGER,
            critical_count INTEGER,
            high_count INTEGER,
            medium_count INTEGER,
            low_count INTEGER,
            ai_summary TEXT
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            report_id INTEGER,
            line_number INTEGER,
            source_ip TEXT,
            event_type TEXT,
            message TEXT,
            severity TEXT,
            recommendation TEXT,
            FOREIGN KEY(report_id) REFERENCES reports(id)
        )
    """)

    conn.commit()
    conn.close()


def create_user(username: str, password_hash: str):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO users (
            username,
            password_hash
        )
        VALUES (?, ?)
    """, (
        username,
        password_hash
    ))

    conn.commit()
    conn.close()


def get_user_by_username(username: str):
    conn = get_connection()
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM users
        WHERE username = ?
    """, (username,))

    user = cursor.fetchone()

    conn.close()

    return dict(user) if user else None


def save_report(
    analysis: AnalysisSummary,
    file_name: str = "pasted-text"
) -> int:
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO reports (
            file_name,
            total_lines,
            suspicious_count,
            critical_count,
            high_count,
            medium_count,
            low_count,
            ai_summary
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        file_name,
        analysis.total_lines,
        analysis.suspicious_count,
        analysis.critical_count,
        analysis.high_count,
        analysis.medium_count,
        analysis.low_count,
        analysis.ai_summary
    ))

    report_id = cursor.lastrowid

    for event in analysis.events:
        cursor.execute("""
            INSERT INTO events (
                report_id,
                line_number,
                source_ip,
                event_type,
                message,
                severity,
                recommendation
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            report_id,
            event.line_number,
            event.source_ip,
            event.event_type,
            event.message,
            event.severity,
            event.recommendation
        ))

    conn.commit()
    conn.close()

    return report_id


def get_reports():
    conn = get_connection()
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM reports
        ORDER BY created_at DESC
    """)

    reports = [dict(row) for row in cursor.fetchall()]

    conn.close()

    return reports


def get_report(report_id: int):
    conn = get_connection()
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM reports
        WHERE id = ?
    """, (report_id,))

    report = cursor.fetchone()

    if report is None:
        conn.close()
        return None

    cursor.execute("""
        SELECT *
        FROM events
        WHERE report_id = ?
        ORDER BY line_number ASC
    """, (report_id,))

    events = [dict(row) for row in cursor.fetchall()]

    conn.close()

    report_data = dict(report)
    report_data["events"] = events

    return report_data


def delete_report(report_id: int) -> bool:
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id
        FROM reports
        WHERE id = ?
    """, (report_id,))

    report = cursor.fetchone()

    if report is None:
        conn.close()
        return False

    cursor.execute("""
        DELETE FROM events
        WHERE report_id = ?
    """, (report_id,))

    cursor.execute("""
        DELETE FROM reports
        WHERE id = ?
    """, (report_id,))

    conn.commit()
    conn.close()

    return True


def delete_all_reports() -> int:
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT COUNT(*)
        FROM reports
    """)

    report_count = cursor.fetchone()[0]

    cursor.execute("""
        DELETE FROM events
    """)

    cursor.execute("""
        DELETE FROM reports
    """)

    conn.commit()
    conn.close()

    return report_count


def get_top_source_ips(limit=5):
    conn = get_connection()
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            source_ip,
            COUNT(*) AS total
        FROM events
        WHERE source_ip IS NOT NULL
          AND source_ip != ''
        GROUP BY source_ip
        ORDER BY total DESC
        LIMIT ?
    """, (limit,))

    rows = cursor.fetchall()

    conn.close()

    return [dict(row) for row in rows]