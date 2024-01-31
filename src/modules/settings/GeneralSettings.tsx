import { FC, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';

import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

import { GeneralSettings } from '@/config/appSettings';

const GeneralSettingsEdit: FC<{
  general: GeneralSettings;
  onChange: (newSetting: GeneralSettings) => void;
}> = ({ general, onChange }) => {
  const { t } = useTranslation('translations', {
    keyPrefix: 'SETTINGS.GENERAL',
  });

  const { required } = general;

  const handleRequiredChange = (
    _event: SyntheticEvent,
    checked: boolean,
  ): void => {
    onChange({
      ...general,
      required: checked,
    });
  };
  return (
    <Stack spacing={1}>
      <Typography variant="h2">{t('TITLE')}</Typography>
      <FormControlLabel
        control={<Switch />}
        label={t('REQUIRED_SWITCH_LABEL')}
        checked={required}
        onChange={handleRequiredChange}
      />
    </Stack>
  );
};

export default GeneralSettingsEdit;
