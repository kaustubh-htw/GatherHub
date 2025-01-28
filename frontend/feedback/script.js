document.getElementById("feedbackForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const eventId = document.getElementById("eventName").value;
    // const userId = document.getElementById("userId").value;
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;

    // API URL (replace with your actual API Gateway URL)
    const apiUrl = "https://hs1vo5huvf.execute-api.eu-west-1.amazonaws.com/prod/feedback";

    const feedbackData = {
        eventName: eventName,
        rating: parseInt(rating),
        comment: comment,
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(feedbackData),
        });

        if (!response.ok) {
            throw new Error("Failed to submit feedback");
        }

        const result = await response.json();
        document.getElementById("responseMessage").innerText = "Feedback submitted successfully!";
        
        // Clear the form after submission
        document.getElementById("feedbackForm").reset();
    } catch (error) {
        document.getElementById("responseMessage").innerText = `Error: ${error.message}`;
    }
});
