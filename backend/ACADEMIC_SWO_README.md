# Academic SWO (Student Welfare & Outcome) Backend Documentation

## Overview

The Academic SWO module provides a comprehensive feedback management system for educational institutions, enabling collection and analysis of feedback from multiple stakeholders including faculty, students, and graduates. The system is built with Node.js, Express.js, and MySQL with a fully normalized 3NF database schema.

## Features

### 1. **Faculty Feedback Management**
- Create and manage faculty performance evaluation forms
- Organize questions by feedback areas (Teaching Quality, Course Content, etc.)
- Support for rating scales (1-5, customizable labels)
- Track responses by faculty and semester
- Automatic deactivation of other forms when one is activated
- Faculty-specific analytics and reports

### 2. **Institution Feedback Management**
- Create comprehensive institution feedback forms
- Evaluate facilities, infrastructure, and services
- Support for multiple target user types (faculty, students, staff)
- Areas for Academic Facilities, General Facilities, Services, etc.
- Multi-semester tracking

### 3. **Graduate Exit Survey**
- Specialized survey for graduating students
- Batch-wise organization (2020-2024, 2021-2025, etc.)
- Multiple feedback areas with pre-designed questions
- Placement tracking integration
- Program outcome assessment

### 4. **Feedback Response Management**
- Individual response tracking
- Response status monitoring (Started, InProgress, Submitted)
- Completion time tracking
- User agent and IP logging for security

### 5. **Advanced Analytics & Reporting**
- Comprehensive dashboard with response statistics
- Question-wise analytics with rating distributions
- Faculty performance summaries
- Department and batch-wise reports
- Average ratings and completion rates
- Comparative analysis capabilities

### 6. **Audit & Security**
- Complete audit logging of all form operations
- User authentication and role-based access control
- IP address and user agent logging
- Transaction-based operations for data integrity

## Database Schema (3NF Normalized)

### Core Tables

#### `academic_feedback_forms`
Main table for all feedback forms with polymorphic design
- Supports three types: `faculty_feedback`, `institution_feedback`, `graduate_exit_survey`
- Status: `Draft`, `Active`, `Inactive`
- Tracks creation and modification timestamps

#### `academic_feedback_areas`
Organizes questions into logical feedback areas
- Each area belongs to a single form
- Supports mandatory/optional designation
- Sortable for custom ordering

#### `academic_feedback_questions`
Individual questions within feedback forms
- Supports multiple question types: `text`, `textarea`, `rating`, `multiple_choice`, `yes_no`
- Customizable rating scales with labels
- Linked to specific areas
- Tracks mandatory status

#### `academic_question_options`
Options for multiple choice questions
- Referenced by responses for tracking answers
- Sortable for option ordering

#### `academic_feedback_responses`
Individual feedback submissions
- Tracks respondent type and status
- Links to faculty being evaluated (for faculty feedback)
- Records response timeline (started, submitted times)
- Completion time calculation

#### `academic_answer_details`
Individual answers within responses
- Stores answer text, rating, or selected option
- Timestamped for analysis
- Indexed for efficient querying

### Type-Specific Tables

#### `academic_faculty_feedback_forms`
Faculty-specific feedback form configuration
- Department association
- Semester tracking
- Target faculty list (JSON)
- Response deadline

#### `academic_institution_feedback_forms`
Institution feedback form configuration
- Semester association
- Target user types (JSON array)
- Response deadline

#### `academic_graduate_exit_forms`
Graduate exit survey configuration
- Batch start and end years
- Department association
- Response deadline

### Support Tables

#### `academic_semesters`
Semester definitions
- Semester name and academic year
- Semester type (Odd/Even)
- Start and end dates

#### `academic_courses`
Course information for feedback context
- Course code and name
- Department association
- Semester linking

#### `academic_batches`
Student batch information
- Batch name and year range
- Department and program association
- Student count

#### `academic_feedback_reports`
Pre-calculated report data
- Summary statistics
- Average ratings
- Response counts
- Generation timestamps

#### `academic_feedback_audit_log`
Comprehensive audit trail
- Action type (create, update, delete, submit, download_report)
- User information
- IP address
- Action details (JSON)

## API Endpoints

### Faculty Feedback Endpoints

#### Get All Faculty Feedback Forms
```
GET /api/academic-swo/faculty-feedback
Query Parameters:
  - includeInactive: boolean (default: false)

Response:
{
  success: true,
  data: [
    {
      id: 1,
      form_id: 1,
      title: "Faculty Performance Evaluation - 2024",
      description: "...",
      status: "Active",
      department_name: "Information Science",
      semester_name: "Odd Semester 2024-25",
      total_responses: 42,
      total_questions: 7,
      created_by_name: "admin_user",
      created_at: "2024-08-15T10:30:00Z",
      updated_at: "2024-08-15T10:30:00Z"
    }
  ]
}
```

#### Get Single Faculty Feedback Form
```
GET /api/academic-swo/faculty-feedback/:id

Response:
{
  success: true,
  data: {
    id: 1,
    form_type: "faculty_feedback",
    title: "Faculty Performance Evaluation - 2024",
    status: "Active",
    department_id: 1,
    semester_id: 1,
    areas: [
      {
        id: 1,
        area_name: "Teaching Quality",
        is_mandatory: true,
        sort_order: 0,
        questions: [
          {
            id: 1,
            question_text: "The faculty is well-prepared...",
            question_type: "rating",
            scale_min: 1,
            scale_max: 5,
            scale_min_label: "Strongly Disagree",
            scale_max_label: "Strongly Agree"
          }
        ]
      }
    ]
  }
}
```

#### Create Faculty Feedback Form
```
POST /api/academic-swo/faculty-feedback
Content-Type: application/json
Authorization: Bearer <token>

Body:
{
  "title": "Faculty Performance Evaluation - 2024",
  "description": "Comprehensive evaluation form",
  "department_id": 1,
  "semester_id": 1,
  "target_faculty_ids": [1, 2, 3],
  "response_deadline": "2024-12-31",
  "is_mandatory": true,
  "areas": [
    {
      "name": "Teaching Quality",
      "description": "Effectiveness of teaching",
      "isMandatory": true,
      "questions": [
        {
          "text": "The faculty is well-prepared...",
          "type": "rating",
          "is_mandatory": true,
          "scale_min": 1,
          "scale_max": 5,
          "scale_min_label": "Strongly Disagree",
          "scale_max_label": "Strongly Agree"
        }
      ]
    }
  ]
}

Response:
{
  success: true,
  message: "Faculty feedback form created successfully",
  data: { id: 42 }
}
```

#### Update Faculty Feedback Form
```
PUT /api/academic-swo/faculty-feedback/:id
Content-Type: application/json
Authorization: Bearer <token>

Body: (Same structure as Create, fields are optional)
```

#### Toggle Form Status
```
PATCH /api/academic-swo/faculty-feedback/:id/status
Content-Type: application/json
Authorization: Bearer <token>

Body:
{
  "status": "Active" | "Inactive" | "Draft"
}

Response:
{
  success: true,
  message: "Form status updated to Active",
  data: {
    id: 1,
    status: "Active"
  }
}
```

#### Delete Faculty Feedback Form
```
DELETE /api/academic-swo/faculty-feedback/:id
Authorization: Bearer <token>

Response:
{
  success: true,
  message: "Faculty feedback form deleted successfully",
  data: { id: 1 }
}
```

### Institution Feedback Endpoints
- `GET /api/academic-swo/institution-feedback`
- `GET /api/academic-swo/institution-feedback/:id`
- `POST /api/academic-swo/institution-feedback`
- `PUT /api/academic-swo/institution-feedback/:id`
- `PATCH /api/academic-swo/institution-feedback/:id/status`
- `DELETE /api/academic-swo/institution-feedback/:id`

### Graduate Exit Survey Endpoints
- `GET /api/academic-swo/graduate-exit-survey`
- `GET /api/academic-swo/graduate-exit-survey/:id`
- `POST /api/academic-swo/graduate-exit-survey`
- `PUT /api/academic-swo/graduate-exit-survey/:id`
- `PATCH /api/academic-swo/graduate-exit-survey/:id/status`
- `DELETE /api/academic-swo/graduate-exit-survey/:id`

### Feedback Reports & Analytics Endpoints

#### Get All Reports
```
GET /api/academic-swo/feedback-reports
Query Parameters:
  - form_id: integer
  - form_type: string (faculty_feedback|institution_feedback|graduate_exit_survey)
  - report_type: string (summary|detailed|comparative)
```

#### Get Form Summary Report
```
GET /api/academic-swo/feedback-reports/summary/:form_id

Response:
{
  success: true,
  data: {
    form: {
      id: 1,
      title: "Faculty Performance Evaluation - 2024",
      form_type: "faculty_feedback",
      status: "Active",
      total_responses: 42,
      total_questions: 7
    },
    completionRate: "84.00",
    overallAverageRating: "4.15",
    questions: [
      {
        id: 1,
        question_text: "The faculty is well-prepared...",
        question_type: "rating",
        average_rating: "4.23",
        response_count: 42
      }
    ],
    summary: {
      totalResponses: 42,
      totalQuestions: 7,
      averageRating: "4.15",
      completionRate: "84.00"
    }
  }
}
```

#### Get Detailed Analytics
```
GET /api/academic-swo/feedback-reports/analytics/:form_id

Response includes:
- Question-wise analytics
- Rating distributions for rating-type questions
- Option distributions for multiple choice questions
- Min, max, and standard deviation for ratings
- Grouped by feedback area
```

#### Get Responses for a Form
```
GET /api/academic-swo/feedback-reports/responses/:form_id
Query Parameters:
  - status: string (Started|InProgress|Submitted)
  - page: integer (default: 1)
  - limit: integer (default: 20)
```

#### Get Faculty-Specific Report
```
GET /api/academic-swo/feedback-reports/faculty/:faculty_id
Query Parameters:
  - semester_id: integer (optional)
```

#### Get Department-Specific Report
```
GET /api/academic-swo/feedback-reports/department/:department_id
Query Parameters:
  - form_type: string (optional)
  - semester_id: integer (optional)
```

#### Generate New Report
```
POST /api/academic-swo/feedback-reports/generate/:form_id
Content-Type: application/json
Authorization: Bearer <token>

Body:
{
  "report_type": "summary|detailed|comparative"
}
```

## Authentication & Authorization

### Required Middleware
All endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Role-Based Access Control
- **Admin**: Full access to all endpoints
- **Academic**: Can create and manage feedback forms
- **Faculty**: Can view their own feedback reports
- **Student**: Can submit feedback forms

### Special Rules
- Only one form per type can be "Active" at a time
- When activating a form, all other forms of the same type are automatically deactivated
- Responses can only be submitted for Active forms
- Audit logs track all modifications

## Utility Functions

### Academic Feedback Utils (`utils/academic-feedback-utils.js`)

```javascript
// Get forms by type
getFeedbackFormsByType(formType, includeInactive)

// Get complete form with details
getFormWithDetails(formId)

// Deactivate other forms
deactivateOtherForms(formType, exceptFormId)

// Calculate statistics
getFormStatistics(formId)

// Get question-wise analytics
getQuestionAnalytics(formId)

// Faculty feedback summary
getFacultyFeedbackSummary(facultyId, semesterId)

// Graduate exit survey by batch
getGraduateExitSurveyByBatch(startYear, endYear)

// Validate response
validateFeedbackResponse(formId, answers)

// Log audit entry
logAuditEntry(formId, action, userId, ipAddress, details)

// Get audit logs
getAuditLogs(formId, limit)

// Export to JSON
exportFormToJSON(formId)

// Check if user responded
hasUserResponded(formId, userId)

// Get eligible respondents
getEligibleRespondents(formId)
```

## Database Setup

### 1. Create Tables
```bash
# Navigate to backend directory
cd backend

# Run the schema file
mysql -u root -p education_portal < database/academic_swo_schema.sql
```

### 2. Seed Sample Data
```bash
node scripts/seed-academic-swo.js
```

## Frontend Integration

### API Call Examples

#### Fetch All Faculty Feedback Forms
```javascript
fetch('/api/academic-swo/faculty-feedback', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

#### Create New Form
```javascript
fetch('/api/academic-swo/faculty-feedback', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'Faculty Feedback - 2024',
    description: 'Annual evaluation',
    department_id: 1,
    semester_id: 1,
    areas: [...]
  })
})
.then(res => res.json());
```

#### Submit Feedback Response
```javascript
// Implementation depends on feedback-submission endpoint
// (Not included in current scope - to be implemented)
```

#### Generate Report
```javascript
fetch('/api/academic-swo/feedback-reports/generate/1', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    report_type: 'summary'
  })
})
.then(res => res.json());
```

## Error Handling

All endpoints return standardized error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (only in development)"
}
```

### HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Server Error

## Performance Optimization

### Indexes
The schema includes strategic indexes on:
- `academic_feedback_forms` (form_type, status, department_id, created_at)
- `academic_feedback_responses` (form_id, response_status, submitted_time)
- `academic_answer_details` (response_id, question_id)

### Query Optimization
- Efficient LEFT JOINs with GROUP BY
- Proper use of indexes in WHERE clauses
- Pagination for large result sets

## Future Enhancements

1. **Response Submission API**
   - Endpoints to submit and save feedback responses
   - Validation and mandatory question checking

2. **Advanced Analytics**
   - Comparative reports across semesters
   - Trend analysis
   - Predictive analytics

3. **Export Functionality**
   - PDF report generation
   - Excel export
   - CSV export

4. **Notification System**
   - Email reminders for pending responses
   - Completion notifications

5. **Dashboard Integration**
   - Real-time response tracking
   - Live analytics updates

## Troubleshooting

### Database Connection Error
```
✓ Ensure MySQL server is running
✓ Check database credentials in .env file
✓ Verify database 'education_portal' exists
```

### Authentication Error
```
✓ Ensure JWT token is valid and not expired
✓ Check Authorization header format: "Bearer <token>"
✓ Verify user exists and is active in database
```

### Transaction Rollback
```
✓ Check for foreign key constraint violations
✓ Ensure all required fields are provided
✓ Verify database permissions
```

## Support & Maintenance

For issues or questions:
1. Check the error message and HTTP status code
2. Review relevant endpoint documentation
3. Check database schema for data consistency
4. Review audit logs for tracking operations

---

**Version**: 1.0.0
**Last Updated**: December 2024
**Compatible With**: Node.js 14+, Express.js 4.17+, MySQL 5.7+
