# Ducks-Facts API

Welcome to the **ducks-facts API**! This API provides a simple way to access interesting and random facts, manage your API usage, and register for new API keys.

## Getting Started

To start using the ducks-facts API, you'll first need to register to obtain an API key. This key will be used to authenticate your requests and track your usage.

- [Register for an API Key](#3-register-for-an-api-key)

## Authentication

All authenticated endpoints require your API key to be sent in the `x-api-key` header of your HTTP requests.

**Example Header:**

```
X-api-key: YOUR_API_KEY_HERE
```

## Endpoints

### 1. Get a Random Fact

`GET /api/facts/random`

This endpoint returns a random, interesting fact. You must provide your API key in the request headers.

### Headers:

- `x-api-key`: Your API key.

```json
{
  "_id": "689cbdfe9d1ce8e4522a9bd5",
  "id": 54,
  "fact": "Most duck species are monogamous for a breeding season but typically find new mates each year."
}
```

### 2. Check API Usage

`GET /api/usage`

This endpoint allows you to check your remaining API credits. You must provide your API key in the request headers.

### Headers:

- `x-api-key`: Your API key.

```json
{
  "message": "API usage details",
  "remainingCredits": 481
}
```

### 3. Register for an API Key

`POST /api/register`

Use this endpoint to obtain a new API key. Upon successful registration, you will be granted 500 initial credits.

### Request Body:

```json
{
  "name": "yourname",
  "email": "email@email.com"
}
```

```json
{
  "message": "Registration successful!",
  "apiKey": "YOUR_NEWLY_GENERATED_API_KEY",
  "initialCredits": 500
}
```

## Next steps

- [ ] Add some high-quality duck images
- [ ] Expand API endpoints for image delivery
- [ ] The chance to add custom duck facts into the API
- [ ] Community image upload
