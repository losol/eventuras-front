# To create a new account (admin)

## Create and register the new user

Login to testmail.app.
Create a new tagged email adress. (for instance {testmailaccount identifier}.admin@inbox.testmail.app)
Use this to register on eventuras. Use the json email viewer to view the code (https://testmail.app/console)

## Add the user to the organization through the Eventuras API

Create a PUT request to the following endpoint:

`{{baseUrl}}/v3/organizations/{{organizationId}}/members/{{targetUserId}}`

Where

- baseUrl = the base url for the API
- organizationId = the org id (should be 1)
- targetUserId = the user that you have created earlier, its id in the system(after registration)

Make sure you have admin right token to send the request!

## Give the user admin rights

Make sure the user has admin rights in auth0 first!
Create a POST request to the following endpoint:

`{{baseUrl}}/v3/organizations/{{organizationId}}/members/{{targetUserId}}/roles`

With the following Body:

`{
  "role":"Admin"
}`

Confirm the role is added by creating a GET request:

`{{baseUrl}}/v3/organizations/{{organizationId}}/members/{{targetUserId}}/roles`
