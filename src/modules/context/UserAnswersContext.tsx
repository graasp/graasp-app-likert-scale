import {
  FC,
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useLocalContext } from '@graasp/apps-query-client';
import { PermissionLevel, PermissionLevelCompare } from '@graasp/sdk';

import {
  AppDataType,
  UserAnswerAppData,
  getDefaultUserAnswerAppData,
} from '@/config/appData';
import { hooks, mutations } from '@/config/queryClient';
import { UserAnswer, UserAnswerStatus } from '@/interfaces/userAnswer';

type UserAnswersContextType = {
  userAnswer?: UserAnswer;
  selectAnswer: (userAnswer: UserAnswer) => void;
  submitAnswer: () => void;
  deleteAnswer: (id?: UserAnswerAppData['id']) => void;
  allAnswersAppData?: UserAnswerAppData[];
};

const defaultContextValue: UserAnswersContextType = {
  selectAnswer: () => null,
  submitAnswer: () => null,
  deleteAnswer: () => null,
};

const UserAnswersContext =
  createContext<UserAnswersContextType>(defaultContextValue);

export const UserAnswersProvider: FC<{
  children: ReactElement | ReactElement[];
}> = ({ children }) => {
  const { data, isSuccess } = hooks.useAppData<UserAnswer>({
    type: AppDataType.UserAnswer,
  });
  const [userAnswerAppData, setUserAnswerAppData] =
    useState<UserAnswerAppData>();
  const [allAnswersAppData, setAllAnswersAppData] =
    useState<UserAnswerAppData[]>();
  const { mutate: postAppData } = mutations.usePostAppData();
  const { mutate: patchAppData } = mutations.usePatchAppData();
  const { mutate: deleteAppData } = mutations.useDeleteAppData();
  const { permission } = useLocalContext();

  const isAdmin = useMemo(
    () => PermissionLevelCompare.gte(permission, PermissionLevel.Admin),
    [permission],
  );

  const { memberId } = useLocalContext();

  useEffect(() => {
    if (isSuccess) {
      const allAns = data.filter(
        (d) => d.type === AppDataType.UserAnswer,
      ) as UserAnswerAppData[];
      setAllAnswersAppData(allAns);
      setUserAnswerAppData(allAns.find((d) => d.member.id === memberId));
    }
  }, [isSuccess, data, memberId]);

  const selectAnswer = useMemo(
    () =>
      (userAnswer: UserAnswer): void => {
        if (userAnswer.multipleKey?.length === 0) {
          throw new Error('You cannot select an empty answer.');
        }
        const payloadData = {
          ...userAnswer,
          status: UserAnswerStatus.Saved,
        };
        if (userAnswerAppData?.id) {
          patchAppData({
            ...userAnswerAppData,
            data: payloadData,
          });
        } else {
          postAppData(getDefaultUserAnswerAppData(payloadData));
        }
      },
    [patchAppData, postAppData, userAnswerAppData],
  );

  const submitAnswer = useMemo(
    () => (): void => {
      if (userAnswerAppData?.id) {
        const payloadData = {
          ...userAnswerAppData.data,
          status: UserAnswerStatus.Submitted,
        };
        patchAppData({
          ...userAnswerAppData,
          data: payloadData,
        });
      } else {
        throw new Error('No answer to submit.');
      }
    },
    [patchAppData, userAnswerAppData],
  );

  const deleteAnswer = useMemo(
    () =>
      (id?: UserAnswerAppData['id']): void => {
        if (id) {
          deleteAppData({ id });
        } else if (userAnswerAppData) {
          deleteAppData({ id: userAnswerAppData?.id });
        }
      },
    [deleteAppData, userAnswerAppData],
  );
  const contextValue = useMemo(
    () => ({
      userAnswer: userAnswerAppData?.data,
      selectAnswer,
      submitAnswer,
      allAnswersAppData: isAdmin ? allAnswersAppData : undefined,
      deleteAnswer,
    }),
    [
      allAnswersAppData,
      deleteAnswer,
      isAdmin,
      selectAnswer,
      submitAnswer,
      userAnswerAppData?.data,
    ],
  );

  return (
    <UserAnswersContext.Provider value={contextValue}>
      {children}
    </UserAnswersContext.Provider>
  );
};

const useUserAnswers = (): UserAnswersContextType =>
  useContext(UserAnswersContext);

export default useUserAnswers;
