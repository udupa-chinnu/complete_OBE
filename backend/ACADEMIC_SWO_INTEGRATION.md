# Academic SWO Backend Integration Guide

## Quick Start

### Prerequisites
- Node.js 14+
- MySQL 5.7+
- npm or yarn
- Existing education_portal database

### Step 1: Database Setup

Run the Academic SWO schema to create all tables:

```bash
cd backend
mysql -u root -p education_portal < database/academic_swo_schema.sql
```

Verify tables were created:
```bash
mysql -u root -p education_portal -e "SHOW TABLES LIKE 'academic%';"
```

### Step 2: Seed Sample Data (Optional)

To populate the database with sample feedback forms and data:

```bash
node scripts/seed-academic-swo.js
```

This will create:
- Sample semesters and batches
- Three complete feedback forms (Faculty, Institution, Graduate Exit)
- Sample questions and areas
- Sample responses for testing

### Step 3: Server Configuration

The server is already configured to include the new routes. Verify in `server.js`:

```javascript
// Academic SWO (Student Welfare & Outcome) Routes
app.use('/api/academic-swo/faculty-feedback', require('./routes/academic-faculty-feedback'));
app.use('/api/academic-swo/institution-feedback', require('./routes/academic-institution-feedback'));
app.use('/api/academic-swo/graduate-exit-survey', require('./routes/academic-graduate-exit-survey'));
app.use('/api/academic-swo/feedback-reports', require('./routes/academic-feedback-reports'));
```

### Step 4: Start the Server

```bash
npm start
# or for development
npm run dev
```

Verify the server is running:
```
GET http://localhost:5000/api/health
```

## File Structure

```
backend/
├── database/
│   └── academic_swo_schema.sql          # Database schema (3NF normalized)
├── routes/
│   ├── academic-faculty-feedback.js     # Faculty feedback management
│   ├── academic-institution-feedback.js # Institution feedback management
│   ├── academic-graduate-exit-survey.js # Graduate exit survey management
│   └── academic-feedback-reports.js     # Analytics and reporting
├── utils/
│   └── academic-feedback-utils.js       # Helper functions
├── scripts/
│   └── seed-academic-swo.js            # Sample data seeding
├── server.js                             # (Updated with new routes)
└── ACADEMIC_SWO_README.md               # Full documentation
```

## API Testing

### Using cURL

#### Get all faculty feedback forms
```bash
curl -X GET http://localhost:5000/api/academic-swo/faculty-feedback \
  -H "Authorization: Bearer <your_token>"
```

#### Create a new faculty feedback form
```bash
curl -X POST http://localhost:5000/api/academic-swo/faculty-feedback \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{
    "title": "Faculty Performance Evaluation",
    "description": "Annual faculty evaluation form",
    "department_id": 1,
    "semester_id": 1,
    "is_mandatory": true,
    "areas": [
      {
        "name": "Teaching Quality",
        "description": "Effectiveness of teaching",
        "isMandatory": true,
        "questions": [
          {
            "text": "Faculty is well-prepared",
            "type": "rating",
            "scale_min": 1,
            "scale_max": 5
          }
        ]
      }
    ]
  }'
```

#### Get form analytics
```bash
curl -X GET http://localhost:5000/api/academic-swo/feedback-reports/summary/1 \
  -H "Authorization: Bearer <your_token>"
```

### Using Postman

1. Create a new collection "Academic SWO"
2. Add environment variable `base_url` = `http://localhost:5000`
3. Add environment variable `token` = `<your_jwt_token>`
4. Import the provided Postman collection (if available)

Example request:
```
GET {{base_url}}/api/academic-swo/faculty-feedback
Headers:
  Authorization: Bearer {{token}}
```

## Frontend Integration Points

The frontend should call these endpoints:

### Dashboard Page (`/academicSWO/dashboard`)
```javascript
// Fetch statistics for dashboard cards
fetch('/api/academic-swo/feedback-reports')
fetch('/api/academic-swo/faculty-feedback')
fetch('/api/academic-swo/institution-feedback')
fetch('/api/academic-swo/graduate-exit-survey')
```

### Faculty Feedback Page (`/academicSWO/faculty-feedback`)
```javascript
// Get all forms
GET /api/academic-swo/faculty-feedback

// Create form
POST /api/academic-swo/faculty-feedback

// Update form
PUT /api/academic-swo/faculty-feedback/:id

// Toggle status
PATCH /api/academic-swo/faculty-feedback/:id/status

// Delete form
DELETE /api/academic-swo/faculty-feedback/:id

// Get single form with questions
GET /api/academic-swo/faculty-feedback/:id
```

### Institution Feedback Page (`/academicSWO/institution-feedback`)
```javascript
// Same endpoints as faculty feedback, but with /institution-feedback path
GET /api/academic-swo/institution-feedback
POST /api/academic-swo/institution-feedback
// ... etc
```

### Graduate Exit Survey Page (`/academicSWO/graduate-exit-survey`)
```javascript
// Same endpoints as above, but with /graduate-exit-survey path
GET /api/academic-swo/graduate-exit-survey
POST /api/academic-swo/graduate-exit-survey
// ... etc
```

### Feedback Reports Page (`/academicSWO/feedback-reports`)
```javascript
// Get all reports
GET /api/academic-swo/feedback-reports

// Get summary for specific form
GET /api/academic-swo/feedback-reports/summary/:form_id

// Get detailed analytics
GET /api/academic-swo/feedback-reports/analytics/:form_id

// Get responses
GET /api/academic-swo/feedback-reports/responses/:form_id

// Get response details
GET /api/academic-swo/feedback-reports/response-details/:response_id

// Get faculty report
GET /api/academic-swo/feedback-reports/faculty/:faculty_id

// Generate new report
POST /api/academic-swo/feedback-reports/generate/:form_id
```

## Response Format Reference

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (dev only)"
}
```

## Database Tables Created

1. `academic_feedback_forms` - Main feedback form storage
2. `academic_feedback_areas` - Feedback areas/sections
3. `academic_feedback_questions` - Individual questions
4. `academic_question_options` - Multiple choice options
5. `academic_feedback_responses` - Submitted responses
6. `academic_answer_details` - Individual answers
7. `academic_faculty_feedback_forms` - Faculty feedback config
8. `academic_institution_feedback_forms` - Institution feedback config
9. `academic_graduate_exit_forms` - Graduate exit survey config
10. `academic_semesters` - Semester reference data
11. `academic_courses` - Course reference data
12. `academic_batches` - Batch reference data
13. `academic_feedback_reports` - Pre-calculated reports
14. `academic_feedback_audit_log` - Audit trail

## Permissions & Roles

### Admin Role
- Full access to all endpoints
- Can create, update, delete forms
- Can view all reports

### Academic Role
- Can create and manage feedback forms
- Can view reports
- Cannot delete published forms

### Faculty Role
- Can view their own feedback reports
- Cannot manage forms

### Student Role
- Can submit feedback responses
- Can view submitted response status

## Common Issues & Solutions

### Issue: "JWT token required"
**Solution**: Ensure you're including the Authorization header with a valid token

### Issue: "Form not found"
**Solution**: Verify the form_id exists in the database

### Issue: "Invalid question type"
**Solution**: Use one of: `text`, `textarea`, `rating`, `multiple_choice`, `yes_no`

### Issue: "Database connection failed"
**Solution**: Check MySQL is running and credentials in `.env` are correct

## Performance Tips

1. **Caching**: Consider caching form definitions as they don't change frequently
2. **Pagination**: Use pagination for reports with large response sets
3. **Indexes**: Database indexes are pre-configured for optimal performance
4. **Batch Operations**: Group multiple form creations to reduce database round trips

## Next Steps

1. ✅ Database tables created
2. ✅ Backend routes implemented
3. ✅ Utilities and helpers created
4. ⏳ Frontend integration (Use provided API endpoints)
5. ⏳ Response submission endpoints (Future)
6. ⏳ PDF/Excel export (Future)

## Testing Checklist

- [ ] Database tables exist
- [ ] Server starts without errors
- [ ] GET /api/health returns 200
- [ ] Create faculty feedback form
- [ ] Get single form with all questions
- [ ] Update form
- [ ] Toggle form status
- [ ] Get form reports
- [ ] Delete form
- [ ] Check audit logs

## Support

For detailed API documentation, see `ACADEMIC_SWO_README.md`

For additional help:
1. Check the error message returned by API
2. Review database schema in `academic_swo_schema.sql`
3. Check audit logs in `academic_feedback_audit_log` table
4. Review request/response examples in this guide
