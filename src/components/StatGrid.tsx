import { useEffect, useState } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { ethers } from "ethers";
import { PieChart } from 'react-minimal-pie-chart';

const GMP_PRECOMPILE_ADDR = '0x0000000000000000000000000000000000000816';
const WBTC_ADDR = "0xe57ebd2d67b462e9926e04a8e33f01cd0d64346d"
const WETH_ADDR = "0xab3f0245b83feb11d15aaffefd7ad465a59817ed";
const USDC_ADDR = "0x931715fee2d06333043d11f658c8ce934ac61d0c";
const DAI_ADDR = "0x06e605775296e851ff43b4daa541bb0984e9d6fd";

type TokenMints = {
  [x: string]: {
    tokenDecimal: string;
    tokenName: string;
    tokenSymbol: string;
    contractAddress: string;
    transfers: { timeStamp: string; blockNumber: string; value: string; }[];
    total: number,
    totalPrice: number
  };
}

type EtherscanTokenEntry = {
  contractAddress: string;
  tokenDecimal: string;
  tokenName: string;
  tokenSymbol: string;
  timeStamp: string;
  blockNumber: string;
  value: string;
}

export const StatGrid = ({ onlyMobile }: { onlyMobile?: boolean; }) => {
  const [inwardLiquidity, setInwardLiquidity] = useState<TokenMints>({});

  useEffect(() => {
    // 1. Get block number
    const moonbeamProvider = new ethers.providers.JsonRpcProvider('https://moonbeam.unitedbloc.com');
    moonbeamProvider.getBlockNumber()
      .then(blockNum => {
        // 2. Fetches all of the token transfers
        return fetch(
          // Sweats in exposed key
          `https://api-moonbeam.moonscan.io/api?module=account&action=tokentx&address=${GMP_PRECOMPILE_ADDR}&startblock=4162196&endblock=${blockNum}&sort=asc&apikey=6AGZQXNDPZ5NHMMPJ36B6ZGFQZIRY7YW6I`
        )
      })
      .then(res => res.json())
      .then(res => {
        if (res.message !== 'OK') return;

        // TODO: pagination

        // Filter out all events so that they are only the minting events (to get a true value)
        const mintEvents = res.result.filter(
          (entry: { from: string; to: string; }) =>
            entry.from === '0x0000000000000000000000000000000000000000' && entry.to === GMP_PRECOMPILE_ADDR
        );

        console.log('Mint Events', mintEvents)

        // Sort into different boxes
        const tokenMints: TokenMints = mintEvents.reduce((acc: TokenMints, item: EtherscanTokenEntry) => {
          const group = item.contractAddress;
          if (!acc[group]) acc[group] = {
            tokenDecimal: item.tokenDecimal,
            tokenName: item.tokenName,
            tokenSymbol: item.tokenSymbol,
            contractAddress: item.contractAddress,
            transfers: [],
            total: 0,
            totalPrice: 0
          };
          acc[group].transfers.push({
            timeStamp: item.timeStamp,
            blockNumber: item.blockNumber,
            value: item.value
          });
          return acc;
        }, {});

        // Reduce into totals
        for (let addr in tokenMints) {
          let decimal = parseInt(tokenMints[addr].tokenDecimal);
          let value = tokenMints[addr].transfers.reduce((prev, entry) => {
            // Ignore very small values
            if (decimal > 8 && entry.value.length - decimal + 8 < 0) return prev;

            // Normalize
            let v: number;
            if (decimal > 8) {
              v = parseInt(entry.value.substring(0, entry.value.length - decimal + 8));
              v = v / (10 ** Math.min(8, decimal));
            }
            else v = parseInt(entry.value) / (10 ** decimal);
            if (prev == 0) console.log(`Adding ${v} as first value for ${tokenMints[addr].tokenName}`);

            // Sum
            return prev + v;
          }, 0);

          // Store total
          tokenMints[addr].total = value;

          // Store USD valuation total
          if (tokenMints[addr].contractAddress === WBTC_ADDR) // BTC
            tokenMints[addr].totalPrice = 25000 * value;
          else if (tokenMints[addr].contractAddress === WETH_ADDR) // ETH
            tokenMints[addr].totalPrice = 1560 * value;
          // Default to stablecoin valuation
          else tokenMints[addr].totalPrice = value;
        }

        setInwardLiquidity(tokenMints);
        console.log('Tokens', tokenMints);
      });
  }, []);

  const pieChartData: { title: string, value: number, color: string; symbol: string; }[] = [];
  for (let addr in inwardLiquidity) {
    let d = {
      title: inwardLiquidity[addr].tokenName,
      value: inwardLiquidity[addr].totalPrice,
      color: '',
      symbol: inwardLiquidity[addr].tokenSymbol
    }

    switch(addr) {
      case WBTC_ADDR: d.color = '#f2a900'; break;
      case WETH_ADDR: d.color = '#8a92b3'; break;
      case DAI_ADDR: d.color = '#fbcc5f'; break;
      case USDC_ADDR: d.color = '#2775ca'; break;
      default: d.color = '#444'; break;
    }

    pieChartData.push(d);
  }


  const cards = <>
    <Card style={{ marginBottom: '2rem' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom textAlign='center'>
          MRL Liquidty Sent Inwards
        </Typography>
        <PieChart
          data={pieChartData}
          animate
          paddingAngle={0}
          lineWidth={85}
          label={({ dataEntry }) => { 
            let v;
            if (dataEntry.value > 1000) v = Math.floor((dataEntry.value / 1000)).toString() + "k";
            else v = Math.floor((dataEntry.value));
            return `${dataEntry.symbol} $${v}`
          }}
          labelStyle={(index) => ({
            fill: 'white',
            fontSize: '5px',
            fontFamily: 'Open Sans',
          })}
        />
      </CardContent>
    </Card>
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom textAlign='center'>
          MRL Implementations
        </Typography>
        <a
          href="https://carrier.so/" target='_blank'
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2rem 0' }}
        >
          <img src="carrier-logo.svg" alt="carrier" style={{ width: '70%' }} />
        </a>
      </CardContent>
    </Card>
  </>;

  if (onlyMobile) return <Grid item xs={12} sx={{ display: { sm: 'block', md: 'none' } }}>{cards}</Grid>;
  else return <Grid item md={4} lg={3} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>{cards}</Grid>;
};
