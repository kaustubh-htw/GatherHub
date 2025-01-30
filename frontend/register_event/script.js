document.addEventListener("DOMContentLoaded", () => {
  const eventListContainer = document.getElementById("event-list");

  // Fetch events from the API
  fetch("https://w5cmwsy2fb.execute-api.eu-west-1.amazonaws.com/prod/event-list")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Parse the response body
    })
    .then((data) => {
      // Parse the stringified 'body' into a JSON object
      const responseBody = JSON.parse(data.body);
      const events = responseBody.events;

      // Check if events exist
      if (!events || events.length === 0) {
        eventListContainer.innerHTML = "<p class='no-events'>No events available at the moment.</p>";
        return;
      }

      // Render events
      renderEventList(events);
    })
    .catch((error) => {
      console.error("Error fetching events:", error);
      eventListContainer.innerHTML = "<p class='no-events'>Failed to load events. Please try again later.</p>";
    });
});

// Function to render the list of events
function renderEventList(events) {
  const eventListContainer = document.getElementById("event-list");
  events.forEach((event) => {
      const eventDiv = document.createElement("div");
      eventDiv.classList.add("event");

      // Encode event name to make it URL-safe
      const encodedEventName = encodeURIComponent(event.name);

      eventDiv.innerHTML = `
          <h3>${event.name}</h3>
          <p><strong>Date:</strong> ${event.date}</p>
          <p><strong>Venue:</strong> ${event.venue}</p>
          <p><strong>Ticket Price:</strong> $${event.ticketPrice}</p>
          <button class="register-btn" data-event-name="${encodedEventName}">Register</button>
      `;

      eventListContainer.appendChild(eventDiv);
  });
}

// Attach event listener to the container for dynamic elements
document.getElementById("event-list").addEventListener("click", (event) => {
  if (event.target && event.target.classList.contains("register-btn")) {
      // Get event name from the clicked button
      const eventName = event.target.getAttribute("data-event-name");

      // Redirect to the registration page with event name in URL
      window.location.href = `https://gatherhub-website.s3.eu-west-1.amazonaws.com/register_event/register.html?event=${eventName}`;
  }
});
