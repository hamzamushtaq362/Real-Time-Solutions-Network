import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

import {
  // Button,
  GraphBoxTopContainer,
  GraphChartContainer,
  GraphContainer,
  GraphTopTextWrapper,
  GraphTopTitleText,
} from './elements';
import { Menu, useTheme } from '@mui/material';

import {
  FilterDropdownButton,
  FilterDropdownItemWrap,
  FilterDropdownText,
} from '~/components';
import CollectiveWalletDownIcon from 'components/Icons/CollectiveWalletDownIcon';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
);

const LineGraph = ({ data, options }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const demoOptions = {
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: false,
      tooltip: {
        backgroundColor: '#FFFFFF',
        titleColor: '#000000',
        titleSpacing: 4,
        width: 40,
        padding: 10,
        boxWidth: 0,
        boxPadding: 0,
        bodyColor: '#000000',
        cornerRadius: 0,
        bodyFont: {
          size: 22,
          weight: 'normal',
        },
        titleFont: {
          size: 14,
          weight: 'normal',
        },
        displayColors: false,
      },
    },
    hover: {
      intersect: false,
    },
    scales: {
      x: {
        color: isDarkMode ? '#262626' : undefined,
        grid: {
          borderDash: [10],
          color: isDarkMode ? '#262626' : undefined,
        },
      },
      y: {
        display: true,
        grid: {
          display: false,
        },
      },
    },
  };

  let demoData = {
    labels: [
      'jan',
      'feb',
      'march',
      'apr',
      'may',
      'june',
      'july',
      'august',
      'sep',
      'october',
      'nov',
      'dec',
    ],
    datasets: [
      {
        data: [8, 7, 1, 5, 4, 7.4, 6, 4, 2, 4, 9, 2],
        borderColor: "linear-gradient(170.52deg, #747474 -13.83%, rgba(35, 35, 35, 0) 91.64%)",
        pointBorderColor: 'transparent',
        pointBorderWidth: 6,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  useEffect(() => {
    if (document.getElementById('chart')) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <GraphChartContainer>
      {/* <GraphChartContainerHeader>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <GraphChartContainerButton id='active'>Ethereum</GraphChartContainerButton>
          <GraphChartContainerButton>Bitcoin</GraphChartContainerButton>
        </div>
        <GraphChartContainerSelect>
          <option value="monthly">Monthly</option>
        </GraphChartContainerSelect>
      </GraphChartContainerHeader> */}
      {isLoaded ? (
        data() && (
          <Line
            height={200}
            id="chart"
            data={data()}
            options={options ? options : demoOptions}
            style={{height: '276px'}}
          />
        )
      ) : (
        <Line
          height={200}
          id="chart"
          data={demoData}
          options={options ? options : demoOptions}
          style={{height: '276px'}}
        />
      )}
    </GraphChartContainer>
  );
};

export const TopBar = ({ title, showDurationButtons, children }) => {
  return (
    <>
      <GraphBoxTopContainer>
        <GraphTopTitleText>{title}</GraphTopTitleText>
        {showDurationButtons && (
          <GraphTopTextWrapper>{children}</GraphTopTextWrapper>
        )}
      </GraphBoxTopContainer>
    </>
  );
};

export default function LineGraphBox({
  data,
  options,
  title,
  showDurationButtons = true,
  onClick1,
  onClick7,
  onClick30,
  onClick365,
  isBold = 30,
  height,
}) {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const durations = {
    1: 'Yesterday',
    7: '7 Days',
    30: '30 Days',
    365: '12 Months',
  };
  return (
    (<GraphContainer>
      <TopBar showDurationButtons={showDurationButtons} title={title}>
        <FilterDropdownButton width={'100%'} onClick={handleClick}>
          <FilterDropdownText style={{marginRight: "6px"}}>{t("Last")}{durations[isBold]}</FilterDropdownText>
          <CollectiveWalletDownIcon color={theme.palette.text.primary} />
        </FilterDropdownButton>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          disableScrollLock={false}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflowY: 'hidden',
              overflowX: 'hidden',
              mt: 1,
              ml: 0,
              maxWidth: 350,
              maxHeight: 'auto',
              width: '100%',
              height: 'auto',
              borderRadius: '10px',
              backgroundColor: theme.palette.background.inverse,
              color:  theme.palette.text.inverse,
            },
          }}
        >
          <FilterDropdownItemWrap onClick={onClick1}>{t("Yesterday")}</FilterDropdownItemWrap>
          <FilterDropdownItemWrap onClick={onClick7}>{t("7 Days")}</FilterDropdownItemWrap>
          <FilterDropdownItemWrap onClick={onClick30}>{t("30 Days")}</FilterDropdownItemWrap>
          <FilterDropdownItemWrap onClick={onClick365}>{t("365 Days")}</FilterDropdownItemWrap>
        </Menu>

        {/* <GraphBtnCont>
          <ButtonGroup
            color="inherit"
            size="large"
            variant="outlined"
            aria-label="outlined button group"
          >
            {onClick1 && (
              <GraphButton
                onClick={onClick1}
                isActive={isBold === 1}
                isRightBorder={is1Border}
                flatLeftBorderRadius={is1Border}
              >
                Yesterday
              </GraphButton>
            )}

            {onClick7 && (
              <GraphButton
                onClick={onClick7}
                isActive={isBold === 7}
                isRightBorder={is7Border}
              >
                7 Days
              </GraphButton>
            )}

            {onClick30 && (
              <GraphButton
                onClick={onClick30}
                isActive={isBold === 30}
                isRightBorder={is30Border}
              >
                30 Days
              </GraphButton>
            )}

            {onClick365 && (
              <GraphButton
                onClick={onClick365}
                isActive={isBold === 365}
                isRightBorder={is365Border}
                flatRightBorderRadius
              >
                12 Months
              </GraphButton>
            )}
          </ButtonGroup>
        </GraphBtnCont> */}
      </TopBar>
      <LineGraph height={height} data={data} options={options} />
    </GraphContainer>)
  );
}
