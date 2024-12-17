# EduConnect API Documentation

## Overview

EduConnect is an API designed to connect users with a platform for sharing and answering educational questions. This documentation outlines the key endpoints, their functionalities, and usage examples.

---

## Endpoints

### User Endpoints

#### **Get All Users**

Fetches logged in user's profile.

**URL:** `/user`

**Method:** `GET`

**Response:**

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

---

### Question Endpoints

#### **Get All Questions**

Fetches all questions posted by users.

**URL:** `/question`

**Method:** `GET`

**Response:**

```json
[
  {
    "id": 1,
    "title": "What is OAuth 2.0?",
    "content": "Can someone explain OAuth 2.0 with an analogy?",
    "author": "John Doe",
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

#### **Get Question by ID**

Fetches a specific question by its ID.

**URL:** `/question/:id`

**Method:** `GET`

**Response:**

```json
{
  "id": 1,
  "title": "What is OAuth 2.0?",
  "content": "Can someone explain OAuth 2.0 with an analogy?",
  "author": "John Doe",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### **Submit a New Question**

Allows users to post a new question.

**URL:** `/question`

**Method:** `POST`

**Request Body:**

```json
{
  "title": "What is a REST API?",
  "content": "How does a REST API work?",
  "author": "Jane Doe"
}
```

**Response:**

```json
{
  "message": "Question posted successfully!",
  "id": 2
}
```

---

### Authentication Endpoints

#### **Google Login**

Redirects users to Google for authentication.

**URL:** `/auth/google`

**Method:** `GET`

#### **Google Login Callback**

Handles the callback after Google authentication.

**URL:** `/auth/google/callback`

**Method:** `GET`

#### **Facebook Login**

Redirects users to Facebook for authentication.

**URL:** `/auth/facebook`

**Method:** `GET`

#### **Facebook Login Callback**

Handles the callback after Facebook authentication.

**URL:** `/auth/facebook/callback`

**Method:** `GET`

#### **Reset Password**

Allows users to reset their password.

**URL:** `/auth/reset`

**Method:** `POST`

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "message": "Password reset link sent to your email."
}
```

---

## Response Codes

| Status Code | Description           |
| ----------- | --------------------- |
| 200         | Success               |
| 400         | Bad Request           |
| 401         | Unauthorized          |
| 404         | Not Found             |
| 500         | Internal Server Error |

---

## Notes

- Ensure proper authorization headers are included for protected endpoints.

---

For additional support or questions, please contact me on twitter @pdagboola or pdagboola@gmail.com
