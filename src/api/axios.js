import axios from "axios";

const instance = axios.create({
  baseURL: "/api", // 필요에 맞게 수정
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

// 요청/응답 인터셉터 추가 가능
instance.interceptors.request.use(
  (config) => {
    // 토큰 있으면 헤더에 추가
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
