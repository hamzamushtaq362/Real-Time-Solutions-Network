import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  PrimaryButton,
  CurationNegotiationAcceptRejectDialog,
  HeadTableCell,
  BodyTableCell,
} from '~/components';
import {
  DesiredFeeText,
  NoteToAdmin,
  CurationActionCellContainer,
} from './elements';
import { CollabDescription } from './CollabDescription';
import { CuratorStatusCell } from '../CurationComponents';

import { getApplicationStatusMappings } from '~/constants';
import { TableHead, TableRow } from '@mui/material';

const CurationActionCell = ({ status, onShowNegotiationDetails }) => {
  const { t } = useTranslation();

  return (
    (<CurationActionCellContainer>
      {status === 'NEGOTIATED' ? (
        <PrimaryButton width="160px" onClick={onShowNegotiationDetails}>{t("Show Details")}</PrimaryButton>
      ) : (
        <></>
      )}
    </CurationActionCellContainer>)
  );
};

export const CurationsTableHead = () => {
  const { t } = useTranslation();

  return (
    (<TableHead sx={{ width: '100%' }}>
      <TableRow>
        <HeadTableCell borderRight align="left" width="340px">{t("Collab")}</HeadTableCell>
        <HeadTableCell borderRight align="left" width="120px">{t("Desired Fees")}</HeadTableCell>
        <HeadTableCell borderRight align="left" width="340px">{t("Note to Admin")}</HeadTableCell>
        <HeadTableCell borderRight align="left" width="120px">{t("Status")}</HeadTableCell>
        <HeadTableCell borderRight align="left" width="120px">{t("Final Fees")}</HeadTableCell>
        <HeadTableCell align="left" width="220px">{t("Actions")}</HeadTableCell>
      </TableRow>
    </TableHead>)
  );
};

export const CuratorsTableRow = ({
  curation,
  updatedFilteredCurationStatusOnNegotiation,
  onAcceptedCuration,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      {/* Dialogs Rendering Start */}
      {curation.status === 'NEGOTIATED' && (
        <CurationNegotiationAcceptRejectDialog
          open={dialogOpen}
          handleClose={() => setDialogOpen(false)}
          curation={curation}
          updatedFilteredCurationStatusOnNegotiation={
            updatedFilteredCurationStatusOnNegotiation
          }
          onAcceptedCuration={onAcceptedCuration}
        />
      )}
      {/* Dialogs Rendering Ends */}

      <TableHead sx={{ width: '100%' }}>
        <TableRow>
          <BodyTableCell borderRight>
            <CollabDescription collabDetails={curation.collab} />
          </BodyTableCell>
          <BodyTableCell borderRight align="center" width="120px">
            <DesiredFeeText>
              {curation?.curatorDemandedEarning || 0}%
            </DesiredFeeText>
          </BodyTableCell>
          <BodyTableCell borderRight align="left" width="300px">
            <NoteToAdmin>{curation?.noteToAdmin}</NoteToAdmin>
          </BodyTableCell>
          <BodyTableCell borderRight align="left" width="120px">
            <CuratorStatusCell
              statusDetails={getApplicationStatusMappings(curation?.status)}
            />
          </BodyTableCell>
          <BodyTableCell borderRight align="center" width="120px">
            {curation.status === 'ACCEPTED' && (
              <DesiredFeeText>{curation?.finalEarning || 0}%</DesiredFeeText>
            )}
            {curation.status === 'NEGOTIATED' && (
              <DesiredFeeText>
                {curation?.subsequentNegotiationEarning || 0}%
              </DesiredFeeText>
            )}
          </BodyTableCell>
          <BodyTableCell padding="0px" align="left" width="380px">
            <CurationActionCell
              onShowNegotiationDetails={() => setDialogOpen(true)}
              status={curation?.status}
            />
          </BodyTableCell>
        </TableRow>
      </TableHead>
    </>
  );
};
