import { API_URL } from "$env/static/private";

export const load = async ({ fetch, params }) => {
  console.log(params);

  const fetchData = async (id) => {
    const response = await fetch(`${API_URL}/upload/get-one/${id}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch post data");
      return null; // Ensure it returns a value even if there's an error
    }
  };

  const post = await fetchData(params.id); // Await the data

  return {
    post: post,
  };
};
