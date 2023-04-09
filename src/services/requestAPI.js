export const requestAPI = async () => {
  try {
    const api = await fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((data) => data);
    // console.log(api);

    return api;
  } catch (error) {
    return console.log(error);
  }
};
