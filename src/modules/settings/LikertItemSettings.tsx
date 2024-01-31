import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { LabelPosition, LikertItemSettings } from '@/config/appSettings';

const LikertItemSettingsEdit: FC<{
  likertItem: LikertItemSettings;
  onChange: (newSetting: LikertItemSettings) => void;
}> = ({ likertItem, onChange }) => {
  const { t } = useTranslation('translations', {
    keyPrefix: 'SETTINGS.LIKERT_ITEM',
  });

  const { item, labelPosition } = likertItem;
  const { label, secondLabel, key } = item;

  const handleLabelChange = (newLabel: string): void => {
    onChange({
      ...likertItem,
      item: {
        ...item,
        label: newLabel,
      },
    });
  };
  const handleSecondLabelChange = (newLabel: string): void => {
    onChange({
      ...likertItem,
      item: {
        ...item,
        secondLabel: newLabel,
      },
    });
  };
  const handleKeyChange = (newKey: string): void => {
    onChange({
      ...likertItem,
      item: {
        ...item,
        key: newKey,
      },
    });
  };

  return (
    <Stack spacing={1}>
      <Typography variant="h2">{t('TITLE')}</Typography>
      <Stack direction="row">
        <TextField
          sx={{ flexGrow: 1 }}
          value={key}
          onChange={(e) => handleKeyChange(e.target.value)}
          label={t('KEY_LABEL')}
          helperText={t('KEY_HELPER')}
        />
        <TextField
          sx={{ flexGrow: 2 }}
          value={label}
          onChange={(e) => handleLabelChange(e.target.value)}
          label={t('LABEL_LABEL')}
          helperText={t('KEY_HELPER')}
        />
        {labelPosition === LabelPosition.Ends && (
          <TextField
            sx={{ flexGrow: 2 }}
            value={secondLabel}
            onChange={(e) => handleSecondLabelChange(e.target.value)}
            label={t('SECOND_LABEL_LABEL')}
            helperText={t('KEY_HELPER')}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default LikertItemSettingsEdit;
