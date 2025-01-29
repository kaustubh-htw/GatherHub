document.addEventListener("DOMContentLoaded", () => {
  // Get event name from URL
  const urlParams = new URLSearchParams(window.location.search);
  const eventName = urlParams.get("event");

  if (eventName) {
      // Decode the event name (in case of URL encoding)
      const decodedEventName = decodeURIComponent(eventName);

      // Display the event name in the form
      document.getElementById("event-name").textContent = decodedEventName;

      // Store event name in hidden input field
      document.getElementById("event-input").value = decodedEventName;
  } else {
      document.getElementById("event-name").textContent = "Unknown Event";
  }

  // Back to Home Page button functionality
  document.getElementById("back").addEventListener("click", () => {
      window.location.href = "https://gatherhub-website.s3.eu-west-1.amazonaws.com/event_list.html";
  });

  // Handle form submission
  document.getElementById("registrationForm").addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent default form submission

      // Collect form data
      const formData = {
          event: document.getElementById("event-input").value,
          firstName: document.getElementById("firstName").value,
          lastName: document.getElementById("lastName").value,
          email: document.getElementById("email").value
      };

      console.log("Form Data:", formData);
      alert(`Registered successfully for ${formData.event}!`);
  });
});
