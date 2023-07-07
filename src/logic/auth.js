import axios from "axios";

const login = async({ email, password }) => {
    try {
        const response = await axios.post(
            import.meta.env.VITE_REACT_APP_BASE_URL + "/api/auth/login",
            { email, password }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const register = async ({ name, email, password }) => {
    try {
        const response = await axios.post(
            import.meta.env.VITE_REACT_APP_BASE_URL + "/api/auth/register",
            { fullName: name, email, password }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export {
    login,
    register,
}