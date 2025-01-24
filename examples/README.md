## Running the Example

You can run the example by following these steps:

- 1. Install Dependencies

```bash
npm install
```

- 2. Set Environment Variables
     Create a `.env` file in the root directory of the project and add the following environment variables:

```env
DB_URI=
PORT=5000
```

- 3. Start the Server

```bash
npm run dev
```

### Example Postman Requests

#### Create User

- **Method**: POST
- **URL**: `http://localhost:5000/users`
- **Body**: (JSON)

  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 30
  }
  ```

#### Get All Users

- **Method**: GET
- **URL**: `http://localhost:5000/users`

#### Get User by ID

- **Method**: GET
- **URL**: `http://localhost:5000/users/{id}`
- Replace `{id}` with the actual user ID obtained from the create user response.

#### Update User by ID

- **Method**: PUT
- **URL**: `http://localhost:5000/users/{id}`
- **Body**: (JSON)

  ```json
  {
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "age": 25
  }
  ```

#### Delete User by ID

- **Method**: DELETE
- **URL**: `http://localhost:5000/users/{id}`
- Replace `{id}` with the actual user ID obtained from the create user response.
