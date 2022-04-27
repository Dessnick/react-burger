const checkResponseResult = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Error status: ${res.status}`));
};

export default checkResponseResult;
