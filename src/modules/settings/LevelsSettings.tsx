import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { LevelsSettings } from '@/config/appSettings';
import { SETTINGS_LEVELS_NUMERIC_FIELD_CY } from '@/config/selectors';
import { validateNumberOfLevels } from '@/utils/settingsValidation';

const LevelsSettingsEdit: FC<{
  levels: LevelsSettings;
  onChange: (newSetting: LevelsSettings) => void;
}> = ({ levels, onChange }) => {
  const { t } = useTranslation();
  const { levels: numberOfLevels, labels } = levels;
  const [isValid, setIsValid] = useState(true);

  const mapLabels = new Map(
    Array.from(Array(levels).keys()).map((x) => [x, labels.get(x) || '']),
  );

  const handleChange = (newValue: string): void => {
    if (validateNumberOfLevels(newValue) || newValue.length === 0) {
      setIsValid(true);
      const newLevels = parseInt(newValue, 10);
      onChange({
        levels: newLevels,
        labels,
      });
    } else {
      setIsValid(false);
    }
  };
  const handleLabelChange = (newLabel: string, index: number): void => {
    labels.set(index, newLabel);
    onChange({
      levels: numberOfLevels,
      labels,
    });
  };
  return (
    <Stack spacing={1}>
      <Typography variant="h2">{t('SETTINGS.LEVELS.TITLE')}</Typography>
      <TextField
        error={!isValid}
        inputProps={{
          'data-cy': SETTINGS_LEVELS_NUMERIC_FIELD_CY,
        }}
        value={numberOfLevels}
        onChange={(e) => handleChange(e.target.value)}
      />
      {Array.from(mapLabels.entries()).map(([index, label]) => (
        <span key={index}>
          <p>{index}</p>
          <TextField
            value={label}
            onChange={(e) => handleLabelChange(e.target.value, index)}
          />
        </span>
      ))}
    </Stack>
  );
};

export default LevelsSettingsEdit;
