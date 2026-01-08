# Backend Audit Report

## 1. Executive Summary
The backend architecture is structured correctly using Express and MongoDB with a clear separation of concerns (Controllers, Models, Routes). However, several critical systems are either partially implemented ("skeleton code") or rely on manual/seed data rather than dynamic application logic. 

**Key Missing Features:** Payment processing, Notification triggers, and Real-time User Statistics updates.

---

## 2. Hardcoded & Placeholder Components

### A. Expert Application Logic (`controllers/expertAppController.js`)
- **[CRITICAL] Security Bypass**: The `approveApplication` route is explicitly made public for testing purposes, bypassing admin authentication.
  ```javascript
  // @access Private (Admin) - making public for testing via script for now
  ```
- **Incomplete Content**: The `rejectApplication` function contains a hardcoded placeholder for the email body.
  ```javascript
  message: 'Your application has been reviewed. elaborate details in html body',
  ```
- **Hardcoded Secrets**: Uses fallback strings like `'secret'` for JWT signing if env vars are missing.

### B. Project Management (`controllers/projectController.js`)
- **Review Flow Bypass**: When submitting a deliverable, the status is hardcoded to `'completed'`, bypassing any client review or approval phase.
  ```javascript
  milestone.status = 'completed'; // Mark as completed (or 'pending_review' if you have that status)
  ```

---

## 3. "Orphaned" Logic & Missing Implementations

### A. Payment & Transaction System (Missing)
- **Status**: **Non-Existent**. 
- **Evidence**: 
  - A `Transaction` model exists, but there is **no controller** to create transactions.
  - No integration with payment gateways (Stripe, PayPal, etc.).
  - The `expertController.getEarnings` relies on `Transaction` data that can never be created via the API.

### B. User Statistics (Stale/Static Data)
- **Status**: **Broken**.
- **Evidence**: 
  - `User.activeChats` and `User.pendingActions` fields are defined in the model and **read** by multiple controllers (`expertController`, `projectController`) to populate dashboards.
  - **HOWEVER**, these fields are **never updated**.
  - `messageController.js` creates messages but does not increment `activeChats`.
  - No logic exists to calculate or update `pendingActions`.
- **Result**: Dashboard stats for "Active Chats" and "Pending Actions" will permanently remain at `0` (or their default value).

### C. Notification System (Disconnected)
- **Status**: **Implemented but Unused**.
- **Evidence**: 
  - `notificationController.js` has a helper `createNotification` to save notifications to the DB.
  - **No other controller imports or uses this**. 
  - Events like "Message Received", "Application Approved", or "Project Created" do **not** trigger any in-app notifications.

---

## 4. Recommendations

### Immediate Fixes
1.  **Secure Routes**: Re-enable Admin authentication for `approveApplication` in `expertAppController.js`.
2.  **Fix Review Flow**: Change deliverable submission status to `'pending_review'` and add an endpoint for clients to approve/reject deliverables.
3.  **Connect Notifications**: Export `createNotification` and call it within `messageController.js`, `expertAppController.js`, etc.

### Feature Implementation Required
1.  **Payment Gateway**: Implement a `paymentController` to handle legitimate transactions (e.g., Stripe Webhooks) and create `Transaction` records.
2.  **Dynamic Stats**:
    - **Option A**: Implement background triggers to update `User.activeChats` and `pendingActions` on relevant events.
    - **Option B (Recommended)**: Remove these fields from the `User` model and calculate them continuously using aggregation queries (e.g., `Message.countDocuments(...)`) to ensure accuracy.
