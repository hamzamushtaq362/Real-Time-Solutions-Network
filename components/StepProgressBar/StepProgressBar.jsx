import { Box } from '@mui/material';
import { Spacer } from '../Spacer';
import { ProgressInactiveBar, ProgressActiveBar } from './elements';

export const StepProgressBar = ({ step, numberOfSteps, sx }) => {
  const INBETWEEN_SPACER = 20;

  return (
    <Box sx={{ display: 'flex', width: '100%', ...sx }}>
      {[...Array(numberOfSteps)].map((element, index) => (
        <>
          {index === step - 1 ? <ProgressActiveBar /> : <ProgressInactiveBar />}
          {index !== numberOfSteps - 1 && (
            <Spacer value={INBETWEEN_SPACER} type="horizontal" />
          )}
        </>
      ))}
    </Box>
  );
};
