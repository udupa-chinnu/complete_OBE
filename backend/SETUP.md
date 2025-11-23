# Backend Setup Guide

## Step-by-Step Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Database Setup

#### Option A: Using MySQL Command Line

```bash
# Login to MySQL
mysql -u root -p

# Create database and run schema
source database/schema.sql
```

#### Option B: Using MySQL Workbench

1. Open MySQL Workbench
2. Connect to your MySQL server
3. Open the file `database/schema.sql`
4. Execute the entire script

### 3. Environment Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and update the following:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=education_portal
DB_PORT=3306

PORT=5000
NODE_ENV=development
```

### 4. Create Upload Directories

```bash
mkdir -p uploads/faculties
mkdir -p uploads/programs
mkdir -p uploads/institution
mkdir -p uploads/achievements
mkdir -p uploads/mandatory
```

### 5. Start the Server

#### Development Mode (with auto-reload):
```bash
npm run dev
```

#### Production Mode:
```bash
npm start
```

### 6. Verify Installation

Open your browser and navigate to:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "OK",
  "message": "Education Portal API is running"
}
```

## Troubleshooting

### Database Connection Issues

1. **Check MySQL is running:**
   ```bash
   # Windows
   net start MySQL80
   
   # Linux/Mac
   sudo systemctl start mysql
   ```

2. **Verify credentials in `.env` file**

3. **Check if database exists:**
   ```sql
   SHOW DATABASES;
   ```

### Port Already in Use

If port 5000 is already in use, change the `PORT` in `.env` file.

### File Upload Issues

Ensure the `uploads/` directory and subdirectories have write permissions:
```bash
chmod -R 755 uploads/
```

## Next Steps

1. Test API endpoints using Postman or curl
2. Update frontend `.env.local` with API URL:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
3. Connect frontend to backend APIs

