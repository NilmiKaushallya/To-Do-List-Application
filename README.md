## API Documentation

### Client-Side API Functions

#### `login`
- **Description**: Initiates user authentication by sending credentials to the server.
- **Request**:
  - Method: POST
  - URL: `LOGIN`
  - Body:
    ```json
    {
      "username": "example",
      "password": "examplePassword"
    }
    ```
- **Response**:
  - Status Code: 200
  - Body:
    ```json
    {
      "token": "exampleToken"
    }
    ```

#### `register`
- **Description**: Registers a new user account.
- **Request**:
  - Method: POST
  - URL: `REGISTER`
  - Body:
    ```json
    {
      "username": "newuser",
      "password": "newUserPassword",
      "email": "newuser@example.com"
    }
    ```
- **Response**:
  - Status Code: 200
  - Body:
    ```json
    {
      "message": "User registered successfully"
    }
    ```

#### `createTodoApi`
- **Description**: Creates a new todo item for the authenticated user.
- **Request**:
  - Method: POST
  - URL: `CREATE_TODO`
  - Body:
    ```json
    {
      "title": "New Todo",
      "desc": "Description of the new todo",
      "dueDate": "2024-07-15"
    }
    ```
- **Response**:
  - Status Code: 200
  - Body:
    ```json
    {
      "message": "Todo created successfully"
    }
    ```

#### `getTodoApi`
- **Description**: Retrieves the list of todos for the authenticated user.
- **Request**:
  - Method: GET
  - URL: `TODO_LIST`
- **Response**:
  - Status Code: 200
  - Body:
    ```json
    {
      "todos": [
        {
          "_id": "todoId",
          "title": "Todo Title",
          "desc": "Todo Description",
          "dueDate": "2024-07-15",
          "isCompleted": false,
          "date": "2024-07-10T08:00:00.000Z"
        },
        // More todo objects
      ]
    }
    ```

#### `deleteTodoApi`
- **Description**: Deletes a todo item for the authenticated user.
- **Request**:
  - Method: POST
  - URL: `DELETE_TODO`
  - Body:
    ```json
    {
      "todo_id": "todoId"
    }
    ```
- **Response**:
  - Status Code: 200
  - Body:
    ```json
    {
      "message": "Todo deleted successfully"
    }
    ```

#### `MarkTodoApi`
- **Description**: Marks a todo item as completed or incomplete.
- **Request**:
  - Method: POST
  - URL: `MARK_TODO`
  - Body:
    ```json
    {
      "todo_id": "todoId"
    }
    ```
- **Response**:
  - Status Code: 200
  - Body:
    ```json
    {
      "message": "Todo marked as completed"
    }
    ```

#### `UpdateTodoApi`
- **Description**: Updates an existing todo item for the authenticated user.
- **Request**:
  - Method: POST
  - URL: `UPDATE_TODO`
  - Body:
    ```json
    {
      "todo_id": "todoId",
      "title": "Updated Todo Title",
      "desc": "Updated Todo Description",
      "dueDate": "2024-07-15"
    }
    ```
- **Response**:
  - Status Code: 200
  - Body:
    ```json
    {
      "message": "Todo updated successfully"
    }
    ```

---

### Server-Side API Routes

#### `apiRoute` (Non-protected routes)
- **`POST /register`**
  - Description: Registers a new user.
  - Request Body:
    ```json
    {
      "username": "string",
      "password": "string",
      "email": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "User registered successfully"
    }
    ```

- **`POST /login`**
  - Description: Authenticates a user.
  - Request Body:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - Response:
    ```json
    {
      "token": "string"
    }
    ```

#### `apiProtected` (Protected routes, requires authentication token)
- **`POST /createtodo`**
  - Description: Creates a new todo item.
  - Request Body:
    ```json
    {
      "title": "string",
      "desc": "string",
      "dueDate": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "Todo created successfully"
    }
    ```

- **`POST /marktodo`**
  - Description: Marks a todo item as completed.
  - Request Body:
    ```json
    {
      "todo_id": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "Todo marked as completed"
    }
    ```

- **`POST /deletetodo`**
  - Description: Deletes a todo item.
  - Request Body:
    ```json
    {
      "todo_id": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "Todo deleted successfully"
    }
    ```

- **`PUT /updatetodo`**
  - Description: Updates an existing todo item.
  - Request Body:
    ```json
    {
      "todo_id": "string",
      "title": "string",
      "desc": "string",
      "dueDate": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "Todo updated successfully"
    }
    ```

- **`GET /todolist`**
  - Description: Retrieves the list of todos.
  - Response:
    ```json
    {
      "todos": [
        {
          "_id": "string",
          "title": "string",
          "desc": "string",
          "dueDate": "string",
          "isCompleted": "boolean",
          "date": "string"
        }
      ]
    }
    ```

---
