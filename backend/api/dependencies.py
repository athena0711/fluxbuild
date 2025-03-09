from libs.supabase import get_supabase_async_client
from supabase._async.client import AsyncClient
from fastapi import Depends
from typing import Annotated, AsyncGenerator


async def supabase_async_client() -> AsyncGenerator[AsyncClient, None]:
    supabase_client = await get_supabase_async_client()
    yield supabase_client


AsyncSupabaseClient = Annotated[AsyncClient, Depends(supabase_async_client)]
