import json
import boto3
import os
from boto3.dynamodb.conditions import Key

def get_table():
    dynamodb = boto3.resource("dynamodb", region_name=os.environ.get("AWS_REGION", "eu-central-1"))
    return dynamodb.Table(os.environ["PROJECTS_TABLE_NAME"])

def serialize_item(item):
    for k, v in item.items():
        if isinstance(v, set):
            item[k] = list(v)
    return item

def lambda_handler(event, context):
    table = get_table()  # initialize here, after environment is guaranteed
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
