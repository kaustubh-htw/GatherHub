const clientId = '6dj6abdhm6500vroqo6918ide6'; // Replace with your Cognito User Pool Client ID
const redirectUri = 'https://d1tgztvbo79v27.cloudfront.net';   // Replace with your redirect URI (S3 URL)

// Cognito Hosted UI URLs for login and signup
const loginUrl = `https://User pool - ji7fqr.auth.eu-west-1.amazoncognito.com/login?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
const signupUrl = `https://User pool - ji7fqr.auth.eu-west-1.amazoncognito.com/signup?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

document.getElementById('loginButton')?.addEventListener('click', () => {
    window.location.href = loginUrl;
});

document.getElementById('signupButton')?.addEventListener('click', () => {
    window.location.href = signupUrl;
});
