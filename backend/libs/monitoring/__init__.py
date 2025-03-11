import logfire
from settings import Settings

settings = Settings()


def configure_logfire() -> logfire.Logfire:
    return logfire.configure(
        token=settings.LOGFIRE_TOKEN, environment=settings.ENVIRONMENT
    )
