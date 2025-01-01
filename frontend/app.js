const clientId = '2u4vfo24apguac73rovfapmebv'; // Replace with your Cognito User Pool Client ID
const redirectUri = 'http://gatherhub-website.s3-website-eu-west-1.amazonaws.com';   // Replace with your redirect URI (S3 URL)

// Cognito Hosted UI URLs for login and signup
const loginUrl = 'https://gatherhub-user-pool.auth.eu-west-1.amazoncognito.com/login?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}';
const signupUrl = 'https://gatherhub-user-pool.auth.eu-west-1.amazoncognito.com/signup?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}';

document.getElementById('loginButton')?.addEventListener('click', () => {
    window.location.href = loginUrl;
});

document.getElementById('signupButton')?.addEventListener('click', () => {
    window.location.href = signupUrl;
});
