import json
import boto3
import os
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource("dynamodb", region_name=os.environ.get("AWS_REGION", "eu-central-1"))
table = dynamodb.Table(os.environ["PROJECTS_TABLE_NAME"])

def serialize_item(item):
    for k, v in item.items():
        if isinstance(v, set):
            item[k] = list(v)
    return item

def lambda_handler(event, context):
    """
    Handles GET /projects
    Returns all projects from DynamoDB table.
    """
    try:
        response = table.scan()
        items = [serialize_item(i) for i in response.get("Items", [])]

        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps(items)
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"error": str(e)})
        }
