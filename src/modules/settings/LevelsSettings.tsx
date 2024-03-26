import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import cloneDeep from 'lodash.clonedeep';

import { LevelsSettings } from '@/config/appSettings';
import { MAX_NUMBER_OF_LEVELS } from '@/config/constants';
import {
  SETTINGS_LEVELS_NUMERIC_FIELD_CY,
  makeLabelFieldForLevelCy,
} from '@/config/selectors';
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
  const [numberOfLevelsUI, setNumberOfLevelsUI] = useState(
    numberOfLevels.toString(),
  );

  useEffect(() => {
    setNumberOfLevelsUI(numberOfLevels.toString());
  }, [numberOfLevels]);

  const mapLabels = Array.from(Array(numberOfLevels).keys()).map(
    (x) => labels[x] || '',
  );
  const handleChange = (newValue: string): void => {
    let newLevels = 0;
    setNumberOfLevelsUI(newValue);
    newLevels = parseInt(newValue, 10);
    if (validateNumberOfLevels(newLevels) && !Number.isNaN(newLevels)) {
      setIsValid(true);
      onChange({
        levels: newLevels,
        labels,
      });
    } else {
      setIsValid(false);
    }
  };
  const handleLabelChange = (newLabel: string, index: number): void => {
    const newLabels = cloneDeep(labels);
    newLabels[index] = newLabel;
    onChange({
      levels: numberOfLevels,
      labels: newLabels,
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
        value={numberOfLevelsUI}
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
            inputProps={{
              'data-cy': makeLabelFieldForLevelCy(index),
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default LevelsSettingsEdit;
