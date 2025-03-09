import logfire
from backend.settings import Settings  # type: ignore

settings = Settings()


def configure_logfire() -> logfire.Logfire:
    return logfire.configure(
        token=settings.LOGFIRE_TOKEN, environment=settings.ENVIRONMENT
    )
