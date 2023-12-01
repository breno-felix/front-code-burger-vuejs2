import api from "./api-code-burger";

export const newOrder = async (order) => {
  const token = localStorage.getItem("token");
  return await api.post("new-order", order, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
