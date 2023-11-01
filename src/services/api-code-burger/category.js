import api from "./api-code-burger";

export const listCategories = async () => {
  const token = localStorage.getItem("token");
  return await api.get("index-category", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
