import { Context, PermissionLevel } from '@graasp/sdk';

import {
  ADMIN_VIEW_CY,
  SETTINGS_ANSWERS_ADD_BTN_CY,
  SETTINGS_QUESTION_TEXT_FIELD_CY,
  SETTINGS_SAVE_BTN_CY,
  SETTINGS_VIEW_CY,
  buildDataCy,
  makeSettingsAnswersInputKeyCy,
  makeSettingsAnswersRowCy,
} from '../../../src/config/selectors';
import { ANSWERS_SETTING, QUESTION_SETTING } from '../../fixtures/appSettings';

describe('Builder as admin without configuration', () => {
  beforeEach(() => {
    cy.setUpApi(
      {},
      {
        context: Context.Builder,
        permission: PermissionLevel.Admin,
      },
    );
    cy.visit(`/`);
  });

  it('checks the UI', () => {
    cy.get(buildDataCy(ADMIN_VIEW_CY)).should('exist');
    cy.get(buildDataCy(SETTINGS_VIEW_CY)).should('be.visible');

    cy.get(buildDataCy(SETTINGS_QUESTION_TEXT_FIELD_CY)).should('be.empty');
  });

  it('sets the question', () => {
    const question = 'Is the question field working?';
    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).should('be.disabled');
    cy.get(buildDataCy(SETTINGS_QUESTION_TEXT_FIELD_CY)).type(question);
    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).should('be.enabled');
    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).click();
    cy.get(buildDataCy(SETTINGS_QUESTION_TEXT_FIELD_CY))
      .invoke('val')
      .should('eq', question);
  });

  it('sets new answers', () => {
    const answers = [
      {
        key: 'fine',
        label: "It's working fine",
      },
      {
        key: 'well',
        label: "It's working well",
      },
    ];

    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).should('be.disabled');

    cy.get(buildDataCy(SETTINGS_ANSWERS_ADD_BTN_CY)).click();
    cy.get(buildDataCy(SETTINGS_ANSWERS_ADD_BTN_CY)).click();

    cy.get(buildDataCy(makeSettingsAnswersRowCy(0))).should('exist');
    cy.get(buildDataCy(makeSettingsAnswersRowCy(1))).should('exist');

    answers.forEach((ans, index) => {
      cy.get(buildDataCy(makeSettingsAnswersInputKeyCy(index))).type(
        `{selectAll}{del}${ans.key}`,
      );
    });

    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).should('be.enabled');
    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).click();
  });
});

describe('Builder as admin with question and answers.', () => {
  beforeEach(() => {
    cy.setUpApi(
      {
        appSettings: [QUESTION_SETTING, ANSWERS_SETTING],
      },
      {
        context: Context.Builder,
        permission: PermissionLevel.Admin,
      },
    );
    cy.visit(`/`);
  });

  it('checks the question', () => {
    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).should('be.disabled');
    cy.get(buildDataCy(SETTINGS_QUESTION_TEXT_FIELD_CY))
      .invoke('val')
      .should('eq', QUESTION_SETTING.data.label);
  });

  it('checks the answers', () => {
    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).should('be.disabled');
    const { answers } = ANSWERS_SETTING.data;
    answers.forEach((ans: { key: string }, index: number) => {
      cy.get(buildDataCy(makeSettingsAnswersInputKeyCy(index)))
        .invoke('val')
        .should('eq', ans.key);
    });
  });
});
