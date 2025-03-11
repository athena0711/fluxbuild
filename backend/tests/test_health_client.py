from api.app import app
from fastapi.testclient import TestClient
from dotenv import load_dotenv

def test_check():
    client = TestClient(app)
    response = client.get("/health")
    assert response.status_code == 200
