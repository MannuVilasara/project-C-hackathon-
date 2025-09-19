import { customAlphabet } from "nanoid";

const nanoidNum = customAlphabet("0123456789", 6);

export const getOtp = () => {
  return nanoidNum();
};
