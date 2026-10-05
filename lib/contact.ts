// lib/contact.ts
// Contact form logic — isolated for easy swapping.
// Default: opens a mailto: link prefilled with subject and body.
// Adapter slot: swap in Formspree / Web3Forms / Resend via env var.

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactResult {
  success: boolean;
  method: "mailto" | "api";
}

/**
 * Submit the contact form.
 *
 * Currently opens a prefilled mailto: link.
 *
 * To integrate with a service:
 * 1. Set NEXT_PUBLIC_CONTACT_ENDPOINT env var to your form endpoint
 * 2. Uncomment the API adapter below
 * 3. Redeploy
 *
 * Supported services (uncomment one):
 * - Formspree: "https://formspree.io/f/YOUR_FORM_ID"
 * - Web3Forms: "https://api.web3forms.com/submit"
 * - Resend: your own API route "/api/contact"
 */
export function submitContact(data: ContactFormData): ContactResult {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

  if (endpoint) {
    // === API ADAPTER (uncomment when ready) ===
    // fetch(endpoint, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     name: data.name,
    //     email: data.email,
    //     message: data.message,
    //     // For Web3Forms, add: access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY
    //   }),
    // });
    // return { success: true, method: "api" };

    // Fallback to mailto if endpoint is set but adapter is not uncommented
    void endpoint;
  }

  // Default: open mailto link
  const subject = encodeURIComponent(
    `Portfolio Contact from ${data.name}`
  );
  const body = encodeURIComponent(
    `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
  );

  window.location.href = `mailto:chauhanhasnain78@gmail.com?subject=${subject}&body=${body}`;

  return { success: true, method: "mailto" };
}
