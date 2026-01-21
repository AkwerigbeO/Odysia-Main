# Implementation Plan - Admin Dashboard & Resume Display

## Problem
The Admin Expert Applications dashboard currently uses hardcoded mock data and does not check the backend API. Additionally, it lacks any UI to view or download the attached resume.

## Proposed Changes

### 1. Backend: Support Download Action
- **File**: `backend/controllers/uploadController.js`
- **Change**: In `getFile`, check `req.query.download === 'true'`.
    - If true, set `Content-Disposition` to `attachment`.
    - Else, keep it as `inline`.

### 3. Fix: Application Approval/Rejection
- **File**: `frontend/src/app/admin/expert-applications/page.tsx`
- **Change**: Map the `status` UI parameter (`approved`/`rejected`) to the backend API action (`approve`/`reject`).
    - **Reason**: The backend routes are `/api/expert-applications/:id/approve` and `/api/expert-applications/:id/reject`, but the frontend was sending the full status name.
### 4. Admin Experts List
- **Backend: Fetch All Experts**
    - **File**: `backend/controllers/expertController.js`
    - **Change**: Add `getAllExperts` to fetch all users with `role: 'expert'`.
    - **File**: `backend/routes/expertRoutes.js`
    - **Change**: Add `router.get('/admin/all', protect, admin, getAllExperts)`.
- **Frontend: Experts Page**
    - **File**: `frontend/src/app/admin/experts/page.tsx` [NEW]
    - **Change**: Create a page to list experts with search/filter and detailed views.

### Manual Verification
1.  Navigate to `/admin/expert-applications` (ensure logged in as Admin).
2.  Verify the list shows real applications (the one created in previous turn).
3.  Click "View" on an application.
4.  Verify "Download Resume" button appears.
5.  Click it and ensure the file downloads/opens.
