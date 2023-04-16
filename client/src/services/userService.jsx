import { axiosInstance } from '.';


//Register a new user
export const registerUser = async ( payload ) => {
    try {
        const response = await axiosInstance.post("/api/users/register",payload);
        return response.data;
    } catch (error) {
        return error.response
    }
};

//Login a user
 export const loginUser = async ( payload ) => {
    try {
        const response = await axiosInstance.post("/api/users/login",payload);
        return response.data;
    } catch (error) {
        return error.response
    }
};

//get current user
 export const getCurrentUser = async () => {
    try {
        const response = await axiosInstance.get("/api/users/get-current-user");
        return response.data;
    } catch (error) {
        return error
    }
};