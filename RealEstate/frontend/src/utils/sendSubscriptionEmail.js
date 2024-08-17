import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const sendSubscriptionEmail = (userEmail, data) => {
  const serviceId = "service_axcl4xa";
  const templateId = "template_axxhjm7"; // Use the template ID for subscription emails
  const userId = "_lRZCFaNd6eZN_qlu";

  // Fixed email address to receive subscription emails
  const recipientEmail = userEmail

  // Validate email addresses
  if (!validateEmail(userEmail)) {
    console.error("Invalid email address provided.");
    toast.error("Failed to send subscription email. Invalid email address.");
    return;
  }

  const templateParams = {
    to_email: recipientEmail, // Send the email to yourself
    from_email: "akashbalaji594@gmail.com", 
    user_name: data.userName,
    subscription_date: new Date().toLocaleDateString(), // Current date
  };

  emailjs.send(serviceId, templateId, templateParams, userId)
    .then(response => {
      toast.success("Subscription email sent successfully!");
    })
    .catch(err => {
      console.error("Failed to send email.", err);
      toast.error("Failed to send subscription email.");
    });
};

// Email validation function
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export default sendSubscriptionEmail;
