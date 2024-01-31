import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import isEqual from 'lodash.isequal';

import {
  AnswersSettings,
  GeneralSettings,
  QuestionSettings,
} from '@/config/appSettings';
import { SETTINGS_SAVE_BTN_CY, SETTINGS_VIEW_CY } from '@/config/selectors';

import { useSettings } from '../context/SettingsContext';
import AnswersSettingsEdit from './AnswersSettings';
import GeneralSettingsEdit from './GeneralSettings';
import QuestionSettingsEdit from './QuestionSettings';

const SettingsView: FC = () => {
  const { t } = useTranslation();
  const {
    question: questionSavedState,
    answers: answersSavedState,
    general: generalSavedState,
    saveSettings,
  } = useSettings();

  const [question, setQuestion] =
    useState<QuestionSettings>(questionSavedState);
  const [answers, setAnswers] = useState<AnswersSettings>(answersSavedState);
  const [general, setGeneral] = useState<GeneralSettings>(generalSavedState);

  const saveAllSettings = (): void => {
    saveSettings('question', question);
    saveSettings('answers', {
      ...answers,
      answers: answers.answers.filter((answer) => {
        if (answer?.key.length > 0) {
          return true;
        }
        return false;
      }),
    });
    saveSettings('general', general);
  };

  useEffect(() => setQuestion(questionSavedState), [questionSavedState]);
  useEffect(() => {
    setAnswers(answersSavedState);
  }, [answersSavedState]);
  useEffect(() => setGeneral(generalSavedState), [generalSavedState]);

  const disableSave = useMemo(() => {
    if (
      isEqual(questionSavedState, question) &&
      isEqual(answersSavedState, answers) &&
      isEqual(general, generalSavedState)
    ) {
      return true;
    }
    return false;
  }, [
    answers,
    answersSavedState,
    general,
    generalSavedState,
    question,
    questionSavedState,
  ]);

  return (
    <Stack data-cy={SETTINGS_VIEW_CY} spacing={2}>
      <Typography variant="h1">{t('SETTINGS.TITLE')}</Typography>
      <GeneralSettingsEdit general={general} onChange={setGeneral} />
      <QuestionSettingsEdit
        question={question}
        onChange={(newSetting: QuestionSettings) => {
          setQuestion(newSetting);
        }}
      />
      <AnswersSettingsEdit
        answers={answers}
        onChange={(newSetting: AnswersSettings) => {
          setAnswers({ ...newSetting });
        }}
      />
      <Box>
        <Button
          startIcon={<SaveIcon />}
          variant="contained"
          onClick={saveAllSettings}
          disabled={disableSave}
          data-cy={SETTINGS_SAVE_BTN_CY}
        >
          {t('SETTINGS.SAVE_BTN')}
        </Button>
      </Box>
    </Stack>
  );
};

export default SettingsView;
