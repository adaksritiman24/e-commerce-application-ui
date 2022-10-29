export const getFormattedPrice = (amount) =>
  amount.toLocaleString("en-US", { style: "currency", currency: "INR" });
export const calculateTotalDiscountPercentage = (
  normalPrice,
  discountedPrice
) => {
  return Math.round(((normalPrice - discountedPrice) / normalPrice) * 100);
};
