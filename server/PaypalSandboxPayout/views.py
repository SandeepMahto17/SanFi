from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from datetime import datetime

import paypalrestsdk
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import uuid  # For generating unique IDs
from datetime import datetime


# Configure PayPal sandbox environment
paypalrestsdk.configure({
    "mode": "sandbox",  # Use "live" for production
    "client_id": "AU2deqrY0qLHPAi0lqM8-onozy5OlKO2NfGNNXwSzx1zo9BXFLTsqDiNh9OAG9zjMj7mO3PwfYzzd3Kd",
    "client_secret": "EHMNDBgl4qbmKXUGYQJ7NLGbdFFk0sSXMDwpGxHnztJAaKk-H0IAoX_yiPXgIu5oCFctWerUyRAb-uMd"
})


@csrf_exempt
def process_payment(request):
    if request.method == 'POST':
        try:
            # Parse the incoming data
            data = json.loads(request.body)
            vendor_email = data.get('vendor_email')
            dollar_amount = data.get('dollar_amount')

            # Generate a unique sender_batch_id using UUID or timestamp
            unique_batch_id = str(uuid.uuid4())  # or use datetime.now().strftime('%Y%m%d%H%M%S')

            # Create a payout object with async mode (sync_mode=False)
            payout = paypalrestsdk.Payout({
                "sender_batch_header": {
                    "sender_batch_id": unique_batch_id,  # Unique ID for the payout batch
                    "email_subject": "You have a payment!"
                },
                "items": [{
                    "recipient_type": "EMAIL",
                    "amount": {
                        "value": str(dollar_amount),
                        "currency": "USD"
                    },
                    "receiver": vendor_email,  # Vendor's email address
                    "note": "Payment for your product.",
                    "sender_item_id": "Item_" + unique_batch_id  # Unique ID for the item
                }]
            })

            # Execute the payout in asynchronous mode
            if payout.create(sync_mode=False):  # async mode is set
                return JsonResponse({
                    'status': 'success', 
                    'payout_batch_id': payout.batch_header.payout_batch_id
                })
            else:
                return JsonResponse({
                    'status': 'failed', 
                    'error': payout.error
                }, status=400)

        except Exception as e:
            return JsonResponse({'status': 'failed', 'error': str(e)}, status=500)

    return JsonResponse({'status': 'invalid request'}, status=400)