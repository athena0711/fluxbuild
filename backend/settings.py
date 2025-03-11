from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Literal


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    ## App Settings ##
    TITLE: str = "Fluxbuild"

    ## Required ##
    SUPABASE_URL: str
    SUPABASE_SERVICE_KEY: str
    SUPABASE_DB_URL: str
    ADMIN_EMAIL: str
    ADMIN_PASSWORD: str
    E2B_API_KEY: str
    LOGFIRE_TOKEN: str

    ## Infra ##
    ENVIRONMENT: Literal["LOCAL", "CLOUD"] = "LOCAL"
    ROOT_PATH: str = ""

    ## Storage ##
    DOCUMENTS_STORAGE: str = "Documents"

    ## Tables ##
    PROJECTS_TABLE: str = "Projects"
    
