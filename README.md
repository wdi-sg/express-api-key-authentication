# Single User Node Authentication Example

A single auth-token is stored in the environment variables. 
For secret routes, it is compared against a second token passed in the http header.
The AJAX example retrieves the token from local storage.


You can use something like: http://randomkeygen.com/ to generate a random key and store it in your environment vars.
You can then add it to your local storage so that only you can access the secret features.