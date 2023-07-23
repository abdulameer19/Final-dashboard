import React, { useEffect } from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import { salesByRegionData } from '../fake-db/index';
import { countries } from '../fake-db/index';
import { useDispatch, useSelector } from 'react-redux';
import { tokens } from '../theme';
import { getSalesByRegion } from '../store/reducers/salesByRegion.reducer';
import { useTheme } from '@mui/material';

export const SalesByRegion = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data } = useSelector((state: any) => state.salesByRegion);
  const dispatch = useDispatch();
console.log(countries)
  useEffect(() => {
    dispatch<any>(getSalesByRegion());
  }, [dispatch]);

  // Map the data to include the 'id' property for country codes
  const mappedData = data.map((item: any) => ({
    id: item.id, // Country code, e.g., 'US', 'CA', etc.
    value: item.value, // Sales performance value for the country
  }));

  // Check if countries and data are available
    if (!countries || !data) {
    return <div>Loading...</div>;
  }
  console.log("mappedData",mappedData)
  console.log(salesByRegionData)

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <ResponsiveChoropleth
        theme={{
            axis: {
            domain: {
                line: {
                stroke: colors.grey[100],
                },
            },
            legend: {
                text: {
                fill: colors.grey[100],
                },
            },
            ticks: {
                line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
                },
                text: {
                fill: colors.grey[100],
                },
            },
            },
            legends: {
            text: {
                fill: colors.grey[100],
            },
            },
            tooltip: {
            container: {
                background: colors.primary[400],
                color: colors.grey[100],
            },
            },
        }}
        data={mappedData}
        features={countries.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="nivo"
        domain={[ 0, 1000000 ]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={isDashboard?40:100}
        projectionTranslation={isDashboard?[0.49,0.6]:[0.5,0.5]}
        projectionRotation={[ 0, 0, 0 ]}
        enableGraticule={false}
        graticuleLineColor="#444444"
        borderWidth={0.5}
        borderColor="#fff"
        
        legends={
            !isDashboard?
            [
                {
                    anchor: 'bottom-left',
                    direction: 'column',
                    justify: true,
                    translateX: 20,
                    translateY: -100,
                    itemsSpacing: 0,
                    itemWidth: 94,
                    itemHeight: 18,
                    itemDirection: 'left-to-right',
                    itemTextColor: colors.grey[100],
                    itemOpacity: 0.85,
                    symbolSize: 18,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: colors.greenAccent[500],
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]:undefined
        }
    />
    </div>
  );
};
