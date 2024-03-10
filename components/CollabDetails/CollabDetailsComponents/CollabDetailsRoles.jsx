import React from 'react';
import { SideDetailsLabelValue } from './CollabDetailsComponents';
import { getAmountAndType } from '~/utils';
import { RightPaneLabel } from './elements';
import { useTranslation } from 'react-i18next';

const CollabDetailsRoles = ({ roles }) => {
  const { t } = useTranslation();
  return (
    <>
      {roles && roles?.length > 0 && (
        <RightPaneLabel>{t("Looking for")}</RightPaneLabel>
      )}

      {roles &&
        roles.map((role) => {
          return (
            <>
              <SideDetailsLabelValue
                label={role.skill}
                value={getAmountAndType(role)}
              />
            </>
          );
        })}
    </>
  );
};

export default CollabDetailsRoles;
