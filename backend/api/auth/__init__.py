from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi import Depends, HTTPException
from gotrue.errors import AuthApiError  # type: ignore
from gotrue.types import User  # type: ignore
from api.dependencies import AsyncSupabaseClient


async def IsAuthenticated(
    supabase_client: AsyncSupabaseClient,
    token: HTTPAuthorizationCredentials = Depends(HTTPBearer()),
) -> User:
    try:
        user = await supabase_client.auth.get_user(token.credentials)
        return user.user
    except AuthApiError:
        raise HTTPException(status_code=401, detail="Unauthorized, invalid token.")
