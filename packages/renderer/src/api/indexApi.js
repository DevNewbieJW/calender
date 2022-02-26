const defaultApi = "http://localhost:5000/notes";

export const getAllFiles = async () => {
  const response = await fetch(`${defaultApi}/`);

  if (!response.ok) {
    throw new Error("something went wrong");
  }

  return response.json();
};

export const getFileById = async (id) => {
  const response = await fetch(`${defaultApi}/${id}`);

  if (!response.ok) {
    throw new Error("something went wrong");
  }

  return response.json();
};

export const getFileContentById = async (id) => {
  const response = await fetch(`${defaultApi}/${id}/content`);

  if (!response.ok) {
    throw new Error("something went wrong");
  }

  return response.json();
};

export const postFileContent = async (data) => {
  const response = await fetch(`${defaultApi}/${data.id}/write`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    throw new Error("something went wrong");
  }

  return response.json();
};

export const sendSelectedFolderToServer = async (data) => {
  const response = await fetch(`${defaultApi}/folderPath/write`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    throw new Error("something went wrong");
  }

  return response.json();
};
