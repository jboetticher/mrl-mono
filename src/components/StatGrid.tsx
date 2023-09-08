import { Card, CardContent, Grid, Typography } from "@mui/material";

// TODO: import stats in props so that it's only fetched once
export const StatGrid = ({ onlyMobile }: { onlyMobile?: boolean; }) => {
  const cards = <>
    <Card style={{ marginBottom: '2rem' }}>
      <CardContent>Stats 1</CardContent>
    </Card>
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom textAlign='center'>
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
