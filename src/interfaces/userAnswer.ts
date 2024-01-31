import { AnswerKey } from './answers';

export enum UserAnswerStatus {
  Saved = 'saved',
  Submitted = 'submitted',
}

export type UserAnswer = {
  singleKey?: AnswerKey;
  multipleKey?: AnswerKey[];
  status?: UserAnswerStatus;
};
