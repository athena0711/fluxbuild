from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router
from contextlib import asynccontextmanager
from backend.settings import Settings  # type: ignore
from libs.monitoring import configure_logfire

settings = Settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


is_cloud = settings.ENVIRONMENT == "CLOUD"
app = FastAPI(
    title=settings.TITLE,
    lifespan=lifespan,
    root_path=settings.ROOT_PATH if is_cloud else "",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

if not is_cloud:
    configure_logfire().instrument_fastapi(app)
else:
    import logfire

    logfire.instrument_fastapi(app)
