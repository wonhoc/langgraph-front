// src/lib/axios.ts
import axios from "axios";

const mainApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_MAIN}/api/main`,
    withCredentials: true, // 쿠키 인증 필요시 true
});

export default mainApi;
