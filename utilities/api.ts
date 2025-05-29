import axios from 'axios';

export const openai = axios.create({
  baseURL: 'https://api.openai.com/v1/chat/completions',
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.EXPO_PUBLIC_OPENAI_KEY}`,
  },
})
openai.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log(error.response)
    return Promise.reject(error);
  }
);

