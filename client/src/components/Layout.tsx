import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { EditForm } from '../pages';
import { PreviewForm } from '../pages/PreviewForm';

function TabPanel(props: { children?: React.ReactNode; value: number; index: number }) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`form-editor-tabpanel-${index}`}
      aria-labelledby={`form-editor-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

export const Layout: React.FC = () => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box>
      <Box color="default">
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Edit" id="form-editor-tab-0" aria-controls="form-editor-tabpanel-0" />
          <Tab label="Preview" id="form-editor-tab-1" aria-controls="form-editor-tabpanel-1" />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <EditForm />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <PreviewForm />
      </TabPanel>
    </Box>
  );
};
