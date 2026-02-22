import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "service_id";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "template_id";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "public_key";

type ContactTemplateParams = {
  name: string;
  email: string;
  title: string;
  message: string;
};

export function sendContactEmail(templateParams: ContactTemplateParams) {
  if (
    !SERVICE_ID ||
    !TEMPLATE_ID ||
    !PUBLIC_KEY ||
    SERVICE_ID === "service_id" ||
    TEMPLATE_ID === "template_id" ||
    PUBLIC_KEY === "public_key"
  ) {
    throw new Error("EmailJS is not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in .env.");
  }

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
}
