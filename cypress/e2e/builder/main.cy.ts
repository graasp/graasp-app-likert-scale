import { Context, PermissionLevel } from '@graasp/sdk';

import {
  ADMIN_VIEW_CY,
  SETTINGS_LEVELS_NUMERIC_FIELD_CY,
  SETTINGS_SAVE_BTN_CY,
  SETTINGS_VIEW_CY,
  buildDataCy,
  makeLabelFieldForLevelCy,
} from '../../../src/config/selectors';

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

    cy.get(buildDataCy(SETTINGS_LEVELS_NUMERIC_FIELD_CY))
      .invoke('val')
      .should('not.be.null');
  });

  it('change number of levels and check labels fields', () => {
    const nbrLevels = 3;
    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).should('be.disabled');
    cy.get(buildDataCy(SETTINGS_LEVELS_NUMERIC_FIELD_CY)).type(
      `{backspace}${nbrLevels.toString()}`,
    );
    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).should('be.enabled');
    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).click();
    for (let i = 0; i < nbrLevels; i += 1) {
      cy.get(buildDataCy(makeLabelFieldForLevelCy(i))).should('exist');
    }
  });
});
