import { blue, deepOrange, deepPurple, green, orange, pink, purple, red } from "@mui/material/colors";

export const getFormattedPrice = (amount) =>
  amount.toLocaleString("en-US", { style: "currency", currency: "INR" });
export const calculateTotalDiscountPercentage = (
  normalPrice,
  discountedPrice
) => {
  return Math.round(((normalPrice - discountedPrice) / normalPrice) * 100);
};

export const getColorCoding =(firstName) => {
  const strlen = firstName.length;
  const colors = [red[700], purple[700], orange[700], blue[700], green[700], deepOrange[700], deepPurple[700],  pink[700]];

  const index = strlen % colors.length;
  return colors.at(index);
}