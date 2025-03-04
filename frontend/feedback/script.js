document.getElementById("feedbackForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const eventName = document.getElementById("eventName").value;
    // const userId = document.getElementById("userId").value;
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;

    // API URL (replace with your actual API Gateway URL)
    const apiUrl = "https://w5cmwsy2fb.execute-api.eu-west-1.amazonaws.com/prod/feedback";

    const feedbackData = {
        eventName: eventName,
        rating: parseInt(rating),
        comment: comment,
    };
    const payload = {
        body: JSON.stringify(feedbackData)
    };
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        console.log(JSON.stringify(JSON.stringify(feedbackData)));

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

document.getElementById('back').addEventListener('click', () => {
    // Redirect to Update Event page
    window.location.href = 'https://d1tgztvbo79v27.cloudfront.net/'; 
});
