export const fileValidate = (files, dispatch) => {
  const allowedExtension = /(\.xlsx)$/i;
  const fileName = files[0].name;

  if (files.length > 1) {
    dispatch({ type: 'error', payload: 'Only 1 file must be load' });

    return false;
  }

  if (!allowedExtension.exec(fileName)) {
    dispatch({ type: 'error', payload: 'Only xlsx file is allowed' });

    return false;
  }

  return true;
};
