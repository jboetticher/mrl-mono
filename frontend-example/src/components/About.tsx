import { Typography } from "@mui/material";

export default () => {
  return (
    <>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
        <img alt={`Moonbeam Routed Liquidity Diagram`}
          src={`${process.env.PUBLIC_URL}/diagram.png`}
          style={{
            width: '100%',
            borderRadius: '12px',
            marginBottom: '2rem',
            maxWidth: '800px'
          }}
        />
      </div>
      <Typography variant="body1" marginBottom='1rem'>
        Moonbeam Routed Liquidity (MRL) is an advanced interoperability feature that enables developers to automatically send
        liquidity to parachains from Wormhole connected chains without requiring Wormhole's to explicity connect to them. This
        opens up instant liquidity bridging for all Polkadot parachains that are connected to Moonbeam.
      </Typography>
      <Typography variant="body1" marginBottom='1rem'>
        MRL relies on three main components: Wormhole relayers, Moonbeam's GMP Precompile, and Polkadot's XCMP. Any user that
        wants to send funds through MRL will send tokens through Wormhole's token bridge with an XCMP encoded payload. A special
        Wormhole relayer will pick up that message and relay it through Moonbeam's GMP Precompile, which will then send those
        tokens to a parachain as specified by the scale encoded payload.
      </Typography>
      <Typography variant="body1">
        To learn more about MRL, see its <a 
        href="https://docs.moonbeam.network/builders/interoperability/mrl/" 
        target="_blank" style={{ color: 'rgb(100, 208, 206)' }}
        >
          page on the Moonbeam documentation site
        </a>.
      </Typography>
    </>

  );
}

