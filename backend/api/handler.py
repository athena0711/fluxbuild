from mangum import Mangum
from api.app import app
from settings import Settings
from libs.monitoring import configure_logfire


settings = Settings()
handler = Mangum(app)()
configure_logfire().instrument_aws_lambda(handler)
