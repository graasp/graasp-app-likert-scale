export type AnswerKey = string;

export interface Answer {
  key: AnswerKey;
  label: string;
}

export const getNewAnswer = (answer?: Partial<Answer>): Answer => ({
  key: answer?.key ?? '0',
  label: answer?.label ?? '',
});
