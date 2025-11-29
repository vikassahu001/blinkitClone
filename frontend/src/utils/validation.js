import { isValidPhoneNumber } from "libphonenumber-js";

export const validateIndianMobile = (number) => {
  if (!number) return false;
  // 'IN' ensures it checks for valid Indian carrier prefixes (6,7,8,9 etc)
  return isValidPhoneNumber(number, "IN");
};
