const createInitialWord = (id: number, ru: string, en:string) => ({
  examples: {
    ru: '',
    en: ''
  },
  association: '',
  transcription: '',
  bookmarks: false,
  en,
  ru,
  id,
  repetition: 2
});

export const wordsList = {
  '1': createInitialWord(1, 'удобный', 'convenient'),
  '2': createInitialWord(2, 'неловкий', 'awkward'),
  '3': createInitialWord(3, 'стирка', 'laundry'),
  '4': createInitialWord(4, 'довольный', 'pleased')
}