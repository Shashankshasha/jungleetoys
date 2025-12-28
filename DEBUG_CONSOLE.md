# How to Check Browser Console for Errors

## Steps:

1. Open your admin page: https://jungleetoys-lrtkyw95m-ranjita-shaw-s-projects.vercel.app/admin

2. Press F12 (Windows) or Cmd+Option+I (Mac)
   - OR right-click anywhere → "Inspect"

3. Click the "Console" tab at the top

4. Look for RED error messages

5. Take a screenshot OR copy/paste the errors

## Common Errors You Might See:

### Error: "supabaseUrl is required"
- Means: Environment variables not set in Vercel
- Fix: Check Vercel environment variables

### Error: "Failed to fetch" or "Network error"
- Means: API not responding
- Fix: Check Vercel deployment status

### Error: "Bucket not found" or "storage error"
- Means: Supabase storage not set up
- Fix: Create storage bucket in Supabase

### Error: "Row level security policy"
- Means: Storage policies missing
- Fix: Add policies in Supabase storage

## Send Me:
- Screenshot of Console tab
- OR copy/paste the error messages
- This will tell me exactly what's wrong!
