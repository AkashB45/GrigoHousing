import { useContext, useState } from "react";
import { Modal } from "@mantine/core";
import React from "react";
import { DatePicker } from "@mantine/dates";
import { useMutation } from "react-query";
import { bookVisit } from "../../utils/api";
import userDetailsContext from "../../context/UserDetailsContext";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import sendBookingEmail from "../../utils/sendBookingEmail";
const BookingModal = ({ opened, setOpened, propertyId, email ,data }) => {
  const [value, setValue] = useState(null);
  const bookingDate = dayjs(value).format("DD/MM/YYYY");
  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(userDetailsContext);
  const handleBookingSuccess = () => {
    toast.success("Visit booked successfully", {
      position: "bottom-right",
    });

    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: dayjs(value).format("DD/MM/YYYY"),
        },
      ],
    }));
    sendBookingEmail(email,data,bookingDate);
  };
  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email),
    onSuccess: () => handleBookingSuccess(),
    onError: ({ response }) => toast.error(response.data.message),
    onSettled: () => setOpened(false),
  });
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Select your date of visit"
      centered
      closeOnClickOutside
    >
      <div className="flexColCenter" style={{gap:"1rem"}}>
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <button
          className="button"
          onClick={() => mutate()}
          disabled={!value || isLoading}
        >
          Book Visit
        </button>
        {/* {console.log(value)} */}
      </div>
    </Modal>
  );
};

export default BookingModal;
