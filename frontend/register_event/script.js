document.addEventListener("DOMContentLoaded", () => {
    const eventListContainer = document.getElementById("event-list");
  
    // Fetch events from the API
    fetch("https://5916dbaidi.execute-api.eu-west-1.amazonaws.com/prod/event-list")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();  // Parse the response body
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
  
      // Render event details
      eventDiv.innerHTML = `
        <h3>${event.name}</h3>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Venue:</strong> ${event.venue}</p>
        <p><strong>Ticket Price:</strong> $${event.ticketPrice}</p>
        <button id ="register-btn">Register</button>
        `;

  
  
      eventListContainer.appendChild(eventDiv);
    });
  }
  
  // Register event function
  // function registerEvent(eventname, eventId, event) {
  //   alert(`Thank you!\nYou have successfully registered for ${eventname} with ID: ${eventId}`);
  //   // Add your registration logic here
  //   const button = event.target;
  
  // // Change the button text to "Registered"
  // button.textContent = "Registered";
  //   // Change button color to green
  //   button.style.backgroundColor = "green";
  //   button.style.color = "white";  // Optionally change text color for better contrast
    
  //   button.disabled = true;  // Optionally disable the button to prevent further clicks
  // }
// Attach event listener to the container for dynamic elements
document.getElementById("event-list").addEventListener("click", (event) => {
  if (event.target && event.target.id === "register-btn") {
    // Redirect to the registration page
    window.location.href = "F:\GatherHub\GatherHub\frontend\register_event\register.html";
  }
});
