# Education Portal Backend API

Backend API for Outcome Based Education Portal built with Node.js, Express.js, and MySQL.

## Features

- RESTful API endpoints for all admin operations
- MySQL database with 3NF normalized schema
- Soft delete (deactivation) for all entities
- File upload support for documents and images
- CORS enabled for frontend integration

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update the `.env` file with your database credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=education_portal
DB_PORT=3306

PORT=5000
NODE_ENV=development
```

5. Create the database and run the schema:
```bash
mysql -u root -p < database/schema.sql
```

Or manually:
- Open MySQL command line or MySQL Workbench
- Run the SQL file: `database/schema.sql`

6. Create the uploads directory structure:
```bash
mkdir -p uploads/faculties
mkdir -p uploads/programs
mkdir -p uploads/institution
mkdir -p uploads/achievements
mkdir -p uploads/mandatory
```

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will run on `http://localhost:5000` (or the port specified in `.env`).

## API Endpoints

### Health Check
- `GET /api/health` - Check if API is running

### Faculties
- `GET /api/faculties` - Get all active faculties
- `GET /api/faculties?includeInactive=true` - Get all faculties (including inactive)
- `GET /api/faculties/dropdown/active` - Get active faculties for dropdown
- `GET /api/faculties/:id` - Get single faculty
- `POST /api/faculties` - Create new faculty
- `PUT /api/faculties/:id` - Update faculty
- `DELETE /api/faculties/:id` - Deactivate faculty
- `POST /api/faculties/:id/reactivate` - Reactivate faculty

### Departments
- `GET /api/departments` - Get all active departments
- `GET /api/departments?includeInactive=true` - Get all departments
- `GET /api/departments/:id` - Get single department
- `POST /api/departments` - Create new department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Deactivate department
- `POST /api/departments/:id/reactivate` - Reactivate department

### Programs
- `GET /api/programs` - Get all active programs
- `GET /api/programs?includeInactive=true` - Get all programs
- `GET /api/programs?departmentId=1` - Get programs by department
- `GET /api/programs/:id` - Get single program
- `POST /api/programs` - Create new program
- `PUT /api/programs/:id` - Update program
- `DELETE /api/programs/:id` - Deactivate program
- `POST /api/programs/:id/reactivate` - Reactivate program

### Institution
- `GET /api/institution` - Get institution details
- `POST /api/institution/basic` - Create/update basic info
- `POST /api/institution/contact` - Create/update contact info
- `POST /api/institution/governance` - Create/update governance info
- `POST /api/institution/academic` - Create/update academic info
- `POST /api/institution/infrastructure` - Create/update infrastructure info
- `POST /api/institution/recognitions` - Create/update recognitions info
- `POST /api/institution/miscellaneous` - Create/update miscellaneous info

### Achievements
- `GET /api/achievements` - Get all active achievements
- `GET /api/achievements?category=Academic&departmentId=1` - Filter achievements
- `GET /api/achievements/:id` - Get single achievement
- `POST /api/achievements` - Create new achievement
- `PUT /api/achievements/:id` - Update achievement
- `DELETE /api/achievements/:id` - Deactivate achievement
- `POST /api/achievements/:id/reactivate` - Reactivate achievement

### Mandatory Uploads
- `GET /api/uploads` - Get all active uploads
- `GET /api/uploads?type=Accreditation Reports&departmentId=1` - Filter uploads
- `GET /api/uploads/:id` - Get single upload
- `POST /api/uploads` - Create new upload
- `PUT /api/uploads/:id` - Update upload
- `DELETE /api/uploads/:id` - Deactivate upload
- `POST /api/uploads/:id/reactivate` - Reactivate upload

## Database Schema

The database follows 3NF (Third Normal Form) normalization:

### Main Tables:
- `institutions` - Institution basic information
- `institution_contacts` - Contact details
- `institution_governance` - Governance information
- `institution_academic` - Academic statistics
- `institution_infrastructure` - Infrastructure details
- `institution_recognitions` - Recognitions and accreditations
- `institution_miscellaneous` - Vision, mission, etc.
- `faculties` - Faculty personal information
- `faculty_employment` - Faculty employment details
- `faculty_qualifications` - Faculty qualifications (one-to-many)
- `departments` - Department information
- `programs` - Academic programs
- `achievements` - Institutional achievements
- `mandatory_uploads` - Mandatory document uploads

All tables use soft delete (`is_active` boolean field) instead of hard delete.

## File Uploads

File uploads are stored in the `uploads/` directory:
- `uploads/faculties/` - Faculty profile photos
- `uploads/programs/` - Program documents (AICTE, accreditation, etc.)
- `uploads/institution/` - Institution logo
- `uploads/achievements/` - Achievement documents and media
- `uploads/mandatory/` - Mandatory closure documents

Files are served statically at `/uploads/*` path.

## Error Handling

All endpoints return JSON responses in the format:
```json
{
  "success": true/false,
  "message": "Description",
  "data": {...}
}
```

Error responses include:
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## Notes

- All delete operations are soft deletes (sets `is_active = FALSE`)
- Foreign key constraints ensure data integrity
- File uploads are validated by type and size
- CORS is enabled for frontend integration

