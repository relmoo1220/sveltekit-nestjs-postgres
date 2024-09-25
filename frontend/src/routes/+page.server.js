import { API_URL } from "$env/static/private";

export const load = async ({ fetch }) => {
  console.log("Server Load Ran");

  try {
    const response = await fetch(`${API_URL}/upload/get-all`);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    // Parse the response as JSON
    const data = await response.json();
    console.log(data);

    return {
      entries: data, // Pass the data to the Svelte component
    };
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};
