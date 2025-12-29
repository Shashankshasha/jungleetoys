# Email Notification Setup Guide

This guide will help you set up email notifications for offer approvals using Resend.

## Prerequisites

- A Resend account (sign up at https://resend.com)
- Access to your Vercel project settings

## Step 1: Set up Resend

1. **Sign up for Resend**
   - Go to https://resend.com
   - Sign up for a free account (100 emails/day on free tier)

2. **Add and verify your domain**
   - In Resend dashboard, go to "Domains"
   - Click "Add Domain"
   - Enter your domain: `jungleetoys.com`
   - Resend will provide DNS records to add

3. **Add DNS records to Vercel**
   - Go to your Vercel project dashboard
   - Navigate to Settings → Domains → jungleetoys.com
   - Click on the domain and go to DNS records
   - Add the DNS records provided by Resend (typically 3 TXT records for DKIM and SPF)

4. **Get your API key**
   - In Resend dashboard, go to "API Keys"
   - Click "Create API Key"
   - Give it a name like "JungleeToys Production"
   - Copy the API key (starts with `re_`)

## Step 2: Configure Vercel Environment Variable

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add a new environment variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Your Resend API key (e.g., `re_xxxxxxxxxx`)
   - **Environments**: Select all (Production, Preview, Development)
4. Click "Save"

## Step 3: Redeploy

After adding the environment variable, trigger a new deployment:
- Go to Deployments tab
- Click on the three dots (···) next to your latest deployment
- Select "Redeploy"

## How it Works

When an admin clicks "Approve" on an offer in the admin panel:

1. The offer status is updated to "approved" in the database
2. An email is automatically sent to the customer containing:
   - Product details and approved offer amount
   - Payment instructions
   - Store contact information
3. The customer can reply to complete the purchase

## Email Template Features

The email includes:
- ✅ Professional HTML design with your store branding
- 📧 Clickable email and support links
- 🖼️ Product image (if available)
- 💰 Clear pricing comparison (original vs offer price)
- 📝 Payment instructions
- 🎨 Green jungle theme matching your website

## Customization

You can customize the email sender name and address in `lib/email.ts`:

```typescript
from: `${storeName} <noreply@jungleetoys.com>`,
```

The `storeName` and `supportEmail` are automatically pulled from your store settings in the admin panel.

## Troubleshooting

### Emails not sending?

1. **Check API key**: Make sure `RESEND_API_KEY` is set in Vercel
2. **Verify domain**: Ensure jungleetoys.com is verified in Resend
3. **Check logs**: In Vercel, go to your deployment logs to see error messages
4. **Resend dashboard**: Check the "Emails" tab in Resend to see if emails were sent

### Emails going to spam?

1. Make sure all DNS records are properly configured
2. Add SPF and DKIM records from Resend
3. Consider adding a DMARC record
4. Use a verified domain email as the "from" address

## Testing

To test email notifications:

1. Make sure you're logged in as admin
2. Go to a product page (while logged out or in incognito mode)
3. Click "Make an Offer" and submit a test offer with your email
4. Log back into admin panel
5. Go to Offers tab
6. Click "Approve" on your test offer
7. Check your email inbox (and spam folder)

## Free Tier Limits

Resend free tier includes:
- 100 emails per day
- 3,000 emails per month
- Full API access

If you need more, upgrade to a paid plan at https://resend.com/pricing

## Support

If you encounter issues:
- Check Resend documentation: https://resend.com/docs
- View email logs in Resend dashboard
- Check Vercel deployment logs for errors
