# Email Notification Setup Guide

This guide will help you set up email notifications for offer approvals using your existing Hostinger email (grace@jungleetoys.com).

## Prerequisites

- Hostinger email account: `grace@jungleetoys.com`
- Password for the email account
- Access to your Vercel project settings

## How It Works

The system uses **Nodemailer** with **SMTP** to send emails through your Hostinger email account. When an admin clicks "Approve" on an offer:

1. The offer status is updated to "approved" in the database
2. An email is automatically sent from `grace@jungleetoys.com` to the customer containing:
   - Product details and approved offer amount
   - Payment instructions
   - Store contact information
3. Customer can reply directly to `grace@jungleetoys.com`

## Step 1: Get Your Hostinger Email Password

You'll need the password for `grace@jungleetoys.com`. If you don't have it:

1. Log into your Hostinger account
2. Go to Email → Email Accounts
3. Find `grace@jungleetoys.com`
4. You can either use the existing password or reset it

## Step 2: Configure Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these three environment variables:

### Variable 1: SMTP_USER
- **Name**: `SMTP_USER`
- **Value**: `grace@jungleetoys.com`
- **Environments**: Select all (Production, Preview, Development)
- Click "Save"

### Variable 2: SMTP_PASSWORD
- **Name**: `SMTP_PASSWORD`
- **Value**: Your Hostinger email password
- **Environments**: Select all (Production, Preview, Development)
- Click "Save"

### Variable 3: SMTP_HOST (Optional)
- **Name**: `SMTP_HOST`
- **Value**: `smtp.hostinger.com`
- **Environments**: Select all (Production, Preview, Development)
- **Note**: This defaults to `smtp.hostinger.com`, only add if you need a different server
- Click "Save"

### Variable 4: SMTP_PORT (Optional)
- **Name**: `SMTP_PORT`
- **Value**: `465`
- **Environments**: Select all (Production, Preview, Development)
- **Note**: This defaults to `465` (SSL), only add if you need a different port
- Click "Save"

## Step 3: Redeploy

After adding the environment variables, trigger a new deployment:
- Go to **Deployments** tab
- Click on the three dots (···) next to your latest deployment
- Select **"Redeploy"**

## Hostinger SMTP Settings Reference

For reference, here are the Hostinger SMTP settings being used:

| Setting | Value |
|---------|-------|
| SMTP Server | `smtp.hostinger.com` |
| SMTP Port | `465` (SSL) or `587` (TLS) |
| Encryption | SSL/TLS |
| Username | `grace@jungleetoys.com` |
| Password | Your email password |

## Email Template Features

The approval email includes:
- ✅ Professional HTML design with your store branding
- 📧 Reply-to set to `grace@jungleetoys.com` (customers can reply directly)
- 🖼️ Product image (if available)
- 💰 Clear pricing comparison (original vs offer price)
- 📝 Payment instructions
- 🎨 Green jungle theme matching your website

## Customization

The email sender name comes from your store settings. Update it in:
- Admin Panel → Settings → Store Name

The support email for payment instructions also comes from store settings:
- Admin Panel → Settings → Support Email

## Troubleshooting

### Emails not sending?

1. **Check credentials**:
   - Make sure `SMTP_USER` is set to `grace@jungleetoys.com`
   - Verify `SMTP_PASSWORD` is correct (try logging into webmail)

2. **Test your email login**:
   - Try logging into https://webmail.hostinger.com with your credentials
   - If login fails, reset your password in Hostinger

3. **Check Vercel logs**:
   - Go to Vercel → Your Project → Deployments
   - Click on latest deployment → Runtime Logs
   - Look for error messages when approving an offer

4. **Verify environment variables**:
   - Go to Settings → Environment Variables
   - Make sure all variables are set for all environments (Production, Preview, Development)

### Common Error Messages

**"Invalid login"** or **"Authentication failed"**
- Your email password is incorrect
- Reset password in Hostinger and update `SMTP_PASSWORD` in Vercel

**"Connection timeout"**
- SMTP host or port might be wrong
- Verify you're using `smtp.hostinger.com` and port `465`

**"Self-signed certificate"**
- This is usually safe with Hostinger
- The code uses `secure: true` which handles this automatically

### Emails going to spam?

Since you're using your own verified domain email (grace@jungleetoys.com), emails should have good deliverability. However:

1. Make sure your DNS records are properly configured (MX, SPF, DKIM)
2. Ask recipients to check their spam folder the first time
3. Add jungleetoys.com to their contacts

## Testing

To test email notifications:

1. Make sure you're logged in as admin
2. Go to a product page (while logged out or in incognito mode)
3. Click "Make an Offer" and submit a test offer with your personal email
4. Log back into admin panel
5. Go to **Offers** tab
6. Find your test offer
7. Click **"Approve"** button
8. Check your email inbox (and spam folder) for the approval email

You should receive a beautiful HTML email from `JungleeToys <grace@jungleetoys.com>` with:
- Product details
- Your approved offer amount
- Payment instructions
- Ability to reply directly to grace@jungleetoys.com

## Security Notes

- **Never commit passwords**: Environment variables are stored securely in Vercel
- **Use strong password**: Make sure your email password is secure
- **Enable 2FA**: Consider enabling two-factor authentication on your Hostinger account

## Email Limits

Hostinger email accounts typically include:
- Generous daily sending limits (varies by plan)
- No additional costs for sending emails
- Uses your existing email infrastructure

Check your Hostinger plan for specific limits.

## Support

If you encounter issues:
- Check Hostinger's email documentation
- Contact Hostinger support for email-specific issues
- Check Vercel deployment logs for detailed error messages

## Summary

**Required Environment Variables:**
- `SMTP_USER` = `grace@jungleetoys.com`
- `SMTP_PASSWORD` = Your Hostinger email password

**Optional Environment Variables:**
- `SMTP_HOST` = `smtp.hostinger.com` (defaults to this)
- `SMTP_PORT` = `465` (defaults to this)

Once configured, all offer approvals will automatically send emails from grace@jungleetoys.com! 🎉
