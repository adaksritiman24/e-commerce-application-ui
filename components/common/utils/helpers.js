import { keyframes } from "@emotion/react";
import { blue, deepOrange, deepPurple, green, orange, pink, purple, red } from "@mui/material/colors";

export const getFormattedPrice = (amount) =>
  amount.toLocaleString("en-US", { style: "currency", currency: "INR" });
export const calculateTotalDiscountPercentage = (
  normalPrice,
  discountedPrice
) => {
  return Math.round(((normalPrice - discountedPrice) / normalPrice) * 100);
};

export const getColorCoding = (firstName) => {
  const strlen = firstName.length;
  const colors = [red[700], purple[700], orange[700], blue[700], green[700], deepOrange[700], deepPurple[700], pink[700]];

  const index = strlen % colors.length;
  return colors.at(index);
}

export const processNumber = (numb, maxlength) => {
  if (!parseInt(numb)) return "";
  let processedNumber = new String(parseInt(numb));
  if (processedNumber.length > maxlength) {
    return processedNumber.slice(0, maxlength);
  }
  return processedNumber;
};

const calculateCardEmptySlots = (element, molecule, wildCardLength) => {
  return (Math.floor(element / molecule) - 1) * wildCardLength;
};


export const handleforDigitPressForCardNumber = (
  updatedCard,
  wildCard,
  totalAllowedLength,
  clubbingSize
) => {
  let num = updatedCard.replaceAll(wildCard, ""); //replace the wildcard characters with empty strings

  if (num.length >= totalAllowedLength) {
    return updatedCard.slice(
      0,
      totalAllowedLength +
      calculateCardEmptySlots(
        totalAllowedLength,
        clubbingSize,
        wildCard.length
      )
    );
  }
  if (num.length > 0 && num.length % clubbingSize === 0) {
    return updatedCard + wildCard;
  }
  return updatedCard;
};

export const isNumericKey = (key) => {
  return key == "1" || key == "2" || key == "3" ||
    key == "4" || key == "5" || key == "6" ||
    key == "7" || key == "8" || key == "9" ||
    key == "0";
}

export const isKeyAllowedForNumericField = (key) => {
  return (
    key == "1" || key == "2" || key == "3" ||
    key == "4" || key == "5" || key == "6" ||
    key == "7" || key == "8" || key == "9" ||
    key == "0" || key === "Backspace"
  );
};

export const expansion = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
