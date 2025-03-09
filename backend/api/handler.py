from mangum import Mangum
from api.app import app
from backend.settings import Settings  # type: ignore
from libs.monitoring import configure_logfire


settings = Settings()
handler = Mangum(app)
configure_logfire().instrument_aws_lambda(handler)
