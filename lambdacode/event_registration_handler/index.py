import json
import boto3
from datetime import datetime
from botocore.exceptions import ClientError

#hey from us

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table_name = os.environ['TABLE_NAME'] 
table = dynamodb.Table(table_name)
def lambda_handler(event, context):
    """
    This function registers a new event for a user.
    The event details are stored in DynamoDB.
    """

    # Get event data from the input (assuming event data is passed as a JSON object)
    try:
        user_id = event['user_id']
        event_name = event['event_name']
        event_date = event['event_date']
        
        # Generate a unique event ID (timestamp-based for simplicity)
        event_id = str(int(datetime.timestamp(datetime.now())))
        
        # Define the event data structure
        event_data = {
            'id': event_id,  # Unique ID for the event
            'user_id': user_id,
            'event_name': event_name,
            'event_date': event_date,
            'registration_time': datetime.now().isoformat()  # Timestamp of registration
        }

        # Insert the event data into the DynamoDB table
        response = table.put_item(
            Item=event_data
        )

        # Return a success response
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Event registered successfully',
                'event_id': event_id
            })
        }

    except KeyError as e:
        # If required data is missing, return a 400 error
        return {
            'statusCode': 400,
            'body': json.dumps({
                'message': f'Missing required parameter: {str(e)}'
            })
        }
    
    except ClientError as e:
        # Catch any DynamoDB errors and return a 500 error
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': f'Error registering event: {e.response["Error"]["Message"]}'
            })
        }

