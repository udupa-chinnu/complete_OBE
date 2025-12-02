# Academic SWO API Quick Reference

## 🎯 Base URL
```
http://localhost:5000/api/academic-swo
```

## 🔐 Authentication
All endpoints require JWT Bearer token:
```
Authorization: Bearer <your_jwt_token>
```

---

## 📋 Faculty Feedback API

### List All Forms
```
GET /faculty-feedback
Query: ?includeInactive=false

✅ Success (200):
{
  success: true,
  data: [
    {
      id: 1,
      title: "Faculty Performance Evaluation",
      status: "Active",
      department_name: "ISE",
      total_responses: 42,
      ...
    }
  ]
}
```

### Get Single Form
```
GET /faculty-feedback/:id

✅ Success (200):
{
  success: true,
  data: {
    id: 1,
    title: "...",
    areas: [
      {
        id: 1,
        area_name: "Teaching Quality",
        questions: [...]
      }
    ]
  }
}
```

### Create Form
```
POST /faculty-feedback
Content-Type: application/json
Auth: Required (admin, academic)

Body:
{
  "title": "Faculty Performance Evaluation",
  "description": "...",
  "department_id": 1,
  "semester_id": 1,
  "is_mandatory": true,
  "areas": [
    {
      "name": "Teaching Quality",
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
}

✅ Success (201):
{ success: true, message: "...", data: { id: 42 } }
```

### Update Form
```
PUT /faculty-feedback/:id
Content-Type: application/json
Auth: Required (admin, academic)

Body: (Same as Create, all fields optional)

✅ Success (200):
{ success: true, message: "Form updated successfully" }
```

### Toggle Status
```
PATCH /faculty-feedback/:id/status
Content-Type: application/json
Auth: Required (admin, academic)

Body:
{
  "status": "Active" | "Inactive" | "Draft"
}

✅ Success (200):
{
  success: true,
  message: "Form status updated to Active",
  data: { id: 1, status: "Active" }
}
```

### Delete Form
```
DELETE /faculty-feedback/:id
Auth: Required (admin, academic)

✅ Success (200):
{ success: true, message: "Form deleted successfully" }
```

---

## 📋 Institution Feedback API

### List All Forms
```
GET /institution-feedback
Query: ?includeInactive=false
```

### Get Single Form
```
GET /institution-feedback/:id
```

### Create Form
```
POST /institution-feedback
Body:
{
  "title": "Institution Infrastructure Feedback",
  "description": "...",
  "semester_id": 1,
  "target_user_types": ["faculty", "student", "staff"],
  "areas": [...]
}
```

### Update Form
```
PUT /institution-feedback/:id
```

### Toggle Status
```
PATCH /institution-feedback/:id/status
```

### Delete Form
```
DELETE /institution-feedback/:id
```

---

## 📋 Graduate Exit Survey API

### List All Surveys
```
GET /graduate-exit-survey
Query: ?includeInactive=false
```

### Get Single Survey
```
GET /graduate-exit-survey/:id
```

### Create Survey
```
POST /graduate-exit-survey
Body:
{
  "title": "Graduate Exit Survey - 2024",
  "description": "...",
  "batch_start_year": 2020,
  "batch_end_year": 2024,
  "department_id": 1,
  "areas": [...]
}
```

### Update Survey
```
PUT /graduate-exit-survey/:id
```

### Toggle Status
```
PATCH /graduate-exit-survey/:id/status
```

### Delete Survey
```
DELETE /graduate-exit-survey/:id
```

---

## 📊 Feedback Reports API

### Get All Reports
```
GET /feedback-reports
Query:
  ?form_id=1
  &form_type=faculty_feedback|institution_feedback|graduate_exit_survey
  &report_type=summary|detailed|comparative
```

### Get Form Summary
```
GET /feedback-reports/summary/:form_id

✅ Success (200):
{
  success: true,
  data: {
    form: {
      id: 1,
      title: "...",
      form_type: "faculty_feedback",
      total_responses: 42,
      total_questions: 7
    },
    completionRate: "84.00",
    overallAverageRating: "4.15",
    questions: [
      {
        id: 1,
        question_text: "...",
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

### Get Detailed Analytics
```
GET /feedback-reports/analytics/:form_id

✅ Success (200):
{
  success: true,
  data: {
    questions: [
      {
        id: 1,
        question_text: "...",
        average_rating: "4.23",
        response_count: 42,
        min_rating: 2,
        max_rating: 5,
        ratingDistribution: [
          { rating: 1, count: 2 },
          { rating: 2, count: 3 },
          ...
        ]
      }
    ],
    groupedByArea: {...}
  }
}
```

### Get Responses
```
GET /feedback-reports/responses/:form_id
Query:
  ?status=Submitted|InProgress|Started
  &page=1
  &limit=20

✅ Success (200):
{
  success: true,
  data: {
    responses: [
      {
        id: 1,
        respondent_type: "student",
        response_status: "Submitted",
        submitted_time: "2024-08-15T10:30:00Z",
        completion_time_minutes: 15
      }
    ],
    pagination: {
      page: 1,
      limit: 20,
      total: 42,
      pages: 3
    }
  }
}
```

### Get Response Details
```
GET /feedback-reports/response-details/:response_id

✅ Success (200):
{
  success: true,
  data: {
    response: {...},
    answers: [
      {
        id: 1,
        question_id: 5,
        question_text: "...",
        question_type: "rating",
        answer_rating: 4
      }
    ]
  }
}
```

### Get Faculty Report
```
GET /feedback-reports/faculty/:faculty_id
Query: ?semester_id=1
```

### Get Department Report
```
GET /feedback-reports/department/:department_id
Query:
  ?form_type=faculty_feedback|institution_feedback
  &semester_id=1
```

### Generate Report
```
POST /feedback-reports/generate/:form_id
Content-Type: application/json
Auth: Required (admin, academic)

Body:
{
  "report_type": "summary|detailed|comparative"
}

✅ Success (201):
{
  success: true,
  message: "Report generated successfully",
  data: {
    id: 1,
    form_id: 1,
    report_type: "summary",
    total_responses: 42,
    completion_rate: "84.00",
    average_rating: "4.15",
    generated_at: "2024-08-15T10:30:00Z"
  }
}
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Title, department_id, and semester_id are required"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Access token required"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Faculty feedback form not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Error creating faculty feedback form",
  "error": "Database connection failed"
}
```

---

## 📝 Question Types & Scale Examples

### Rating Question
```json
{
  "text": "Faculty is well-prepared",
  "type": "rating",
  "scale_min": 1,
  "scale_max": 5,
  "scale_min_label": "Strongly Disagree",
  "scale_max_label": "Strongly Agree"
}
```

### Multiple Choice Question
```json
{
  "text": "Which is your preferred learning method?",
  "type": "multiple_choice",
  "options": [
    "Lecture",
    "Lab",
    "Project-based",
    "Self-study"
  ]
}
```

### Text Question
```json
{
  "text": "What are the strengths of this program?",
  "type": "text"
}
```

### Textarea Question
```json
{
  "text": "Provide detailed feedback about course content",
  "type": "textarea"
}
```

### Yes/No Question
```json
{
  "text": "Would you recommend this institution?",
  "type": "yes_no"
}
```

---

## 🔐 Role-Based Access

| Endpoint | Admin | Academic | Faculty | Student |
|----------|-------|----------|---------|---------|
| GET forms | ✅ | ✅ | ✅ | ❌ |
| POST form | ✅ | ✅ | ❌ | ❌ |
| PUT form | ✅ | ✅ | ❌ | ❌ |
| PATCH status | ✅ | ✅ | ❌ | ❌ |
| DELETE form | ✅ | ✅ | ❌ | ❌ |
| GET reports | ✅ | ✅ | ✅ | ✅ |
| POST generate | ✅ | ✅ | ❌ | ❌ |

---

## 🧪 cURL Examples

### Get All Faculty Feedback Forms
```bash
curl -X GET http://localhost:5000/api/academic-swo/faculty-feedback \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

### Create Faculty Feedback Form
```bash
curl -X POST http://localhost:5000/api/academic-swo/faculty-feedback \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -d '{
    "title": "Faculty Evaluation",
    "description": "Annual evaluation",
    "department_id": 1,
    "semester_id": 1,
    "areas": [
      {
        "name": "Teaching Quality",
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

### Get Form Summary Report
```bash
curl -X GET http://localhost:5000/api/academic-swo/feedback-reports/summary/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

### Toggle Form Status
```bash
curl -X PATCH http://localhost:5000/api/academic-swo/faculty-feedback/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -d '{"status": "Active"}'
```

---

## 📱 Frontend Integration Pattern

```javascript
// Hook for fetching faculty feedback forms
const [forms, setForms] = useState([]);
const token = localStorage.getItem('authToken');

useEffect(() => {
  fetch('/api/academic-swo/faculty-feedback', {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(data => setForms(data.data));
}, []);

// Create new form
const handleCreateForm = async (formData) => {
  const response = await fetch('/api/academic-swo/faculty-feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(formData)
  });
  const data = await response.json();
  if (data.success) {
    console.log('Form created:', data.data);
  }
};
```

---

## 🔄 Common Workflows

### Create and Activate a Faculty Feedback Form
1. POST /faculty-feedback (status: Draft)
2. Add areas and questions (implicit in POST)
3. PATCH /faculty-feedback/:id/status (status: Active)
4. Other Active forms automatically become Inactive

### View Form Responses and Analytics
1. GET /feedback-reports/summary/:form_id (Overview)
2. GET /feedback-reports/analytics/:form_id (Detailed)
3. GET /feedback-reports/responses/:form_id (Individual responses)

### Generate Faculty Report
1. GET /feedback-reports/faculty/:faculty_id (All feedback for faculty)
2. POST /feedback-reports/generate/:faculty_id (Generate report)

---

## ⚙️ Configuration Constants

### Status Values
- `Draft` - Form in creation
- `Active` - Currently accepting responses
- `Inactive` - Not accepting responses

### Question Types
- `text` - Single line text
- `textarea` - Multi-line text
- `rating` - Numeric scale (1-10)
- `multiple_choice` - Select from options
- `yes_no` - Boolean response

### Response Status
- `Started` - Response initiated
- `InProgress` - Partially filled
- `Submitted` - Completed and submitted

### Form Types
- `faculty_feedback` - Faculty evaluation
- `institution_feedback` - Institution feedback
- `graduate_exit_survey` - Graduate survey

---

**Version**: 1.0.0
**Last Updated**: December 2024
