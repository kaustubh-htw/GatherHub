// Check if user is logged in by verifying access_token or id_token
function checkAuth() {
  const accessToken = sessionStorage.getItem('access_token');
  const idToken = sessionStorage.getItem('id_token');
  const urlParams = new URLSearchParams(window.location.search);
  const authCode = urlParams.get('code'); // Extract authorization code from URL

  if (authCode) {
    // If there's an authorization code, exchange it for tokens
    exchangeAuthCodeForTokens(authCode);
    return;
  }

  if (!accessToken || !idToken) {
    alert('You need to log in first.');
    window.location.href = 'https://nqzilphn1.auth.eu-west-1.amazoncognito.com/login?client_id=6dj6abdhm6500vroqo6918ide6&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fd1tgztvbo79v27.cloudfront.net';
    return; // Stop execution
  }

  // Optional: Validate token expiration
  if (isTokenExpired(accessToken) || isTokenExpired(idToken)) {
    alert('Your session has expired. Please log in again.');
    sessionStorage.clear();
    window.location.href = 'https://nqzilphn1.auth.eu-west-1.amazoncognito.com/login?client_id=6dj6abdhm6500vroqo6918ide6&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fd1tgztvbo79v27.cloudfront.net';
    return;
  }

  console.log('User is authenticated.');
}

// Helper: Check if token is expired
function isTokenExpired(token) {
  const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT
  return decoded.exp * 1000 < Date.now(); // Check expiration
}

// Exchange authorization code for tokens
function exchangeAuthCodeForTokens(authCode) {
  const clientId = '6dj6abdhm6500vroqo6918ide6'; // Replace with your actual client ID
  const redirectUri = 'https://d1tgztvbo79v27.cloudfront.net'; // Replace with your actual callback URL
  const tokenUrl = 'https://nqzilphn1.auth.eu-west-1.amazoncognito.com/oauth2/token';

  const data = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: clientId,
    code: authCode,
    redirect_uri: redirectUri,
  });

  fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to exchange auth code for tokens');
      }
      return response.json();
    })
    .then((tokens) => {
      // Store the tokens in sessionStorage
      sessionStorage.setItem('access_token', tokens.access_token);
      sessionStorage.setItem('id_token', tokens.id_token);

      // Remove the auth code from the URL
      window.history.replaceState({}, document.title, '/');
      console.log('Tokens stored successfully.');

      alert('Login successful!');
    })
    .catch((error) => {
      console.error('Error exchanging auth code:', error);
      alert('Authentication failed. Please try again.');
    });
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
