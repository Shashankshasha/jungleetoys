import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface OfferApprovalEmailData {
  customerName: string;
  customerEmail: string;
  productName: string;
  productPrice: number;
  offerAmount: number;
  productImage?: string;
  storeName: string;
  supportEmail: string;
}

export async function sendOfferApprovalEmail(data: OfferApprovalEmailData) {
  const {
    customerName,
    customerEmail,
    productName,
    productPrice,
    offerAmount,
    productImage,
    storeName,
    supportEmail,
  } = data;

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Offer Has Been Approved!</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f0fdf4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">🎉 Offer Approved!</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">
                Hi <strong>${customerName}</strong>,
              </p>

              <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">
                Great news! We've approved your offer for <strong>${productName}</strong>.
              </p>

              ${productImage ? `
              <div style="text-align: center; margin: 30px 0;">
                <img src="${productImage}" alt="${productName}" style="max-width: 200px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              </div>
              ` : ''}

              <!-- Offer Details -->
              <table style="width: 100%; margin: 30px 0; border-collapse: collapse; background-color: #f9fafb; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 20px; border-bottom: 1px solid #e5e7eb;">
                    <table style="width: 100%;">
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Product:</td>
                        <td style="text-align: right; color: #111827; font-weight: bold; font-size: 14px;">${productName}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px; border-bottom: 1px solid #e5e7eb;">
                    <table style="width: 100%;">
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Original Price:</td>
                        <td style="text-align: right; color: #111827; font-size: 14px; text-decoration: line-through;">£${productPrice.toFixed(2)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px;">
                    <table style="width: 100%;">
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Your Approved Offer:</td>
                        <td style="text-align: right; color: #22c55e; font-weight: bold; font-size: 18px;">£${offerAmount.toFixed(2)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Payment Instructions -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 30px 0; border-radius: 8px;">
                <h2 style="margin: 0 0 15px; color: #92400e; font-size: 18px;">💳 Next Steps - Payment Instructions</h2>
                <p style="margin: 0 0 10px; color: #78350f; font-size: 14px; line-height: 1.6;">
                  To complete your purchase, please reply to this email or contact us at:
                </p>
                <p style="margin: 0; color: #78350f; font-size: 14px;">
                  <strong>Email:</strong> <a href="mailto:${supportEmail}" style="color: #22c55e; text-decoration: none;">${supportEmail}</a>
                </p>
                <p style="margin: 15px 0 0; color: #78350f; font-size: 14px; line-height: 1.6;">
                  We'll send you payment details and arrange delivery once payment is confirmed.
                </p>
              </div>

              <p style="margin: 30px 0 0; font-size: 14px; color: #6b7280; line-height: 1.6;">
                If you have any questions, please don't hesitate to contact us. We're excited to get this toy to you!
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px; font-size: 16px; color: #111827; font-weight: bold;">${storeName}</p>
              <p style="margin: 0; font-size: 14px; color: #6b7280;">
                Questions? Contact us at <a href="mailto:${supportEmail}" style="color: #22c55e; text-decoration: none;">${supportEmail}</a>
              </p>
            </td>
          </tr>
        </table>

        <!-- Footer Note -->
        <p style="text-align: center; margin: 20px 0 0; font-size: 12px; color: #9ca3af;">
          You're receiving this email because you submitted an offer on ${storeName}.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  try {
    const response = await resend.emails.send({
      from: `${storeName} <noreply@jungleetoys.com>`,
      to: customerEmail,
      subject: `🎉 Your offer for ${productName} has been approved!`,
      html: emailHtml,
    });

    return { success: true, data: response };
  } catch (error) {
    console.error('Error sending offer approval email:', error);
    return { success: false, error };
  }
}
