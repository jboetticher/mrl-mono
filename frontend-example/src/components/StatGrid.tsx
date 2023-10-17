import { useEffect, useState } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { ethers } from "ethers";
import { PieChart } from 'react-minimal-pie-chart';

const GMP_PRECOMPILE_ADDR = '0x0000000000000000000000000000000000000816';
const WBTC_ADDR = "0xe57ebd2d67b462e9926e04a8e33f01cd0d64346d"
const WETH_ADDR = "0xab3f0245b83feb11d15aaffefd7ad465a59817ed";
const USDC_ADDR = "0x931715fee2d06333043d11f658c8ce934ac61d0c";
const DAI_ADDR = "0x06e605775296e851ff43b4daa541bb0984e9d6fd";
const USDT_ADDR = "0xc30e9ca94cf52f3bf5692aacf81353a27052c46f";

type TotalLiquidity = {
  decimals: string;
  token_name: string;
  token_sym: string;
  contract_addr: string;
  number_of_transfers: number;
  total_usd: number
}[];

export const StatGrid = ({ onlyMobile }: { onlyMobile?: boolean; }) => {
  const [inwardLiquidity, setInwardLiquidity] = useState<TotalLiquidity>([]);

  useEffect(() => {
    fetch(`https://mrl-indexer.projk.net/totalLiquidityForward`)
      .then(res => res.json())
      .then(res => {
        setInwardLiquidity(res);
      })
  }, []);

  const pieChartData: { title: string, value: number, color: string; symbol: string; }[] = [];
  for (let liquidity of inwardLiquidity) {
    if (liquidity.total_usd < 1000) continue;

    let d = {
      title: liquidity.token_name,
      value: liquidity.total_usd,
      color: '',
      symbol: liquidity.token_sym
    }

    switch (liquidity.contract_addr) {
      case WBTC_ADDR: d.color = '#f2a900'; break;
      case WETH_ADDR: d.color = '#8a92b3'; break;
      case DAI_ADDR: d.color = '#fbcc5f'; break;
      case USDC_ADDR: d.color = '#2775ca'; break;
      case USDT_ADDR: d.color = '#26A17B'; break;
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
