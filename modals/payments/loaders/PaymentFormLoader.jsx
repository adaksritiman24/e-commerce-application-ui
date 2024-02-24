import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ColorRing } from "react-loader-spinner";

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
        <ColorRing
          visible={true}
          height="70"
          width="70"
          colors={[grey[700], grey[400], grey[500], grey[600], grey[700]]}
        />
      </Box>
    </>
  );
};

export default PaymentFormLoader;