import XLSX from 'xlsx';
import { getListFromFile } from './getListFromFile';

export const xlsFileUpload = files => {
  return new Promise((rs, rj) => {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = e => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const wordsList = getListFromFile(workbook);

      rs(wordsList);
    };

    reader.readAsArrayBuffer(file);
  });
};
