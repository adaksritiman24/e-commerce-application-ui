import axios from "axios";
import HomePage from "../components/body/home/HomePage";
import { SPRING_BOOT_BASE_URL } from "../components/constants";
import Header from "../components/header/Header";

export default function Home({
  bannerPromotions,
  homePageDisplayedCategories,
}) {
  return (
    <>
      <Header />
      <HomePage
        bannerPromotions={bannerPromotions}
        homePageDisplayedCategories={homePageDisplayedCategories}
      />
    </>
  );
}

const getPromotionBannerData = async () => {
  const config = {
    method: "get",
    url: `${SPRING_BOOT_BASE_URL}/promotions/banner`,
    headers: {},
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return [];
  }
};

const getPromotionsCategoryData = async () => {
  var config = {
    method: "get",
    url: `${SPRING_BOOT_BASE_URL}/promotions/categories`,
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const getServerSideProps = async () => {
  const bannerPromotions = await getPromotionBannerData();
  const homePageDisplayedCategories = await getPromotionsCategoryData();

  return {
    props: {
      bannerPromotions,
      homePageDisplayedCategories,
    },
  };
};
