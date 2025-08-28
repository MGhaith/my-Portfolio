import os
import pytest
from unittest.mock import patch, MagicMock
from app import lambda_handler

@pytest.fixture(autouse=True)
def set_env_vars(monkeypatch):
    monkeypatch.setenv("PROJECTS_TABLE_NAME", "dummy-table")
    monkeypatch.setenv("AWS_REGION", "eu-central-1")

@pytest.fixture
def mock_dynamodb(monkeypatch):
    mock_table = MagicMock()
    mock_table.scan.return_value = {"Items": [{"id": 1, "name": "Test Project"}]}
    mock_resource = MagicMock()
    mock_resource.Table.return_value = mock_table
    monkeypatch.setattr("boto3.resource", lambda *args, **kwargs: mock_resource)
    return mock_table

def test_lambda_handler_returns_projects(mock_dynamodb):
    event = {}
    context = None
    response = lambda_handler(event, context)
    assert response["statusCode"] == 200
    assert "projects" in response["body"]
