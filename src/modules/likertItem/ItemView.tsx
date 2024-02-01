import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import BackupIcon from '@mui/icons-material/Backup';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import SendIcon from '@mui/icons-material/Send';
import WarningIcon from '@mui/icons-material/WarningRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import { UserAnswerStatus } from '@/interfaces/userAnswer';

import { useSettings } from '../context/SettingsContext';
import useUserAnswer from '../context/UserAnswersContext';
import LikertItem from './LikertItem';

const ItemView: FC = () => {
  const { t } = useTranslation('translations', { keyPrefix: 'MCQ' });
  const { likertItem, levels: levelsSettings, general } = useSettings();
  const { required } = general;
  const { userAnswer, deleteAnswer, submitAnswer, selectAnswer } =
    useUserAnswer();
  const { item, labelPosition } = likertItem;
  const { label, secondLabel } = item;
  const { levels, labels: levelsLabels } = levelsSettings;
  const showSubmitButton = useMemo(
    () => userAnswer?.status === UserAnswerStatus.Saved,
    [userAnswer],
  );
  const showResetButton = useMemo(
    () => typeof userAnswer !== 'undefined',
    [userAnswer],
  );
  return (
    <Stack spacing={1} justifyContent="space-between" direction="row">
      <Box flex={1}>
        {/* TODO: Adapt this part. */}
        {/* <Typography data-cy={MCQ_QUESTION_CY} sx={{ mb: 1 }} variant="h6">
          {question.label}
          {required && <sup>*</sup>}
        </Typography>
        {multipleAnswers ? (
          <MultipleAnswers userAnswer={userAnswer} answersSettings={answers} />
        ) : (
          <SingleAnswer userAnswer={userAnswer} answersSettings={answers} />
        )} */}
        <LikertItem
          label={label}
          secondLabel={secondLabel}
          labelPosition={labelPosition}
          levels={levels}
          levelsLabels={levelsLabels}
          required={required}
          userAnswer={userAnswer?.answer}
          onChange={selectAnswer}
        />
        <Stack sx={{ mt: 1 }} direction="row" spacing={1}>
          <Collapse in={showResetButton}>
            <Tooltip title={t('RESET_ANSWER')}>
              <Button
                disabled={!userAnswer}
                variant="outlined"
                onClick={() => deleteAnswer()}
                startIcon={<ReplayIcon />}
              >
                {t('RESET')}
              </Button>
            </Tooltip>
          </Collapse>
          <Collapse in={showSubmitButton}>
            <Button
              disabled={!userAnswer}
              variant="contained"
              onClick={() => submitAnswer()}
              startIcon={<SendIcon />}
            >
              {t('SUBMIT')}
            </Button>
          </Collapse>
        </Stack>
      </Box>
      <Stack width="10rem" direction="column" spacing={1} alignItems="center">
        {userAnswer?.status === UserAnswerStatus.Submitted && (
          <Tooltip title={t('SUBMIT_OK_TOOLTIP')}>
            <Chip
              color="info"
              icon={<CheckCircleOutlineIcon />}
              label={t('SUBMIT_OK_HELPER')}
              variant="outlined"
            />
          </Tooltip>
        )}
        {userAnswer?.status === UserAnswerStatus.Saved && (
          <Tooltip title={t('SAVED_TOOLTIP')}>
            <Chip
              icon={<BackupIcon />}
              label={t('SAVED_HELPER')}
              variant="outlined"
            />
          </Tooltip>
        )}
        {typeof userAnswer === 'undefined' && required && (
          <Tooltip title={t('REQUIRED_TOOLTIP')}>
            <Chip
              color="warning"
              icon={<WarningIcon />}
              label={t('REQUIRED_CHIP')}
              variant="outlined"
            />
          </Tooltip>
        )}
      </Stack>
    </Stack>
  );
};

export default ItemView;
