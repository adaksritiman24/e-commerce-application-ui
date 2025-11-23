import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ProgressBar } from "react-loader-spinner";

const PaymentFormLoader = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100px",
          alignItems: "center",
        }}
      >
        <ProgressBar
          visible={true}
          height="70"
          width="70"
          borderColor={grey[900]}
          barColor={grey[700]}
        />
      </Box>
    </>
  );
};

export default PaymentFormLoader;
