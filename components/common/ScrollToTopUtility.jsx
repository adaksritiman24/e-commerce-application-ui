import { useEffect, useState } from "react";
import { Box, Fab, ThemeProvider, createTheme, keyframes } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { animated } from "@react-spring/web";
import { deepPurple } from "@mui/material/colors";

const AnimatedFabContainer = animated(Box);

const fabTheme = createTheme({
  palette: {
    primary: { main: deepPurple[300] },
    secondary: { main: deepPurple[700] },
  },
});

const ScrollToTopUtility = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  var fadeIn = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  `;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollPosition(window.scrollY);
    });
  }, []);

  return (
    scrollPosition > 500 && (
      <AnimatedFabContainer
        sx={{
          position: "fixed",
          display: "inline-block",
          bottom: 15,
          right: 15,
          zIndex: 1000,
          animation: `${fadeIn} 400ms ease-out`,
        }}
      >
        <ThemeProvider theme={fabTheme}>
          <Fab
            color="primary"
            aria-label="add"
            onClick={scrollToTop}
            size="small"
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </ThemeProvider>
      </AnimatedFabContainer>
    )
  );
};

export default ScrollToTopUtility;
