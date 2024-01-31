import { Answer } from '@/interfaces/answers';

export type QuestionSettings = {
  label: string;
};

export type AnswersSettings = {
  answers: Array<Answer>;
  multipleAnswers: boolean;
};

export type GeneralSettings = {
  required: boolean;
};
