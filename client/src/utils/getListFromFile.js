export const getListFromFile = workbook => {
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const ref = worksheet['!ref'].split(':')[1];
  const lastCellNum = ref.match(/\d/g).join('');
  const wordsList = [];

  for (let i = 2; i <= lastCellNum; i++) {
    const enCell = worksheet[`A${i}`];
    const ruCell = worksheet[`B${i}`];

    if (typeof enCell !== 'undefined' && typeof ruCell !== 'undefined') {
      const word = {
        ru: ruCell ? ruCell.w : '',
        en: enCell ? enCell.w : '',
        bookmarks: false,
        id: i - 1
      };

      wordsList.push(word);
    }
  }

  return wordsList;
};
