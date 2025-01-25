import json
import uuid
import boto3
from datetime import datetime

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('gatherhub-storage')  

def lambda_handler(event, context):
    try:
        # Parse request body
        body = json.loads(event['body'])
        
        # Generate a unique id for the event
        event_id = str(uuid.uuid4())
        
        # Event details
        name = body['name']
        date = body['date']  # Ensure it's in ISO 8601 format (e.g., '2025-01-30')
        venue = body['venue']
        ticket_price = body['ticketPrice']
        
        # Insert into DynamoDB
        table.put_item(
            Item={
                'id': event_id,
                'name': name,
                'date': date,
                'venue': venue,
                'ticketPrice': ticket_price,
                'createdAt': datetime.utcnow().isoformat()  # Optional: Timestamp
            }
        )
        
        # Return success response
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Event created successfully!', 'id': event_id})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
