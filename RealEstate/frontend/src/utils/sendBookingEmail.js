import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const sendBookingEmail = (userEmail, data,bookingDate) => {
  const serviceId = "service_7su1yir";
  const templateId = "template_087o8li";
  const userId = "p5LOMIHvEr78ROGZB";
  // Validate email addresses
  if (!validateEmail(userEmail) || !validateEmail(data.userEmail)) {
    console.error("Invalid email address provided.");
    toast.error("Failed to send booking details email. Invalid email address.");
    return;
  }

  const templateParams = {
    to_email: userEmail,
    from_email: data.userEmail,
    property_title: data.title,
    property_address: `${data.address}, ${data.city}, ${data.country}`,
    booking_date: bookingDate,
  };

  emailjs.send(serviceId, templateId, templateParams, userId)
    .then(response => {
      console.log("Email sent successfully!", response.status, response.text);
      toast.success("Booking details email sent successfully!");
    })
    .catch(err => {
      console.error("Failed to send email.", err);
      toast.error("Failed to send booking details email.");
    });
};

// Email validation function
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export default sendBookingEmail;
