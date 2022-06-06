const isImageCheck = (url: string) => {
  return /\.(jpg|jpeg|png)$/.test(url);
};

export default isImageCheck;
