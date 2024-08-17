import { toast } from "react-toastify";
import React, { useState, useEffect, useContext } from "react";
import "./Property.css";
import { getProperty, removeResidency, removeBooking } from "../../utils/api";
import { getPredictedPrice } from "../../utils/pricePredictionapi";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { PuffLoader } from "react-spinners";
import { AiTwotoneCar } from "react-icons/ai";
import { FaShower } from "react-icons/fa";
import {
  MdMeetingRoom,
  MdLocationPin,
  MdOutlineSquareFoot,
} from "react-icons/md";
import Map from "../../components/Map/Map";
import BookingModal from "../../components/BookingModal/BookingModal";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import userDetailsContext from "../../context/UserDetailsContext";
import { Button } from "@mantine/core";
import Heart from "../../components/Heart/Heart";

const Property = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["property"],
    queryFn: () => getProperty(id),
  });
  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(userDetailsContext);
  const [modalOpened, setModalOpened] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState(null);
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();
  const formatPrice = (price) => {
    if (!price) return "Calculating...";

    // Remove commas if present
    const cleanPrice = price.replace(/,/g, "");

    // Parse to float and remove decimals
    const parsedPrice = parseFloat(cleanPrice);
    const integerPrice = Math.floor(parsedPrice);

    // Format as string with commas
    return integerPrice.toLocaleString();
  };
  useEffect(() => {
    if (data) {
      const fetchPredictedPrice = async () => {
        try {
          // console.log(data.city,data.facilities.area,data.address,data.facilities.bedrooms);
          const response = await getPredictedPrice({
            City: data.city,
            Area: data.facilities.area,
            Location: data.address,
            "No. of Bedrooms": data.facilities.bedrooms,
          });
          setPredictedPrice(response.predicted_price);
        } catch (error) {
          toast.error("Failed to fetch predicted price");
        }
      };

      fetchPredictedPrice();
    }
  }, [data]);

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((b) => b.id !== id),
      }));
      toast.success("Booking cancelled successfully");
    },
  });

  const { mutate: removePropertyMutation, isLoading: deleting } = useMutation({
    mutationFn: () => removeResidency(id),
    onSuccess: () => {
      toast.success("Property removed successfully");
      navigate("/properties");
    },
  });
  useEffect(() => {
    if (bookings) {
      const today = new Date();

      bookings.forEach((booking) => {
        if (booking.id === id) {
          const bookingDate = new Date(booking.date);
          if (bookingDate < today) {
            cancelBooking();
          }
        }
      });
    }
  }, [bookings, id]);
  if (isError) {
    return (
      <div className="pro-wrapper">
        <span>Error while fetching Property Details</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flexCenter pro-wrapper" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  return (
    <section className="pro-wrapper">
      <div className="flexColStart paddings innerWidth pro-container">
        <div className="like">
          <Heart id={id} />
        </div>
        <img src={data?.image} alt="home image" />
        <div className="flexCenter pro-details">
          <div className="flexColStart left">
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                ₹{data?.price.toLocaleString()}
              </span>
            </div>
            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color="#1f3e72" />
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>
              <div className="flexStart facility">
                <AiTwotoneCar size={25} color="#1f3e72" />
                <span>{data?.facilities?.parking} Parking</span>
              </div>
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1f3e72" />
                <span>{data?.facilities?.bedrooms} Bedrooms</span>
              </div>
              {data?.facilities?.area && (
                <div className="flexStart facility">
                  <MdOutlineSquareFoot size={20} color="#1f3e72" />
                  <span>{data.facilities.area} sq ft</span>
                </div>
              )}
            </div>
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={20} color="#1f3e72" />
              <span className="secondaryText">
                {data?.address} {data?.city} {data?.country}
              </span>
            </div>
            {/* Display the actual and predicted prices */}
            <div className="price-container">
              <span className="price-text">
                <span className="primaryText">Predicted Price : </span>{" "}
                <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                  {" "}
                  ₹
                  {formatPrice(predictedPrice)
                    ? formatPrice(predictedPrice)
                    : "Calculating..."}
                </span>
              </span>
            </div>

            {bookings?.find((booking) => booking.id === id) ? (
              <>
                <Button
                  variant="outline"
                  w={"100%"}
                  color="red"
                  onClick={() => cancelBooking()}
                  disabled={cancelling}
                >
                  Cancel Booking
                </Button>
                <span>
                  Your visit is already booked on{" "}
                  {bookings.filter((booking) => booking?.id === id)[0].date}
                </span>
              </>
            ) : (
              data?.userEmail !== user?.email && (
                <button
                  className="button"
                  onClick={() => {
                    validateLogin() && setModalOpened(true);
                  }}
                >
                  Book your visit
                </button>
              )
            )}
            {data?.userEmail === user?.email && (
              <Button
                variant="outline"
                w={"100%"}
                color="red"
                onClick={() => removePropertyMutation()}
                disabled={deleting}
              >
                Remove Property
              </Button>
            )}
            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={id}
              email={user?.email}
              data={data}
            />
          </div>
          <div className="map">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Property;
