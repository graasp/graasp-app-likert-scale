import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
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

  const handleLabelPositionChange = (newLabelPosition: LabelPosition): void => {
    onChange({
      ...likertItem,
      labelPosition: newLabelPosition,
    });
  };

  return (
    <Stack spacing={1}>
      <Typography variant="h2">{t('TITLE')}</Typography>
      <Stack direction="row" spacing={1}>
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
        />
        {labelPosition === LabelPosition.Ends && (
          <TextField
            sx={{ flexGrow: 2 }}
            value={secondLabel}
            onChange={(e) => handleSecondLabelChange(e.target.value)}
            label={t('SECOND_LABEL_LABEL')}
          />
        )}
      </Stack>
      <FormControl>
        <FormLabel>{t('SELECT_POS_LABEL')}</FormLabel>
        <RadioGroup
          value={labelPosition}
          onChange={(e) =>
            handleLabelPositionChange(e.target.value as LabelPosition)
          }
        >
          <FormControlLabel
            value={LabelPosition.Top}
            control={<Radio />}
            label={t('TOP_POS_LABEL')}
          />
          <FormControlLabel
            value={LabelPosition.Bottom}
            control={<Radio />}
            label={t('BOTTOM_POS_LABEL')}
          />
          <FormControlLabel
            value={LabelPosition.Left}
            control={<Radio />}
            label={t('LEFT_POS_LABEL')}
          />
          <FormControlLabel
            value={LabelPosition.Right}
            control={<Radio />}
            label={t('RIGHT_POS_LABEL')}
          />
          <FormControlLabel
            value={LabelPosition.Ends}
            control={<Radio />}
            label={t('ENDS_POS_LABEL')}
          />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};

export default LikertItemSettingsEdit;
