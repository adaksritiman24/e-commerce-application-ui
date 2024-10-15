import axios from "axios";
import {
  AUTH_TOKEN_URL,
  ECOMMERCE_CLIENT_ID,
  ECOMMERCE_CLIENT_SECRET,
} from "../../components/constants";

const axiosClient = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const getOAuth2ClientToken = async () => {
  console.log("OAuth2 Call invoked");
  try {
    const tokenUrl = AUTH_TOKEN_URL;
    const data = new URLSearchParams();
    data.append("grant_type", "client_credentials");
    data.append("client_id", ECOMMERCE_CLIENT_ID);
    data.append("client_secret", ECOMMERCE_CLIENT_SECRET);
    const response = await axios.post(tokenUrl, data.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching the OAuth2 token:", error);
    throw error;
  }
};

//Reuest Interceptor
axiosClient.interceptors.request.use(async (axiosRequestConfig) => {
  const authToken = await getOAuth2ClientToken();
  axiosRequestConfig.headers.Authorization = `Bearer ${authToken}`;
  return axiosRequestConfig;
});

export default axiosClient;
