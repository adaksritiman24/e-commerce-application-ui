import { Box, Typography } from "@mui/material";
import { grey, indigo } from "@mui/material/colors";
import classes from "./HomePage.module.css";
import React from "react";
import { IMAGE_SERVER_BASE_URL } from "../../constants";
import { useState } from "react";
import { useEffect } from "react";

const rotateNumbers = (currentNumber, limit) => {
  currentNumber++;
  if (currentNumber >= limit) return 0;
  else return currentNumber;
};

const Banner = ({ bannerPromotions }) => {
  const animationSpeed = 8;
  const numberOfFrames = bannerPromotions.length;
  const [divLocation, setDivLocation] = useState(0);

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
        m={{
          lg: "30px",
          md: "15px",
          xs: "10px",
        }}
        sx={{
          height: {
            md: "450px",
            xs: "250px",
          },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            transition: "2s ease-out",
            transform: {
              md: `translateY(${-1 * 450 * divLocation}px)`,
              xs: `translateY(${-1 * 250 * divLocation}px)`,
            },
          }}
        >
          {bannerPromotions.map((bannerPromotion, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                position: "relative",
                height: {
                  md: "450px",
                  xs: "250px",
                },
                overflow: "hidden",
              }}
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
                  >
                    {bannerPromotion.buttonText}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Banner;
