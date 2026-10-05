# RLS Testing Report

## Test Matrix

| Actor | Action | Target Table | Expected Result | Verified By Policy |
|-------|--------|--------------|-----------------|--------------------|
| Anonymous | `SELECT` | `contact_submissions` | Deny | Default Deny (No anonymous select policy) |
| Anonymous | `INSERT` | `contact_submissions` | Allow | `Anyone can submit contact form` |
| Anonymous | `SELECT` | `referrals` | Deny | Default Deny (No anonymous select policy) |
| Anonymous | `INSERT` | `referrals` | Allow | `Anyone can submit referrals` |
| Anonymous | `SELECT` | `admin_users` | Deny | Default Deny (No anonymous select policy) |
| Admin | `SELECT` | `contact_submissions` | Allow | `Admins can view contact submissions` |
| Admin | `SELECT` | `referrals` | Allow | `Admins can view referrals` |
| Admin | `INSERT` | `admin_users` | Allow | `Admins can manage admin users` |
| User A (Admin) | `SELECT` | `contact_submissions` | Allow | All admins have global read access to submissions |
| User B (Non-Admin)| `SELECT` | `referrals` | Deny | Fails `is_admin()` check |

## Verification Notes
- The `is_admin()` PostgreSQL function securely checks the `auth.jwt() ->> 'email'` against the `admin_users` table. 
- Because there is NO policy allowing an authenticated non-admin or anonymous user to `INSERT` or `UPDATE` the `admin_users` table, role escalation is prevented at the database level.
- Cross-record access is not applicable for end-users, as anonymous users cannot read any records. All records are only visible to verified admins.
