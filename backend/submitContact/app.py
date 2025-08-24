import json
import boto3
import os
import uuid
from datetime import datetime

dynamodb = boto3.resource("dynamodb", region_name="eu-central-1")
table = dynamodb.Table(os.environ["CONTACTS_TABLE_NAME"])
ses = boto3.client("ses", region_name="eu-central-1")

def lambda_handler(event, context):
    try:
        body = json.loads(event.get("body", "{}"))
        contact_id = str(uuid.uuid4())

        # Save to DynamoDB
        table.put_item(Item={
            "contactId": contact_id,
            "name": body["name"],
            "email": body["email"],
            "message": body["message"],
            "timestamp": datetime.utcnow().isoformat()
        })

        # Send email via SES
        ses.send_email(
            Source=os.environ["SES_FROM_EMAIL"],
            Destination={"ToAddresses": [os.environ["SES_TO_EMAIL"]]},
            Message={
                "Subject": {"Data": f"New contact from {body['name']}"},
                "Body": {
                    "Text": {
                        "Data": (
                            f"Name: {body['name']}\n"
                            f"From: {body['email']}\n"
                            f"Message: {body['message']}\n"
                            f"Time: {datetime.utcnow().isoformat()}"
                        )
                    }
                }
            }
        )

        return {"statusCode": 200, "body": json.dumps({"message": "Contact submitted"})}

    except Exception as e:
        return {"statusCode": 500, "body": json.dumps({"error": str(e)})}
