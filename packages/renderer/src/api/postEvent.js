const postEvent = (data) => {
  const response = fetch("http://localhost:5005/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("something went wrong");
  }

  return response.json();
};

export default postEvent;
