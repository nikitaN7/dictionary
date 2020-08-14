const wordsRepetitionTypes: {
  typeId: number;
  title: string;
  name: string;
  lang: 'en' | 'ru';
  speakers: boolean;
}[] = [
  {
    typeId: 1,
    title: 'Choose the right word variant',
    name: 'variants',
    lang: 'en',
    speakers: false
  },
  {
    typeId: 2,
    title: 'Choose the right word variant',
    name: 'variants',
    lang: 'ru',
    speakers: true
  },
  {
    typeId: 3,
    title: 'Enter the word translation',
    name: 'jumbling',
    lang: 'en',
    speakers: false
  },
  {
    typeId: 4,
    title: 'Write the heard word',
    name: 'writing',
    lang: 'en',
    speakers: true
  }
];

export default wordsRepetitionTypes;
