import axios from "axios";

const changeNameLogic = async(newName) => {
    try {
        const response = await axios.post(
            import.meta.env.VITE_REACT_APP_BASE_URL + "/api/user/change-fullname",
            { newName }
        );
        return response.data;
    } catch (error) {
        console.log(`changeNameLogic: ${error}`);
    }
};

const changeEmailLogic = async(newEmail) => {
    try {
        const response = await axios.post(
            import.meta.env.VITE_REACT_APP_BASE_URL + "/api/user/change-email",
            { newEmail }
        );
        return response.data;
    } catch (error) {
        console.log(`changeEmailLogic: ${error}`);
    }
};

const changePasswordLogic = async(oldPassword, newPassword) => {
    try {
        const response = await axios.post(
            import.meta.env.VITE_REACT_APP_BASE_URL + "/api/auth/change-password",
            { oldPassword, newPassword }
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(`changePasswordLogic: ${error}`);
    }
}

export {
    changeNameLogic,
    changeEmailLogic,
    changePasswordLogic,
}