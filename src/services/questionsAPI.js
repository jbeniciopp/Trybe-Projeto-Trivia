export const questionsAPI = async (token) => {
  try {
    const api = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((data) => data);
    // console.log(api);

    return api;
  } catch (error) {
    return console.log(error);
  }
};
