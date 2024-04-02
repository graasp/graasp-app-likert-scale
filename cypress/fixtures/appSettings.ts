import { AppSetting } from '@graasp/sdk';

import {
  GeneralSettings,
  LabelPosition,
  LevelsSettings,
  LikertItemSettings,
} from '@/config/appSettings';

import { MOCK_SERVER_DISCRIMINATED_ITEM } from './mockItem';

export const LEVELS_SETTING: AppSetting<LevelsSettings> = {
  id: '0',
  name: 'levels',
  data: {
    levels: 7,
    labels: [],
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  item: MOCK_SERVER_DISCRIMINATED_ITEM,
};

export const LIKERT_ITEM_SETTING: AppSetting<LikertItemSettings> = {
  id: '1',
  name: 'likertItem',
  data: {
    item: {
      key: 'item1',
      label: 'How do the test pass?',
    },
    labelPosition: LabelPosition.Top,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  item: MOCK_SERVER_DISCRIMINATED_ITEM,
};

export const GENERAL_SETTING: AppSetting<GeneralSettings> = {
  id: '2',
  name: 'general',
  data: {
    required: true,
    autosubmit: false,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  item: MOCK_SERVER_DISCRIMINATED_ITEM,
};
