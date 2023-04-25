import React, { useState } from 'react';
import { Button, Modal, Box, Typography, IconButton } from '@mui/material';

export default function PolkadotConnector({ setAcc32 }: { setAcc32: (v: string) => void }): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const wallets = [
    ['polkadot-js', 'Polkadot.js', 'polkadotjs.png'],
    ['subwallet-js', 'SubWallet', 'subwallet.png'],
    ['talisman', 'Talisman', 'talisman.png']
  ];

  async function enableWallet(walletName: string) {
    const res = await window.injectedWeb3[walletName].enable();

    // Returns an array of accounts, here we use the first one
    const accounts = await res.accounts.get();
    const acc = accounts.find((e: { type: string; }) => e.type === 'sr25519') ?? "";
    setAcc32(acc.address);

    handleModalClose();
  }

  console.log(window.injectedWeb3);

  return (
    <div>
      <Button variant="contained" onClick={handleModalOpen} style={{ height: "100%" }}>
        Connect Polkadot Wallet
      </Button>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            borderRadius: 5,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Choose a Polkadot Wallet
          </Typography>
          <Box display="flex" justifyContent="space-around" mt={2} alignItems="center" flexDirection="column">
            {wallets.map(([walletId, displayName, walletImage], index) => (
              <Box key={walletImage} display="flex" flexDirection="column" alignItems="center">
                <IconButton color="primary" aria-label={`Wallet ${index + 1}`} onClick={() => enableWallet(walletId)}>
                  <img src={`${process.env.PUBLIC_URL}/${walletImage}`} alt={`Wallet ${index + 1}`} width="50" />
                    <Typography variant="body1">{displayName}</Typography>
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
