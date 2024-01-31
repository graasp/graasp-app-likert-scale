import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import TableViewIcon from '@mui/icons-material/TableView';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';

import {
  ADMIN_VIEW_CY,
  SETTINGS_VIEW_PANE_CY,
  TABLE_VIEW_PANE_CY,
  TAB_SETTINGS_VIEW_CY,
  TAB_TABLE_VIEW_CY,
} from '@/config/selectors';

import AnswersView from '../answers/AnswersView';
import { UserAnswersProvider } from '../context/UserAnswersContext';
import SettingsView from '../settings/SettingsView';

enum Tabs {
  TABLE_VIEW = 'TABLE_VIEW',
  SETTINGS_VIEW = 'SETTINGS_VIEW',
}

const AdminView = (): JSX.Element => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(Tabs.SETTINGS_VIEW);

  return (
    <Box data-cy={ADMIN_VIEW_CY}>
      <TabContext value={activeTab}>
        <TabList
          textColor="secondary"
          indicatorColor="secondary"
          onChange={(_, newTab: Tabs) => setActiveTab(newTab)}
          centered
        >
          <Tab
            data-cy={TAB_SETTINGS_VIEW_CY}
            value={Tabs.SETTINGS_VIEW}
            label={t('SETTINGS.TITLE')}
            icon={<SettingsApplicationsIcon />}
            iconPosition="start"
          />

          <Tab
            data-cy={TAB_TABLE_VIEW_CY}
            value={Tabs.TABLE_VIEW}
            label={t('Answers')}
            icon={<TableViewIcon />}
            iconPosition="start"
          />
        </TabList>
        <TabPanel value={Tabs.TABLE_VIEW} data-cy={TABLE_VIEW_PANE_CY}>
          <UserAnswersProvider>
            <AnswersView />
          </UserAnswersProvider>
        </TabPanel>
        <TabPanel value={Tabs.SETTINGS_VIEW} data-cy={SETTINGS_VIEW_PANE_CY}>
          <SettingsView />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default AdminView;
