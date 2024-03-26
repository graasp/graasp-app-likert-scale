import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import isEqual from 'lodash.isequal';

import { version } from '@/../package.json';
import {
  GeneralSettings,
  LevelsSettings,
  LikertItemSettings,
} from '@/config/appSettings';
import { SETTINGS_SAVE_BTN_CY, SETTINGS_VIEW_CY } from '@/config/selectors';

import { useSettings } from '../context/SettingsContext';
import GeneralSettingsEdit from './GeneralSettings';
import LevelsSettingsEdit from './LevelsSettings';
import LikertItemSettingsEdit from './LikertItemSettings';

const SettingsView: FC = () => {
  const { t } = useTranslation();
  const {
    levels: levelsSavedState,
    likertItem: likertItemSavedState,
    general: generalSavedState,
    saveSettings,
  } = useSettings();

  const [levels, setLevels] = useState<LevelsSettings>(levelsSavedState);
  const [likertItem, setLikertItem] =
    useState<LikertItemSettings>(likertItemSavedState);
  const [general, setGeneral] = useState<GeneralSettings>(generalSavedState);

  const saveAllSettings = (): void => {
    saveSettings('levels', levels);
    saveSettings('likertItem', likertItem);
    saveSettings('general', general);
  };

  useEffect(() => setGeneral(generalSavedState), [generalSavedState]);
  useEffect(() => setLikertItem(likertItemSavedState), [likertItemSavedState]);
  useEffect(() => setLevels(levelsSavedState), [levelsSavedState]);

  const disableSave = useMemo(() => {
    if (
      isEqual(levelsSavedState, levels) &&
      isEqual(likertItemSavedState, likertItem) &&
      isEqual(general, generalSavedState)
    ) {
      return true;
    }
    return false;
  }, [
    general,
    generalSavedState,
    levels,
    levelsSavedState,
    likertItem,
    likertItemSavedState,
  ]);

  return (
    <Stack data-cy={SETTINGS_VIEW_CY} spacing={2}>
      <Typography variant="h1">{t('SETTINGS.TITLE')}</Typography>
      <Typography variant="caption">{t('VERSION', { version })}</Typography>
      <GeneralSettingsEdit general={general} onChange={setGeneral} />
      <LikertItemSettingsEdit
        likertItem={likertItem}
        onChange={(newSetting: LikertItemSettings) => {
          setLikertItem({ ...newSetting });
        }}
      />
      <LevelsSettingsEdit
        levels={levels}
        onChange={(newSetting: LevelsSettings) => {
          setLevels(newSetting);
        }}
      />
      <Box>
        <Button
          startIcon={<SaveIcon />}
          variant="contained"
          onClick={saveAllSettings}
          disabled={disableSave}
          data-cy={SETTINGS_SAVE_BTN_CY}
        >
          {t('SETTINGS.SAVE_BTN')}
        </Button>
      </Box>
    </Stack>
  );
};

export default SettingsView;
