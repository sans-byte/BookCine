import { axiosInstance } from ".";

//Get
export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/api/movies/get-all-movies");
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Fetching the movie form the database based on the ID provided in params as payload here
export const getMovieById = async (payload) => {
  try {
    const response = await axiosInstance.get(
      `/api/movies/get-movie-by-id/${payload}`,
      payload
    );
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Post
export const addMovie = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/movies/add-movie", payload);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

//update
export const updateMovie = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/movies/update-movie",
      payload
    );
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// delete

export const deleteMovie = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/movies/delete-movie",
      payload
    );
    return response.data;
  } catch (error) {
    return response.error;
  }
};
