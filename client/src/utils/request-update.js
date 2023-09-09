import { url } from "./url";

export const updateRequest = async (payload) => {
  const result = await fetch(url, {
    method: "PUT", 
    body: JSON.stringify(payload)
  })

  return result.status;
}