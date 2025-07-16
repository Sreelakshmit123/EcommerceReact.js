import { commonAPI } from "./commonAPI";
import { SERVER_URL } from "./serverUrl";

//send OTP
export const sendVerificationAPI = async(reqBody)=>{
    return await commonAPI("POST", `${SERVER_URL}/user/send-verification/` , reqBody);
}

//verify - token
export const verifyTokenAPI =  async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/user/verify-token`,reqBody)
}

// Register User
export const registerAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_URL}/user/register`, reqBody);
};