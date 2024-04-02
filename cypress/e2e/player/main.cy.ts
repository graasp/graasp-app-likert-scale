import { Context, PermissionLevel } from '@graasp/sdk';

import {
  LIKERT_LABEL_CY,
  REQUIRED_CHIP_CY,
  RESET_BTN_CY,
  SAVED_CHIP_CY,
  SUBMITTED_CHIP_CY,
  SUBMIT_BTN_CY,
  buildDataCy,
  makeRadioAnswerCy,
} from '../../../src/config/selectors';
import {
  GENERAL_SETTING,
  LEVELS_SETTING,
  LIKERT_ITEM_SETTING,
} from '../../fixtures/appSettings';

describe('Player View with required anwer and submission button', () => {
  beforeEach(() => {
    cy.setUpApi(
      {
        appSettings: [GENERAL_SETTING, LIKERT_ITEM_SETTING, LEVELS_SETTING],
      },
      {
        context: Context.Player,
        permission: PermissionLevel.Read,
      },
    );
    cy.visit(`/`);
  });

  it('tests label, levels and submit buttons are visible', () => {
    const nbrOfLevels = LEVELS_SETTING.data.levels;
    for (let index = 0; index < nbrOfLevels; index += 1) {
      cy.get(buildDataCy(makeRadioAnswerCy(index))).should('be.visible');
    }
    cy.get(buildDataCy(LIKERT_LABEL_CY)).should('be.visible');

    cy.get(buildDataCy(SUBMIT_BTN_CY)).should('not.be.visible');
  });

  it('selects an answer and submit it', () => {
    const nbrOfLevels = LEVELS_SETTING.data.levels;
    cy.get(buildDataCy(REQUIRED_CHIP_CY)).should('be.visible');
    cy.get(buildDataCy(makeRadioAnswerCy(Math.ceil(nbrOfLevels / 2)))).click();
    cy.get(buildDataCy(REQUIRED_CHIP_CY)).should('not.exist');
    cy.get(buildDataCy(SAVED_CHIP_CY)).should('be.visible');
    cy.get(buildDataCy(SUBMIT_BTN_CY)).click();
    cy.get(buildDataCy(SUBMITTED_CHIP_CY)).should('be.visible');
    cy.get(buildDataCy(RESET_BTN_CY)).should('be.visible').click();
    cy.get(buildDataCy(REQUIRED_CHIP_CY)).should('be.visible');
  });
});

describe('Player View configured to autosubmit', () => {
  beforeEach(() => {
    cy.setUpApi(
      {
        appSettings: [
          {
            ...GENERAL_SETTING,
            data: {
              required: false,
              autosubmit: true,
            },
          },
          LIKERT_ITEM_SETTING,
          LEVELS_SETTING,
        ],
      },
      {
        context: Context.Player,
        permission: PermissionLevel.Read,
      },
    );
    cy.visit(`/`);
  });

  it('selects an answer and submit it', () => {
    const nbrOfLevels = LEVELS_SETTING.data.levels;
    cy.get(buildDataCy(REQUIRED_CHIP_CY)).should('not.exist');
    cy.get(buildDataCy(makeRadioAnswerCy(Math.ceil(nbrOfLevels / 2)))).click();
    cy.get(buildDataCy(SAVED_CHIP_CY)).should('not.exist');
    cy.get(buildDataCy(SUBMIT_BTN_CY)).should('exist').should('not.be.visible');
    cy.get(buildDataCy(SUBMITTED_CHIP_CY)).should('be.visible');
    cy.get(buildDataCy(RESET_BTN_CY)).should('be.visible').click();
    cy.get(buildDataCy(RESET_BTN_CY)).should('exist').should('not.be.visible');
  });
});
