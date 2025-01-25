document.getElementById('eventForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const venue = document.getElementById('venue').value;
    const ticketPrice = parseFloat(document.getElementById('ticketPrice').value);

    const responseMessage = document.getElementById('responseMessage');

    const eventData = {
        name: name,
        date: date,
        venue: venue,
        ticketPrice: ticketPrice
    };

    const response = await fetch('https://3xh06rhpg2.execute-api.eu-west-1.amazonaws.com/prod/create-event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ body: JSON.stringify(eventData) })
    });

    const result = await response.json();

    if (response.ok) {
        responseMessage.style.color = 'green';
        responseMessage.textContent = `Event created successfully! Event ID: ${result.id}`;
    } else {
        responseMessage.style.color = 'red';
        responseMessage.textContent = `Error: ${result.error}`;
    }
});
