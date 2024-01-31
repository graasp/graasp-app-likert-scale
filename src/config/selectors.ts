export const PLAYER_VIEW_CY = 'player-view';
export const BUILDER_VIEW_CY = 'builder-view';
export const ADMIN_VIEW_CY = 'admin-view';
export const ANALYTICS_VIEW_CY = 'analytics-view';
export const SETTINGS_VIEW_PANE_CY = 'settings-view-pane';
export const SETTINGS_VIEW_CY = 'settings-view';
export const TABLE_VIEW_PANE_CY = 'table-view-pane';
export const TAB_SETTINGS_VIEW_CY = 'tab-settings-view';
export const TAB_TABLE_VIEW_CY = 'tab-table-view';
export const SETTINGS_QUESTION_TEXT_FIELD_CY = 'settings-question-text-field';
export const SETTINGS_SAVE_BTN_CY = 'settings-save-button';
export const SETTINGS_ANSWERS_ADD_BTN_CY = 'settings-answers-add-button';
export const makeSettingsAnswersInputKeyCy = (index: number): string =>
  `settings-answers-input-key-${index}`;
export const makeSettingsAnswersRowCy = (index: number): string =>
  `settings-answers-row-${index}`;

export const MCQ_QUESTION_CY = 'mcq-question';
export const makeMcqAnswersCy = (index: number): string =>
  `mcq-answer-${index}`;
export const makeMcqMultipleAnswersCy = (index: number): string =>
  `mcq-multiple-answer-${index}`;

export const buildDataCy = (selector: string): string =>
  `[data-cy=${selector}]`;
