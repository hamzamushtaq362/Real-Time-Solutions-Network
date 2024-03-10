import { useTranslation } from 'react-i18next';
import { ErrorOpaqueButton, OpaqueButton, ThreeDots } from '~/components';
import { Box } from '@mui/system';
import { NormalLabelText } from 'components/CollabDetails/CollabDetailsLayouts/elements';
import { useTheme } from '@mui/styles';
import { useState } from 'react';

function MemberCollectiveApproval({ member, apiCall, loading }) {
  const { t } = useTranslation();

  const theme = useTheme();

  const [status, setStatus] = useState(member.status);

  return (
    (<Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: '5rem',
        marginTop: status === 'PENDING' ? '2rem' : '',
      }}
    >
      {status !== 'ACCEPTED' ? (
        <>
          <NormalLabelText fontWeight={600}>{t("Were you part of this Team ?")}</NormalLabelText>

          {member && (
            <div>
              {(status === 'PENDING' || status === 'ACCEPTED') &&
                status !== 'REJECTED' && (
                  <OpaqueButton
                    disabled={status === 'ACCEPTED' ? true : false}
                    onClick={() => {
                      setStatus('ACCEPTED');
                      apiCall('ACCEPTED');
                    }}
                    width="180px"
                    height="34px"
                    sx={{ marginRight: '10px', marginBottom: '10px' }}
                  >
                    {status === 'ACCEPTED' ? 'You Accepted' : 'Accept'}
                  </OpaqueButton>
                )}

              {(status === 'PENDING' || status === 'REJECTED') &&
                status !== 'ACCEPTED' && (
                  <ErrorOpaqueButton
                    disabled={status === 'REJECTED' ? true : false}
                    onClick={() => {
                      setStatus('REJECTED');
                      apiCall('REJECTED');
                    }}
                    width="180px"
                    height="34px"
                    sx={{ marginBottom: '10px', marginRight: '10px' }}
                  >
                    {loading ? (
                      <ThreeDots color={theme.palette.background.inverse} />
                    ) : status === 'REJECTED' ? (
                      'You Rejected'
                    ) : (
                      'REJECT'
                    )}
                  </ErrorOpaqueButton>
                )}
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </Box>)
  );
}

export default MemberCollectiveApproval;
