document.getElementById('eventForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get input values from the form fields
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const venue = document.getElementById('venue').value;
    const ticketPrice = parseFloat(document.getElementById('ticketPrice').value); // Ensure ticketPrice is a float

    const responseMessage = document.getElementById('responseMessage'); // Display success/error message

    // Create event data object
    const eventData = {name:name,date:date,venue:venue,ticketPrice:ticketPrice};
    console.log(eventData);

    try {
        // Send data to the backend API using fetch
        const response = await fetch('https://w5cmwsy2fb.execute-api.eu-west-1.amazonaws.com/prod/create-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body:JSON.stringify({ body:JSON.stringify(eventData) })// Send eventData directly, not stringified twice
        });

        console.log(response)
        console.log(JSON.stringify({ body: JSON.stringify(eventData) }))

        // Parse the response body into JSON once
        const result = await response.json();
        const eventId = JSON.parse(result.body).id;
        console.log(result);

        // Check if the response was successful
        if (response.ok) {
            responseMessage.style.color = 'green'; // Set success color
            responseMessage.textContent = `Event created successfully! Event ID: ${eventId}`;
        } else {
            responseMessage.style.color = 'red'; // Set error color
            responseMessage.textContent = `Error: ${result.error || 'Unknown error'}`; // Display error message
        }
    } catch (error) {
        // Catch any error during fetch (network issues, server unavailability)
        responseMessage.style.color = 'red';
        responseMessage.textContent = `Error: ${error.message || 'An unexpected error occurred'}`;
    }
});

document.getElementById('back').addEventListener('click', () => {
    // Redirect to Update Event page
    window.location.href = 'https://d1tgztvbo79v27.cloudfront.net/'; 
});