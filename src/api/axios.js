// react-chapter04 source 참고
import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: import.meta.env.VITE_THEMOVIE_ACCESS_TOKEN
    },
    params: {
        api_key: import.meta.env.VITE_THEMOVIE_API_KEY,
        language: "ko-KR",
    }
});

export default instance;