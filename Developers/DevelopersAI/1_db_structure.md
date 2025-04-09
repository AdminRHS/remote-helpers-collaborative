# Task Manager Database Structure

## Core Tables

### Users
* `id` (PK) - Unique identifier for users
* `name` - User's full name
* `email` - User's email address (unique)
* `password` - Encrypted password
* `email_verified_at` - Timestamp when email was verified
* `remember_token` - Token for "remember me" functionality
* `created_at` - Record creation timestamp
* `updated_at` - Record update timestamp

### Tasks
* `id` (PK) - Unique identifier for tasks
* `entity_id` (FK → Entities) - Related entity
* `milestone_id` (FK → Milestones) - Associated milestone
* `project_id` (FK → Projects) - Associated project
* `title` - Task title
* `task_template_id` (FK → Task_Templates) - Template used to create this task
* `status_id` (FK → Statuses) - Current status
* `start_date` - Task start date/time
* `due_date` - Task deadline date/time
* `priority_id` (FK → Priorities) - Task priority
* `total_time` - Total time spent on task
* `created_by` (FK → Users) - User who created the task
* `created_at` - Creation timestamp
* `note` - Additional notes
* `is_completed` - Flag indicating completion status (0/1)

### Steps
* `id` (PK) - Unique identifier for steps
* `entity_id` (FK → Entities) - Related entity
* `step_template_id` (FK → Step_Templates) - Template used for this step
* `order` - Ordering within a task
* `name` - Step name
* `assignee_id` (FK → Users) - User assigned to this step
* `task_id` (FK → Tasks) - Parent task
* `is_completed` - Completion flag (0/1)
* `completed_at` - Completion timestamp

### Checklists
* `id` (PK) - Unique identifier for checklists
* `checklist_item_id` (FK → Checklist_Items) - Associated checklist item template
* `is_completed` - Completion flag (0/1)
* `name` - Checklist name
* `order` - Ordering within a step
* `placement_id` - Internal placement identifier
* `completed_by` (FK → Users) - User who completed the item
* `completed_at` - Completion timestamp
* `step_id` (FK → Steps) - Associated step

### Projects
* `id` (PK) - Unique identifier for projects
* `name` - Project name
* `inner_client_id` - Internal client identifier
* `project_template_id` (FK → Project_Templates) - Template used for this project
* `start_date` - Project start date
* `end_date` - Project end date
* `type` - Project type ('project' or 'course')
* `created_by` (FK → Users) - User who created the project
* `created_at` - Creation timestamp

### Milestones
* `id` (PK) - Unique identifier for milestones
* `name` - Milestone name
* `description` - Milestone description
* `milestone_template_id` (FK → Milestone_Templates) - Template used
* `project_id` (FK → Projects) - Parent project
* `start_date` - Milestone start date
* `end_date` - Milestone end date
* `expected_hours` - Expected hours to complete

## Template Tables

### Task_Templates
* `id` (PK) - Unique identifier
* `task_template_type_id` (FK → Task_Template_Type) - Template type
* `name` - Template name
* `action_id` (FK → Actions) - Associated action
* `object_id` (FK → Objects) - Associated object
* `description` - Template description
* `cost` - Associated cost
* `frequency_id` - How often the task occurs
* `task_quantity` - Number of tasks
* `expected_hours` - Expected time to complete
* `entity_id` (FK → Entities) - Related entity
* `created_at` - Creation timestamp
* `created_by` (FK → Users) - User who created the template
* `is_draft` - Draft status flag (0/1)

### Step_Templates
* `id` (PK) - Unique identifier
* `name` - Template name
* `action_id` (FK → Actions) - Associated action
* `object_id` (FK → Objects) - Associated object
* `tool_id` - Associated tool identifier
* `is_draft` - Draft status flag (0/1)
* `description` - Template description
* `entity_id` (FK → Entities) - Related entity
* `hours_planned` - Planned hours
* `created_at` - Creation timestamp
* `created_by` (FK → Users) - Creator

### Project_Templates
* `id` (PK) - Unique identifier
* `name` - Template name
* `description` - Template description
* `hours` - Expected hours
* `type` - Template type ('project' or 'course')
* `created_at` - Creation timestamp
* `updated_at` - Update timestamp

### Milestone_Templates
* `id` (PK) - Unique identifier
* `name` - Template name
* `description` - Template description

### Checklist_Items
* `id` (PK) - Unique identifier
* `name` - Item name
* `action_id` (FK → Actions) - Associated action
* `object_id` (FK → Objects) - Associated object
* `tool_id` - Tool identifier
* `placement_id` - Placement identifier
* `created_at` - Creation timestamp
* `created_by` (FK → Users) - Creator
* `updated_at` - Update timestamp
* `is_draft` - Draft status flag (0/1)

## Supporting Tables

### Statuses
* `id` (PK) - Unique identifier
* `name` - Status name
* `color` - Color code for visual representation

### Priorities
* `id` (PK) - Unique identifier
* `name` - Priority name

### Actions
* `id` (PK) - Unique identifier
* `name` - Action name

### Objects
* `id` (PK) - Unique identifier
* `name` - Object name

### Entities
* `id` (PK) - Unique identifier
* `name` - Entity name
* `table_name` - Associated database table
* `entity_type_id` (FK → Entity_Types) - Entity type
* `description` - Entity description

### Entity_Types
* `id` (PK) - Unique identifier
* `name` - Type name
* `table_name` - Associated database table

### Professions
* `id` (PK) - Unique identifier
* `name` - Profession name

### Task_Template_Type
* `id` (PK) - Unique identifier
* `name` - Type name

### Formats
* `id` (PK) - Unique identifier
* `name` - Format name

### Languages
* `id` (PK) - Unique identifier
* `name` - Language name
* `iso2` - ISO 639-1 code (2 letters)
* `iso3` - ISO 639-2 code (3 letters)

## Relation Tables

### Task_Assignee
* `task_id` (FK → Tasks) - Associated task
* `assignee_id` (FK → Users) - Assigned user

### Task_Controller
* `task_id` (FK → Tasks) - Associated task
* `controller_id` (FK → Users) - Controller user

### Tasks_Parent_Task
* `task_id` (FK → Tasks) - Child task
* `parent_task_id` (FK → Tasks) - Parent task

### Task_Template_Step_Template
* `task_template_id` (FK → Task_Templates) - Task template
* `step_template_id` (FK → Step_Templates) - Step template

### Task_Template_Profession
* `task_template_id` (FK → Task_Templates) - Task template
* `profession_id` (FK → Professions) - Profession

### Task_Temp_Parent_Task_Temp
* `parent_task_template_id` (FK → Task_Templates) - Parent template
* `task_template_id` (FK → Task_Templates) - Child template

### Project_Temp_Task_Temp
* `id` (PK) - Unique identifier
* `project_template_id` (FK → Project_Templates) - Project template
* `task_template_id` (FK → Task_Templates) - Task template

### Project_Template_Milestone_Template
* `milestone_template_id` (FK → Milestone_Templates) - Milestone template
* `project_template_id` (FK → Project_Templates) - Project template

### Milestone_Template_Task_Template
* `id` (PK) - Unique identifier
* `milestone_template_id` (FK → Milestone_Templates) - Milestone template
* `task_template_id` (FK → Task_Templates) - Task template
* `task_template_queue` - Order in the queue

### Step_Template_Checklist_Item
* `step_template_id` (FK → Step_Templates) - Step template
* `checklist_item_id` (FK → Checklist_Items) - Checklist item
* `is_correct` - Correctness flag (0/1)

## Documentation and Guide Tables

### Guides
* `id` (PK) - Unique identifier
* `name` - Guide name
* `entity_id` (FK → Entities) - Related entity
* `created_by` (FK → Users) - Creator
* `created_at` - Creation timestamp
* `updated_at` - Update timestamp

### Guide_Formats
* `id` (PK) - Unique identifier
* `guide_id` (FK → Guides) - Associated guide
* `link` - External link
* `format_id` (FK → Formats) - Format
* `object_id` (FK → Objects) - Associated object
* `description` - Format description

### Guideables
* `guide_id` (FK → Guides) - Guide
* `guideable_id` - Associated item ID
* `guideable_type` - Associated item type

## System Tables

### Migrations
* `id` (PK) - Unique identifier
* `migration` - Migration file name
* `batch` - Migration batch number

### Failed_Jobs
* `id` (PK) - Unique identifier
* `uuid` - Unique job identifier
* `connection` - Queue connection
* `queue` - Queue name
* `payload` - Job payload
* `exception` - Exception details
* `failed_at` - Failure timestamp

### Jobs
* `id` (PK) - Unique identifier
* `queue` - Queue name
* `payload` - Job payload
* `attempts` - Number of attempts
* `reserved_at` - Reservation timestamp
* `available_at` - Availability timestamp
* `created_at` - Creation timestamp

### Job_Batches
* `id` (PK) - Unique identifier
* `name` - Batch name
* `total_jobs` - Total number of jobs
* `pending_jobs` - Number of pending jobs
* `failed_jobs` - Number of failed jobs
* `failed_job_ids` - IDs of failed jobs
* `options` - Batch options
* `cancelled_at` - Cancellation timestamp
* `created_at` - Creation timestamp
* `finished_at` - Completion timestamp

### Cache and Sessions
* Cache - Stores cached items
* Cache_Locks - Manages cache locks
* Sessions - Manages user sessions
* Personal_Access_Tokens - API token storage

## Next Development Steps

1. **Populate Reference Tables**
   - Add status values (New, In Progress, Review, Completed)
   - Define priority levels (Low, Medium, High, Critical)
   - Set up action types and object types

2. **Add Business Rules & Constraints**
   - Implement validation rules for task transitions
   - Create automatic assignment workflows
   - Define permission structure for different user roles

3. **Design Indexes & Optimizations**
   - Add indexes for common query patterns
   - Optimize query performance for task listing and filtering

4. **Create Relationship Diagram**
   - Document table relationships with a complete ERD
   - Document foreign key constraints

5. **API Development**
   - Design REST endpoints for task management
   - Implement authentication and authorization
   - Create documentation for API consumers

6. **Integration Points**
   - Define integration with notification systems
   - Plan file storage integration for attachments
   - Establish reporting and analytics data flows
