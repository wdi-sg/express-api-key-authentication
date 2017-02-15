# Express API Key Authentication Example

This example shows a simple way to secure an API, you a single API Key, which must be given in all requests. This API Key can be stored in the server's environment variables and compared against a second token passed in the request http header.

In this example, the AJAX code retrieves the token from local storage. In the same way, if you wanted an easy way to add Admin access to your API, you could manually add this token to the local storage on your browser, then only you would be able to access the Admin features of the API.

You can use something like: http://randomkeygen.com/ to generate a random key.
