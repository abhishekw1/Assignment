## Assignment

# 1.User Model:

Create a User model with properties like id, firstname, lastname, email, address.

# 2.User Service:

Create a User service that manages Users. It should have methods for CRUD operations:
getUsers(): Retrieve all users.
addUser(user: User): Add a new users.
updateUser(user: User): Update an existing users.
deleteUser(id: number): Delete a users by ID.

# 3.Users List Component:

Create a UserList component that displays a list of tasks.
Use the User service to retrieve Users and display them in a table or list.
Include buttons or icons for editing and deleting Users.

NOTE: Use Api 'https://jsonplaceholder.typicode.com/users' to fetch users and display into list when application is loaded.

# 4.User Form Component:

Create a UserForm component for adding and editing tasks.
Use reactive forms to handle the task input fields ( firstname, lastname, email, address).
Implement validation for required fields.

# 5.Service for Data Passing:

Create a DataService that includes a BehaviorSubject to store the selected users.
Inject the DataService into both the UserList and UserForm components.

# 6.Data Passing:

When a user is selected in the UserList component, use the DataService to pass the selected user to the UserForm component.
When a user is added or updated in the UserForm component, use the DataService to notify the UserList component to refresh the user list.

# 7.Styling: Use Bootstrap, CSS

Apply basic styling to make the application visually appealing.
cmd

# 8.Initially show the users:

use any dummy api to fetch data
