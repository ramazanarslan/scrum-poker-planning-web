const API_PATH = "http://localhost:2222";
export const INTERVAL = 2 * 1000;
export const POST = async (endpoint, body) => {
  try {
    const res = await fetch(API_PATH + endpoint, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return false;
  }
};

export const GET = async (endpoint) => {
  try {
    const res = await fetch(API_PATH + endpoint);
    const data = await res.json();
    return data;
  } catch (error) {
    return false;
  }
};
