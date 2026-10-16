// Contact form submission handler
// Currently uses mailto: - can be swapped for Formspree / Web3Forms / Resend later

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honeypot?: string; // anti-spam honeypot field
}

export interface ContactResult {
  success: boolean;
  message: string;
}

export function submitContact(data: ContactFormData): ContactResult {
  // Check honeypot - if filled, it's a bot
  if (data.honeypot) {
    // Silently succeed to not alert bots
    return { success: true, message: 'Message sent!' };
  }

  // Basic validation
  if (!data.name.trim()) {
    return { success: false, message: 'Please enter your name.' };
  }
  if (!data.email.trim() || !isValidEmail(data.email)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }
  if (!data.message.trim()) {
    return { success: false, message: 'Please enter a message.' };
  }

  // Build mailto link
  const subject = encodeURIComponent(`Portfolio Contact from ${data.name.trim()}`);
  const body = encodeURIComponent(
    `Name: ${data.name.trim()}\nEmail: ${data.email.trim()}\n\nMessage:\n${data.message.trim()}`
  );
  const mailtoUrl = `mailto:chauhanhasnain78@gmail.com?subject=${subject}&body=${body}`;

  // Open mailto
  window.open(mailtoUrl, '_blank');

  return {
    success: true,
    message: 'Opening your email client...',
  };
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
