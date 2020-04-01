module.exports = obj => {
  let newObj = {};
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (value) {
      newObj[key] = value;
    }
  });
  return newObj;
};
