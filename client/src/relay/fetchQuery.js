/**
 * Send a post request to the API.
 * @param text Request query.
 * @param variables Request variables.
 * @returns {Promise<any>}
 */
async function fetchGraphQL(text, variables) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });
  return await response.json();
}

export default fetchGraphQL;
