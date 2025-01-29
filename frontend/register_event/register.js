// js/register.js
document.getElementById("registrationForm").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    // Collect form data
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
  
    // Prepare payload
    const registrationData = {
      firstName,
      lastName,
      email,
      eventName: "Tech Conference 2025", // Example event name (dynamic if needed)
    };
  
    try {
      // Call the backend API (replace with your API Gateway endpoint)
      const response = await fetch("https://your-api-gateway-url/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });
  
      if (response.ok) {
        alert("Registration successful! A confirmation email has been sent to your email address.");
        // Optionally, redirect to another page
        window.location.href = "events.html";
      } else {
        throw new Error("Registration failed. Please try again.");
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });
  document.getElementById('back').addEventListener('click', () => {
    // Redirect to Update Event page
    window.location.href = 'https://d1tgztvbo79v27.cloudfront.net/'; 
});
