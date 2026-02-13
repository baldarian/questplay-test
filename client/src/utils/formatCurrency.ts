export const formatCurrency = (value: number, currencySymbol = "€") => {
  return `${currencySymbol}${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
