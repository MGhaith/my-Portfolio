import pytest
from app import lambda_handler

def test_lambda_handler_returns_projects():
    event = {}  # mock API Gateway event if needed
    context = None
    response = lambda_handler(event, context)
    assert response['statusCode'] == 200
    assert 'projects' in response['body']
