export const PLAYER_VIEW_CY = 'player-view';
export const BUILDER_VIEW_CY = 'builder-view';
export const ADMIN_VIEW_CY = 'admin-view';
export const ANALYTICS_VIEW_CY = 'analytics-view';
export const SETTINGS_VIEW_PANE_CY = 'settings-view-pane';
export const SETTINGS_VIEW_CY = 'settings-view';
export const TABLE_VIEW_PANE_CY = 'table-view-pane';
export const TAB_SETTINGS_VIEW_CY = 'tab-settings-view';
export const TAB_TABLE_VIEW_CY = 'tab-table-view';
export const SETTINGS_LEVELS_NUMERIC_FIELD_CY = 'settings-levels-numeric-field';
export const SETTINGS_SAVE_BTN_CY = 'settings-save-button';
export const SETTINGS_ANSWERS_ADD_BTN_CY = 'settings-answers-add-button';
export const makeSettingsAnswersInputKeyCy = (index: number): string =>
  `settings-answers-input-key-${index}`;
export const makeSettingsAnswersRowCy = (index: number): string =>
  `settings-answers-row-${index}`;

export const SUBMIT_BTN_CY = 'submit-button';
export const RESET_BTN_CY = 'reset-button';
export const LIKERT_LABEL_CY = 'likert-label';

export const REQUIRED_CHIP_CY = 'required-chip';
export const SAVED_CHIP_CY = 'saved-chip';
export const SUBMITTED_CHIP_CY = 'submitted-chip';

export const makeRadioAnswerCy = (index: number): string =>
  `likert-item-radio-${index}`;

export const makeLabelFieldForLevelCy = (index: number): string =>
  `label-field-for-level-${index}`;

export const buildDataCy = (selector: string): string =>
  `[data-cy=${selector}]`;
