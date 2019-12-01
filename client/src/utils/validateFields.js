export const validateFields = fields => {
  let isValidate = true;

  Object.keys(fields).forEach(item => {
    if (fields[item].length === 0) {
      isValidate = false;
    }
  });

  return isValidate;
};
