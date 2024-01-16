import { useRouter } from "next/router";

const BASE_URL = "http://localhost:8080";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();

    if (response.status === 403) {
      const router = useRouter();
      router.push("/login");
    } else {
      throw new Error(error.message || "Something went wrong");
    }
  }
  return response.json();
};

export const getCall = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    return handleResponse(response);
  } catch (error) {
    console.error("Error in GET request:", error);
    throw error;
  }
};

export const getCallWithAuth = async (endpoint, token) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${endpoint}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
      { cache: "no-store" }
    );
    return handleResponse(response);
  } catch (error) {
    console.error("Error in GET request:", error);
    throw error;
  }
};

export const postCall = async (endpoint, data) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};

export const postCallWithAuth = async (endpoint, data, token) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
      { cache: "no-store" }
    );
    return handleResponse(response);
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};

export const putCallWithAuth = async (endpoint, data, token) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${endpoint}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
      { cache: "no-store" }
    );
    return handleResponse(response);
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};
