# Database Migration & Bootstrap Guide

This document explains the schema and how to bootstrap the production database.

## 1. Schema & RLS Explanation
The database schema (`supabase/migrations/00000000000000_initial_schema.sql`) contains:
- `contact_submissions`: Stores general inquiries.
- `referrals`: Stores secure referral data.
- `admin_users`: Stores the email addresses of authorized administrators.

### Row Level Security (RLS)
The database enforces strict zero-trust RLS policies.
- **Anonymous users** have `INSERT` only access to forms. They cannot `SELECT`, `UPDATE`, or `DELETE` any row.
- **Authenticated users** are evaluated against the `is_admin()` SQL function, which checks if their `auth.jwt() ->> 'email'` exists in the `admin_users` table.
- **Admins** have `SELECT`, `INSERT`, `UPDATE`, `DELETE` privileges only if `is_admin()` returns true.

## 2. Applying the Migration
Use the Supabase CLI to apply the initial schema to your production project:

```bash
supabase link --project-ref your-project-id
supabase db push
```
*(Alternatively, execute the SQL file manually in the Supabase Dashboard SQL Editor).*

## 3. Admin Bootstrap Process
We **do not** automatically insert an unknown email during migration. To authorize your first admin user:

1. Log in via Google OAuth on your frontend at `/login` with your intended admin Google Account. This creates the user in the Supabase `auth.users` system.
2. Go to the Supabase Dashboard -> SQL Editor.
3. Explicitly authorize this user by running the following SQL statement:

```sql
INSERT INTO public.admin_users (email)
VALUES ('your-authorized-admin@gmail.com');
```

4. The user is now an authorized admin and can log in to the `/admin` dashboard securely.
