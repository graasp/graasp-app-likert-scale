import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { LevelsSettings } from '@/config/appSettings';
import { MAX_NUMBER_OF_LEVELS } from '@/config/constants';
import { SETTINGS_LEVELS_NUMERIC_FIELD_CY } from '@/config/selectors';
import { validateNumberOfLevels } from '@/utils/settingsValidation';

const LevelsSettingsEdit: FC<{
  levels: LevelsSettings;
  onChange: (newSetting: LevelsSettings) => void;
}> = ({ levels, onChange }) => {
  const { t } = useTranslation('translations', {
    keyPrefix: 'SETTINGS.LEVELS',
  });
  const { levels: numberOfLevels, labels } = levels;
  const [isValid, setIsValid] = useState(true);

  const mapLabels = Array.from(Array(numberOfLevels).keys()).map(
    (x) => labels[x] || '',
  );
  // eslint-disable-next-line no-console
  console.log(mapLabels);
  const handleChange = (newValue: string): void => {
    const isEmpty = newValue.length === 0;
    if (validateNumberOfLevels(newValue) || isEmpty) {
      setIsValid(true);
      const newLevels = isEmpty ? 2 : parseInt(newValue, 10);
      onChange({
        levels: newLevels,
        labels,
      });
    } else {
      setIsValid(false);
    }
  };
  const handleLabelChange = (newLabel: string, index: number): void => {
    labels[index] = newLabel;
    onChange({
      levels: numberOfLevels,
      labels,
    });
  };
  return (
    <Stack spacing={3}>
      <Typography variant="h2">{t('TITLE')}</Typography>
      <TextField
        error={!isValid}
        inputProps={{
          'data-cy': SETTINGS_LEVELS_NUMERIC_FIELD_CY,
        }}
        defaultValue={numberOfLevels}
        onChange={(e) => handleChange(e.target.value)}
        label={t('NBR_LEVELS_LABEL')}
        helperText={
          !isValid &&
          t('HELPER_ERROR_NBR_LEVELS', {
            maxNumberLevels: MAX_NUMBER_OF_LEVELS,
          })
        }
      />
      <Stack direction="column" spacing={2} p="16pt">
        <Typography variant="body1">{t('LABELS')}</Typography>
        {mapLabels.map((label, index) => (
          <TextField
            key={index}
            label={t('LABEL_LEVEL_N', { n: index })}
            value={label}
            onChange={(e) => handleLabelChange(e.target.value, index)}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default LevelsSettingsEdit;
