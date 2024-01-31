import { AppData, AppDataVisibility } from '@graasp/sdk';

import { UserAnswer as UserAnswerType } from '@/interfaces/userAnswer';

export enum AppDataType {
  UserAnswer = 'user-answer',
}

export type UserAnswerAppData = AppData & {
  type: AppDataType.UserAnswer;
  data: UserAnswerType;
  visibility: AppDataVisibility.Member;
};

export const getDefaultUserAnswerAppData = (
  userAnswer: UserAnswerType,
): Pick<UserAnswerAppData, 'data' | 'type' | 'visibility'> => ({
  type: AppDataType.UserAnswer,
  data: userAnswer,
  visibility: AppDataVisibility.Member,
});
