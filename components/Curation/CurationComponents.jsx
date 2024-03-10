import { CuratorStatusChip } from './elements';
import { ImageIcon } from '~/components';
import { useTheme } from '@mui/material';
import { UilInfoCircle } from '@iconscout/react-unicons';

export const CuratorStatusCell = ({ statusDetails }) => {
  const theme = useTheme();
  return (<>
    {statusDetails?.status !== 'NEGOTIATED' && (
      <CuratorStatusChip>
        <ImageIcon icon={statusDetails?.icon} size={'20px'} />{" "}
        {statusDetails?.text}
      </CuratorStatusChip>
    )}
    {statusDetails?.status === 'NEGOTIATED' && (
      <CuratorStatusChip>
        <UilInfoCircle
          size={'20px'}
          color={theme.palette.background.inverse}
        />{" "}
        {statusDetails?.text}
      </CuratorStatusChip>
    )}
  </>);
};
