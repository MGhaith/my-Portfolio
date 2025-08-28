import os
import pytest
from unittest.mock import patch
from app import lambda_handler

@pytest.fixture(autouse=True)
def mock_env_vars():
    with patch.dict(os.environ, {"PROJECTS_TABLE_NAME": "dummy-table", "AWS_REGION": "eu-central-1"}):
        yield

def test_lambda_handler_returns_projects():
    event = {}  # mock API Gateway event if needed
    context = None
    response = lambda_handler(event, context)
    assert response["statusCode"] == 200
    assert "projects" in response["body"]
