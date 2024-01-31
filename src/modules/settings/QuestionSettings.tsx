import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { QuestionSettings } from '@/config/appSettings';
import { SETTINGS_QUESTION_TEXT_FIELD_CY } from '@/config/selectors';

const QuestionSettingsEdit: FC<{
  question: QuestionSettings;
  onChange: (newSetting: QuestionSettings) => void;
}> = ({ question, onChange }) => {
  const { t } = useTranslation();
  const { label: questionLabel } = question;
  return (
    <Stack spacing={1}>
      <Typography variant="h2">{t('SETTINGS.QUESTION.TITLE')}</Typography>
      <TextField
        inputProps={{
          'data-cy': SETTINGS_QUESTION_TEXT_FIELD_CY,
        }}
        value={questionLabel}
        onChange={(e) => onChange({ label: e.target.value })}
      />
    </Stack>
  );
};

export default QuestionSettingsEdit;
