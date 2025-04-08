// src/lib/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // .env에서 API 주소 불러오기
  withCredentials: true, // 쿠키 인증 필요시 true
});

export default api;