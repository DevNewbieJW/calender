export const getEvent = async (data) => {
  const response = await fetch(
    `http://localhost:5005/${data.year}-${data.month}-${data.year}`
  );

  return response.json();
};

const getEvents = async () => {
  const response = await fetch("http://localhost:5005");

  return response.json();
};

export default getEvents;
