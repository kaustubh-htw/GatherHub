// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", async function () {
  // Get event name from URL
  const urlParams = new URLSearchParams(window.location.search);
  const eventName = urlParams.get("event");

  if (eventName) {
      // Decode and set the event name in the form and hidden input
      const decodedEventName = decodeURIComponent(eventName);
      document.getElementById("event-name").textContent = decodedEventName;
      document.getElementById("event-input").value = decodedEventName;
  } else {
      document.getElementById("event-name").textContent = "Unknown Event";
  }

  // Handle form submission
  document.getElementById("registrationForm").addEventListener("submit", async function (event) {
      event.preventDefault();

      // Collect form data
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const email = document.getElementById("email").value.trim();
      const selectedEvent = document.getElementById("event-input").value; // Get event name from hidden input

      // Validate form data
      if (!firstName || !lastName || !email) {
          alert("Please fill in all fields before submitting.");
          return;
      }

      // Prepare payload
      const registrationData = {
          firstName,
          lastName,
          email,
          eventName: selectedEvent,
      };
      const payload = {
        body: JSON.stringify(registrationData)
    };

      try {
          // Call the backend API (replace with your API Gateway endpoint)
          const response = await fetch("https://w5cmwsy2fb.execute-api.eu-west-1.amazonaws.com/prod/registration", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
          });

          if (response.status === 200) {
              alert(`Registration successful! A confirmation email has been sent to ${email}.`);
              // Redirect to events page
              window.location.href = "events.html";
          } else {
              throw new Error("Registration failed. Please try again.");
          }
      } catch (error) {
          alert(`Error: ${error.message}`);
      }
  });

  // Back to Home Page button functionality
  document.getElementById("back").addEventListener("click", () => {
      window.location.href = "https://gatherhub-website.s3.eu-west-1.amazonaws.com/register_event/events.html"; 
  });
});
