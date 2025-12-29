# Supabase Storage Setup Instructions

## 1. Create Storage Bucket

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Click "Storage" in left sidebar
4. Click "New bucket"
5. Enter:
   - Name: `product-images`
   - Public: ✅ TOGGLE ON (IMPORTANT!)
6. Click "Create bucket"

## 2. Set Up Storage Policies

After creating the bucket:

1. Click on `product-images` bucket
2. Click "Policies" tab at the top
3. You should see "No policies created yet"

### Add INSERT Policy (for uploading):
1. Click "New Policy"
2. Click "Create a policy from scratch"
3. Fill in:
   - Policy name: `Allow uploads`
   - Allowed operation: CHECK "INSERT"
   - Target roles: `public`
   - Policy definition:
     ```sql
     true
     ```
4. Click "Review" → "Save policy"

### Add SELECT Policy (for viewing):
1. Click "New Policy" again
2. Click "Create a policy from scratch"
3. Fill in:
   - Policy name: `Public read access`
   - Allowed operation: CHECK "SELECT"
   - Target roles: `public`
   - Policy definition:
     ```sql
     true
     ```
4. Click "Review" → "Save policy"

### Add DELETE Policy (for removing):
1. Click "New Policy" again
2. Click "Create a policy from scratch"
3. Fill in:
   - Policy name: `Allow deletes`
   - Allowed operation: CHECK "DELETE"
   - Target roles: `public`
   - Policy definition:
     ```sql
     true
     ```
4. Click "Review" → "Save policy"

## 3. Test Upload

After setting up policies, try uploading again in your admin panel.

## Common Issues:

- ❌ Bucket not public → Images won't be accessible
- ❌ Missing INSERT policy → Upload will fail with 403 error
- ❌ Missing SELECT policy → Images won't display
- ❌ Wrong bucket name → Make sure it's exactly `product-images`
