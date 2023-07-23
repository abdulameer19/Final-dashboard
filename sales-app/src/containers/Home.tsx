import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { SalesByCategory } from '../components/SalesByCategory';
import {SalesByRegion} from '../components/SalesByRegion';
import { AgeCount } from '../components/AgeCount';
import { OccupationData } from '../components/OccupationData';
import { GenderChart } from '../components/GenderChart';
import { SalesVSTarget } from '../components/SalesVSTarget';
import { TopProductSell } from '../components/TopProductSell';
import { ProfitAndRevenue } from '../components/ProfitAndRevenue';
import SalesConversionRate from '../components/SalesConversionRate';
export const Home = (props: any) => {
  const conversionData = [30, 35, 40, 32, 38, 42];
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Paper>
              <h2>Sales By Region</h2>
              <SalesByRegion />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <h2>Sales By Category</h2>
              <SalesByCategory />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <h2>Age Count</h2>
              <AgeCount />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <h2>Occupation Data</h2>
              <OccupationData />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <h2 className="mt-1">Gender Data</h2>
              <GenderChart />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <h2>Sales VS Target Data</h2>
              <SalesVSTarget />
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper>
              <h2>Top 10 Products</h2>
              <TopProductSell />
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper>
              <h2>Profit And Revenue</h2>
              <ProfitAndRevenue />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              
            <SalesConversionRate data={conversionData} labels={monthLabels} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
