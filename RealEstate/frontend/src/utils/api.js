import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL:"https://grigohousing.vercel.app/api",
});

export const toastOptions = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const formatDate = (date) => dayjs(date).format("DD/MM/YYYY");

export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/allResidency", {
      timeout: 10 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw new Error(response.data.message);
    }
    return response.data.residencies;
  } catch (error) {
    console.error(error.message);
  }
};

export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw new Error(response.data.message);
    }
    return response.data.residency;
  } catch (error) {
    console.error(error.message);
  }
};
export const createUser = async (email) => {
  try {
    const response = await api.post("/user/register", {
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const bookVisit = async (date, propertyId, email) => {
  try {
    const response = await api.post(`/user/bookVisit/${propertyId}`, {
      email,
      id: propertyId,
      date: dayjs(date).format("DD/MM/YYYY"),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const removeBooking = async (bookingId, email) => {
  try {
    const response = await api.post(`/user/cancelBooking/${bookingId}`, {
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const toFav = async (propertyId, email) => {
  try {
    const response = await api.post(`/user/toFav/${propertyId}`, {
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllFav = async (email) => {
  try {
    const response = await api.post(`/user/allFav`, {
      email,
    });
    return response.data.favResidencies.favResidenciesID;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllBookings = async (email) => {
  try {
    const response = await api.post(`/user/allBookings`, {
      email,
    });
    return response.data.bookings.bookedVisits;
  } catch (error) {
    throw error;
  }
};

export const createResidency = async (data) => {
  try {
    const response = await api.post(`/residency/create`, { data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeResidency = async (id) => {
  try {
    const response = await api.delete(`/residency/removeResidency/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
