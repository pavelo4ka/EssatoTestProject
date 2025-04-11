# Weather Diary

An application for storing your personal weather impressions.

## Description

This is a web application where users can save their notes about the weather and their feelings on a specific day.

The user selects a city and writes their impressions, and the server automatically retrieves the weather data for that city on the selected date using an external API and saves it along with the creation timestamp.

### Main Features:
- Add weather notes
- Edit notes (description and "good day" mark)
- Delete notes
- Filtering and pagination of notes
- Web interface for interaction via browser

---
## Technologies

The task was completed by creating a server using `Express.js`, which connects to a `PostgreSQL` database through the `pg` library.

When a client connects to the server, a Single Page Application (`SPA`) built with `React` is served, providing a user-friendly interface for managing weather diary records.

The application follows a client-server architecture. The backend is responsible for data storage and communication with external services, while the frontend handles data visualization and user interaction.

The implementation follows basic `REST API` practices and modern web development principles.
## Running the Project

1. Install dependencies:
```bash
npm install
```
2. Start the project:
```bash
npm run start
```
## Environment Variables
By default, the following values are used:
``` .env
PORT=3000               # server port  
DB_HOST=localhost       # database host  
DB_PORT=5432            # database port  
DB_USER=postgres        # database user  
DB_NAME=postgres        # database name  
SCHEMA=public           # database schema  
TABLE_NAME=diary        # table for storing notes  
VITE_SERVER_URL=http://localhost:3000 # server URL
```
To change these settings, create a .env file in the project root and override the necessary values.


## Note
PostgreSQL database is required for the application to work.

Конечно, вот готовый блок для README.md — красиво оформленный и готовый к вставке:

md
Kopiuj
Edytuj
## API Endpoints

### Get all diary records

Fetch 10 diary records with optional filtering and pagination.

```GET /diaryRecords?page={page}&{filter}```



#### Query Parameters:
| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| page      | number | Page number (starting from 1)                |
| filter         | string   | Filtering by city or other parameters (e.g. `&city=Krakow`)|
| sortBy         | string   | Field to sort by (e.g. `date`, `temperature`)              |
| order          | string   | Sorting order (`asc` for ascending, `desc` for descending) |
| minTemperature | number   | Minimum temperature for filtering                          |
| maxTemperature | number   | Maximum temperature for filtering                          |
| minDate        | string   | Minimum date for filtering (ISO 8601 format: `YYYY-MM-DDTHH:mm:ss.sssZ`)|
| maxDate        | string   | Maximum date for filtering (ISO 8601 format: `YYYY-MM-DDTHH:mm:ss.sssZ`)|
| isGoodDay      | boolean  | Filter for "Good Day" mark (true/false)                    |
| description    | string   | Filter by description text                                 |city=Krakow`) |

#### Response:
```json
[
  {
    "id": "string",
    "description": "string",
    "isGoodDay": true,
    "date": "2024-04-11T00:00:00.000Z",
    "temperature": "number"
  }
]
```

### Create a new diary record

```POST /diaryRecords```

Request Body:
```json
{
  "description": "string",
  "isGoodDay": true,
  "date": "2024-04-11",
  "city": "string"
}
```

### Update a diary record
Edit an existing diary record by ID.


```PUT /diaryRecords/{id}```

Request Body:

```json
{
  "description": "string",
  "isGoodDay": true
}
```

### Delete a diary record
Delete an existing diary record by ID.


```DELETE /diaryRecords/{id}```
