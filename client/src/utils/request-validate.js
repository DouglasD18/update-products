import { url } from "./url";

export const validateRequest = async (payload) => {
  const result = await fetch(url, {
    method: "POST", 
    body: JSON.stringify(payload)
  })

  return result.json();
}
