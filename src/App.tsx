import { useState } from "react";
import {
  Card, CardContent, Grid, Tabs, Tab
} from "@mui/material";
import { AddNetworkButton, ConnectButton } from "./components/TopButtons";
import { TxNotificationBar } from "./components/TxNotificationBar";
import { StatGrid } from "./components/StatGrid";
import TransferForm from "./components/TransferForm";

export default function App() {
  const [selectedTab, setSelectedTab] = useState(0);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  function tabSwitchResult() {
    switch (selectedTab) {
      case 0: return <TransferForm setSnackOpen={setSnackOpen} setSnackMessage={setSnackMessage} />;
      default: return <>
        <div>
          AMONGUS
        </div>
      </>
    }
  }

  return (
    <>
      <Grid container style={{
        margin: '4rem', // Adjust the margin around the cards as needed
        height: 'calc(100vh - 8rem)', // Adjusting for the margin
        width: 'calc(100% - 8rem)', // Subtracting the total horizontal margin (4rem on each side)
        boxSizing: 'border-box'
      }} spacing={3}>
        <StatGrid />
        <Grid item sm={12} md={8} lg={9}>
          <Card style={{ height: '100%' }}>
            <CardContent>
              <Tabs value={selectedTab} onChange={(event, newValue) => setSelectedTab(newValue)}>
                <Tab label="TestNet" />
                <Tab label="About" />
              </Tabs>
              {tabSwitchResult()}
            </CardContent>
          </Card>
        </Grid>
        <StatGrid onlyMobile />
      </Grid>
      <ConnectButton />
      <AddNetworkButton />
      {TxNotificationBar(snackOpen, setSnackOpen, snackMessage)}
    </>
  )
};
