// Check if user is logged in by verifying access_token or id_token
function checkAuth() {
  const accessToken = localStorage.getItem('access_token');
  const idToken = localStorage.getItem('id_token');

  if (!accessToken || !idToken) {
    alert('You need to log in first.');
    window.location.href = '/https://eu-west-1nqzilphn1.auth.eu-west-1.amazoncognito.com/login?client_id=6dj6abdhm6500vroqo6918ide6&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fd1tgztvbo79v27.cloudfront.net';  // Redirect to login page or Cognito login page
  }
}

// Event button click actions
document.getElementById('createEventBtn').addEventListener('click', () => {
  // Redirect to Create Event page
  window.location.href = '/create-event'; // Replace with the actual Create Event page URL
});

document.getElementById('registerEventBtn').addEventListener('click', () => {
  // Redirect to Register Event page
  window.location.href = '/register-event'; // Replace with the actual Register Event page URL
});

document.getElementById('updateEventBtn').addEventListener('click', () => {
  // Redirect to Update Event page
  window.location.href = '/update-event'; // Replace with the actual Update Event page URL
});

// On page load, check if the user is authenticated
checkAuth();
