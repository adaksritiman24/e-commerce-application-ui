import { Box, Typography } from "@mui/material";
import { grey, indigo } from "@mui/material/colors";
import classes from "./HomePage.module.css";
import React from "react";
import { IMAGE_SERVER_BASE_URL } from "../../constants";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import CarousalButton from "./CarousalButton";

const rotateNumbers = (currentNumber, limit) => {
  currentNumber++;
  if (currentNumber >= limit) return 0;
  else return currentNumber;
};

const Banner = ({ bannerPromotions }) => {
  const animationSpeed = 8;
  const numberOfFrames = bannerPromotions.length;
  const [divLocation, setDivLocation] = useState(0);

  const router = useRouter();

  const handleBannerClick = (url)=>{
    router.push(url);
  }

  useEffect(() => {
    const interval = setInterval(
      () => setDivLocation(rotateNumbers(divLocation, numberOfFrames)),
      animationSpeed * 1000
    );
    return () => {
      clearInterval(interval);
    };
  }, [divLocation]);

  return (
    <>
      <Box
        mt={1}
        sx={{
          height: {
            md: "500px",
            xs: "250px",
          },
          background: "black",
          position : "relative",
          overflow : "hidden",
        }}
      >
        <Box>
          {bannerPromotions.map((bannerPromotion, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                position: "absolute",
                top :0,
                height: {
                  md: "500px",
                  xs: "250px",
                },
                overflow: "hidden",
                transition : "1s",
              }}
              className={index == divLocation ? classes.fadeIn : classes.visibilityNone}
            >
              <img
                src={`${IMAGE_SERVER_BASE_URL}${bannerPromotion.image}`}
                alt="promotions"
                width="100%"
                height="100%"
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "0",
                  width: "100%",
                  height: "100%",
                  color: grey["A1000"],
                  display: "flex",
                  alignItems: "center",
                  background:
                    "linear-gradient(90deg, rgba(25,25,25,0.9) 33%, transparent)",
                }}
              >
                <Box
                  sx={{
                    px: {
                      md: "40px",
                      lg: "60px",
                      xs: "20px",
                    },
                    color: grey[200],
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: {
                        lg: "75px",
                        md: "58px",
                        sm: "44px",
                        xs: "34px",
                      },
                    }}
                    className={classes.bannerHeading}
                  >
                    {bannerPromotion.tagLine}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "arial",
                      fontWeight: "200",
                      fontSize: {
                        lg: "50px",
                        md: "30px",
                        sm: "24px",
                        xs: "17px",
                      },
                    }}
                    className={classes.bannerSubHeading}
                  >
                    {bannerPromotion.subHeading}
                  </Typography>
                  <Typography
                    display="inline-block"
                    my={3}
                    sx={{
                      fontFamily: "arial",
                      fontSize: {
                        lg: "40px",
                        md: "30px",
                        xs: "20px",
                      },
                      cursor: "pointer",
                      color: indigo[200],
                      borderBottom: `4px solid transparent`,
                      transition: "0.4s",
                      "&:hover": {
                        color: indigo[300],
                        borderBottom: `4px solid ${indigo[300]}`,
                      },
                    }}
                    size="large"
                    onClick = {()=>handleBannerClick(bannerPromotion.url)}
                  >
                    {bannerPromotion.buttonText}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        <CarousalButton numberOfCards={bannerPromotions.length} selectedPosition={divLocation}/>
      </Box>
    </>
  );
};

export default Banner;
