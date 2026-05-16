from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware

from app.analyzer import analyze_log_text
from app.auth import (
    create_access_token,
    hash_password,
    verify_password,
    get_current_user,
)
from app.database import (
    init_db,
    save_report,
    get_reports,
    get_report,
    delete_report,
    delete_all_reports,
    get_top_source_ips,
    create_user,
    get_user_by_username,
)
from app.schemas import (
    AnalysisSummary,
    TextAnalyzeRequest,
    RegisterRequest,
    LoginRequest,
    TokenResponse,
)


app = FastAPI(
    title="ART3MIS SOC AI API",
    description="AI-assisted cybersecurity log analysis backend.",
    version="0.5.3",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    init_db()


@app.get("/health")
def health_check():
    return {
        "status": "online",
        "service": "ART3MIS SOC AI API",
        "database": "initialized",
    }


@app.post("/api/auth/register")
def register(payload: RegisterRequest):
    existing_user = get_user_by_username(payload.username)

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Username already exists."
        )

    password_hash = hash_password(payload.password)

    create_user(
        payload.username,
        password_hash
    )

    return {
        "message": "User created successfully."
    }


@app.post(
    "/api/auth/login",
    response_model=TokenResponse
)
def login(payload: LoginRequest):
    user = get_user_by_username(payload.username)

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password."
        )

    valid_password = verify_password(
        payload.password,
        user["password_hash"]
    )

    if not valid_password:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password."
        )

    token = create_access_token({
        "sub": payload.username
    })

    return TokenResponse(
        access_token=token
    )


@app.post(
    "/api/analyze/text",
    response_model=AnalysisSummary
)
def analyze_text(
    payload: TextAnalyzeRequest,
    current_user: dict = Depends(get_current_user)
):
    if not payload.text.strip():
        raise HTTPException(
            status_code=400,
            detail="Text cannot be empty."
        )

    analysis = analyze_log_text(payload.text)

    save_report(
        analysis,
        file_name="pasted-text"
    )

    return analysis


@app.post(
    "/api/logs/upload",
    response_model=AnalysisSummary
)
async def upload_log(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    allowed_extensions = (
        ".txt",
        ".log",
        ".csv"
    )

    if not file.filename.lower().endswith(
        allowed_extensions
    ):
        raise HTTPException(
            status_code=400,
            detail=(
                "Unsupported file type. "
                "Upload .txt, .log, or .csv files."
            ),
        )

    raw = await file.read()

    try:
        text = raw.decode("utf-8")
    except UnicodeDecodeError:
        text = raw.decode("latin-1")

    if not text.strip():
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is empty."
        )

    analysis = analyze_log_text(text)

    save_report(
        analysis,
        file_name=file.filename
    )

    return analysis


@app.get("/api/reports")
def list_reports(
    current_user: dict = Depends(get_current_user)
):
    return get_reports()


@app.get("/api/reports/{report_id}")
def read_report(
    report_id: int,
    current_user: dict = Depends(get_current_user)
):
    report = get_report(report_id)

    if report is None:
        raise HTTPException(
            status_code=404,
            detail="Report not found."
        )

    return report


@app.delete("/api/reports")
def remove_all_reports(
    current_user: dict = Depends(get_current_user)
):
    deleted_count = delete_all_reports()

    return {
        "message": "All reports deleted successfully.",
        "deleted_count": deleted_count
    }


@app.delete("/api/reports/{report_id}")
def remove_report(
    report_id: int,
    current_user: dict = Depends(get_current_user)
):
    deleted = delete_report(report_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Report not found."
        )

    return {
        "message": "Report deleted successfully."
    }


@app.get("/api/analytics/top-ips")
def top_source_ip_analytics(
    current_user: dict = Depends(get_current_user)
):
    return get_top_source_ips()