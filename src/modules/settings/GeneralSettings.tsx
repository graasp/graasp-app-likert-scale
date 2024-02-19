import { FC, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';

import InfoIcon from '@mui/icons-material/InfoRounded';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { GeneralSettings } from '@/config/appSettings';

const GeneralSettingsEdit: FC<{
  general: GeneralSettings;
  onChange: (newSetting: GeneralSettings) => void;
}> = ({ general, onChange }) => {
  const { t } = useTranslation('translations', {
    keyPrefix: 'SETTINGS.GENERAL',
  });

  const { required, autosubmit } = general;

  const handleRequiredChange = (
    _event: SyntheticEvent,
    checked: boolean,
  ): void => {
    onChange({
      ...general,
      required: checked,
    });
  };

  const handleAutosubmitChange = (
    _event: SyntheticEvent,
    checked: boolean,
  ): void => {
    onChange({
      ...general,
      autosubmit: checked,
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
      <FormControlLabel
        control={<Switch />}
        label={
          <>
            {t('AUTOSUBMIT_SWITCH_LABEL')}
            {/* TODO: Improve this */}
            <Tooltip title={t('AUTOSUBMIT_MORE_INFO')}>
              <InfoIcon />
            </Tooltip>
          </>
        }
        checked={autosubmit}
        onChange={handleAutosubmitChange}
      />
    </Stack>
  );
};

export default GeneralSettingsEdit;
