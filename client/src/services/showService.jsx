import { axiosInstance } from ".";

//post
// add shows
export const addShow = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/shows/add-show", payload);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

//get all shows by perticular theater
export const getAllShowsByTheater = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/shows/get-shows-by-theater",
      payload
    );
    return response.data;
  } catch (error) {
    return response.error;
  }
};

export const getShowById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/shows/get-show-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return response.error;
  }
};

//delete show
export const deleteShow = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/shows/delete-show",
      payload
    );
    return response.data;
  } catch (error) {
    return response.error;
  }
};
