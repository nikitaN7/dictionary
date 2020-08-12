export interface IQueue {
  id: number | string;
  type: number | string;
}

export interface IRepetitionType {
  typeId: number | string;
  title: string;
  name: string;
  lang: string;
  speakers: boolean;
}

export interface IWordExamples {
  en?: string;
  ru?: string;
}
