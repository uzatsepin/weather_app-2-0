import axios from "axios";

export const getCitiesByInput = async (input) => {
  try {
    const response = await axios({
      method: "GET",
      url: `https://api.api-ninjas.com/v1/city?name=${input}&limit=10`,
      headers: { "X-Api-Key": `${process.env.VUE_APP_CITY}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    return error;
  }
};
