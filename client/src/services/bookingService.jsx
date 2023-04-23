import { axiosInstance } from ".";

//post
// book shows
export const bookShowTickets = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/book/book-show", payload);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

export const getBookingsOfUser = async (userId) => {
    try {
    const response = await axiosInstance.get(`/api/book/get-bookings`);
    return response.data;
  } catch (error) {
    return response.error;
  }

}