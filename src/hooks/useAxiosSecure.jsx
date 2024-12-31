import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosURL = axios.create({
    baseURL: `${import.meta.env.VITE_UNIQUE_URL}`,
    withCredentials: true
});

const useAxiosSecure = () => {
    const {logOutUser} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosURL.interceptors.response.use(response => {
            return response;
        }, error=> {
            if(error.status === 401 || error.status == 403){
                logOutUser()
                .then(() => {
                    navigate("/log-in");
                })
            }

            return Promise.reject(error);
        })
    }, []);
    return axiosURL;
};

export default useAxiosSecure;