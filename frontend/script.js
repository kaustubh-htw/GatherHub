// Check if user is logged in by verifying access_token or id_token
function checkAuth() {
  const accessToken = localStorage.getItem('access_token');
  const idToken = localStorage.getItem('id_token');

  if (!accessToken || !idToken) {
    alert('You need to log in first.');
    window.location.href = 'https://nqzilphn1.auth.eu-west-1.amazoncognito.com/login?client_id=6dj6abdhm6500vroqo6918ide6&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fd1tgztvbo79v27.cloudfront.net'; // Redirect to Cognito login page
    return;
  } else {
    console.log('User is authenticated.');
    // Optionally, validate token expiration here
  }
}


// Event button click actions
document.getElementById('createEvent').addEventListener('click', () => {
  // Redirect to Create Event page
  window.location.href = 'https://gatherhub-website.s3.eu-west-1.amazonaws.com/event_creation_page/index.html'; // Replace with the actual Create Event page URL
});

document.getElementById('registerEvent').addEventListener('click', () => {
  // Redirect to Register Event page
  window.location.href = 'https://gatherhub-website.s3.eu-west-1.amazonaws.com/register_event/events.html'; // Replace with the actual Register Event page URL
});

document.getElementById('updateEvent').addEventListener('click', () => {
  // Redirect to Update Event page
  window.location.href = '/update-event'; // Replace with the actual Update Event page URL
});

// On page load, check if the user is authenticated
checkAuth();
