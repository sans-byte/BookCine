import { axiosInstance } from ".";

// get
export const getAllTheaters = async () => {
  try {
    const response = await axiosInstance.get("/api/theater/get-all-theaters");
    return response.data;
  } catch (error) {
    return response.error;
  }
};

export const getAllTheatersByOwner = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theater/get-all-theaters-by-owner",
      payload
    );
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// post

export const addTheater = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theater/add-theater",
      payload
    );
    return response.data;
  } catch (error) {
    return response.error;
  }
};

//update
export const updateTheater = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/theater/update-theater",
      payload
    );
    return response.data;
  } catch (error) {
    return response.error;
  }
};

//delete

export const deleteTheater = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theater/delete-theater",
      payload
    );
    return response.data;
  } catch (error) {
    return response.error;
  }
};
