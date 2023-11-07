import api from "./api-code-burger";

export const listProducts = async () => {
  const token = localStorage.getItem("token");
  return await api.get("index-product", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
