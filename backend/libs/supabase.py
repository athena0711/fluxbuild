from supabase._async.client import AsyncClient, create_client as create_async_client
from backend.settings import Settings  # type: ignore

settings = Settings()


async def get_supabase_async_client() -> AsyncClient:
    return await create_async_client(
        settings.SUPABASE_URL, settings.SUPABASE_SERVICE_KEY
    )
