import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import ReplayIcon from '@mui/icons-material/Replay';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import { RequiredChip, SavedChip, SubmittedChip } from '@graasp/ui/apps';

import {
  REQUIRED_CHIP_CY,
  RESET_BTN_CY,
  SAVED_CHIP_CY,
  SUBMITTED_CHIP_CY,
  SUBMIT_BTN_CY,
} from '@/config/selectors';
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
      </Box>
      <Stack width="10rem" direction="column" spacing={1} alignItems="center">
        {userAnswer?.status === UserAnswerStatus.Submitted && (
          <SubmittedChip
            label={t('SUBMIT_OK_HELPER')}
            tooltip={t('SUBMIT_OK_TOOLTIP')}
            dataCy={SUBMITTED_CHIP_CY}
          />
        )}
        {userAnswer?.status === UserAnswerStatus.Saved && (
          <SavedChip
            label={t('SAVED_HELPER')}
            tooltip={t('SAVED_TOOLTIP')}
            dataCy={SAVED_CHIP_CY}
          />
        )}
        {typeof userAnswer === 'undefined' && required && (
          <RequiredChip
            label={t('REQUIRED_CHIP')}
            tooltip={t('REQUIRED_TOOLTIP')}
            dataCy={REQUIRED_CHIP_CY}
          />
        )}
        <Stack sx={{ mt: 1 }} direction="column" spacing={1}>
          <Collapse orientation="horizontal" in={showResetButton}>
            <Tooltip title={t('RESET_ANSWER')}>
              <Button
                disabled={!userAnswer}
                variant="outlined"
                onClick={() => deleteAnswer()}
                startIcon={<ReplayIcon />}
                data-cy={RESET_BTN_CY}
              >
                {t('RESET')}
              </Button>
            </Tooltip>
          </Collapse>
          <Collapse orientation="horizontal" in={showSubmitButton}>
            <Button
              disabled={!userAnswer}
              variant="contained"
              onClick={() => submitAnswer()}
              startIcon={<SendIcon />}
              data-cy={SUBMIT_BTN_CY}
            >
              {t('SUBMIT')}
            </Button>
          </Collapse>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ItemView;
