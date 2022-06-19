const ROOT_URL = "http://localhost:3000";

export const getBasePostConfig = () => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "",
    },
    body: "",
  };
};

export const getAuthorization = () => {
  return localStorage.getItem("_u")
    ? `${JSON.parse(localStorage.getItem("_u")).u}`
    : "";
};

export const makeAuthorizedPostRequest = async (url, body) => {
  try {
    const req = getBasePostConfig();
    req.headers.authorization = getAuthorization();
    req.body = JSON.stringify(body);
    const res = await fetch(ROOT_URL + url, req);
    console.log(res);
    return await res.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const makePostRequest = async (url, body) => {};
