export const getFormattedPrice = (amount)=> amount.toLocaleString("en-US", {style:"currency", currency:"INR"});
