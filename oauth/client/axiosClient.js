import axios from "axios";
import {
  AUTH_TOKEN,
  AUTH_TOKEN_DATA,
  AUTH_TOKEN_URL,
  CREATED_TIME,
  ECOMMERCE_CLIENT_ID,
  ECOMMERCE_CLIENT_SECRET,
  EXPIRES_IN,
} from "../../components/constants";

const axiosClient = axios.create({
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

const setTokenDataInLS = (authToken) => {
  const tokenData = {
    AUTH_TOKEN: authToken,
    CREATED_TIME: Math.floor(Date.now() / 1000),
  };

  localStorage.setItem(AUTH_TOKEN_DATA, JSON.stringify(tokenData));
};

const fetchTokenFromServer = async () => {
  console.log("OAuth2 Call invoked");
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
  const authToken = response.data.access_token;
  if (typeof window !== "undefined") {
    setTokenDataInLS(authToken);
  }
  return authToken;
};

const getOAuth2ClientToken = async () => {
  try {
    if (typeof window !== "undefined") {
      console.log("Front-end token call");
      const authTokenData = localStorage.getItem(AUTH_TOKEN_DATA);
      if (authTokenData != null || authTokenData != undefined) {
        const authTokenDataJson = JSON.parse(authTokenData);
        const currentTime = Math.floor(Date.now() / 1000);
        const isExpired =
          currentTime - authTokenDataJson[CREATED_TIME] > EXPIRES_IN;
        if (isExpired) {
          console.log("OAuth Token Is Expired");
          return await fetchTokenFromServer();
        } else {
          console.log("OAuth Token Is Valid");
          return authTokenDataJson[AUTH_TOKEN];
        }
      } else {
        console.log("OAuth Token Not Found");
        return await fetchTokenFromServer();
      }
    } else {
      console.log("Backend token call");
      return await fetchTokenFromServer();
    }
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
