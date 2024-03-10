import React, { useContext, useEffect, useState } from 'react';
import { CollabTemplateTile } from '~/components';
import { CollabsExploreContainer } from './elements';
import { GridContainer } from 'components/common/elements';
import { fetchCollabTemplates } from '~/apis';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useNotistack } from 'hooks';
import { TemplateEmptyState } from './elements';
import { SecondaryNavbar } from 'components/SecondaryNavbar';
import AppContext from 'context/AppContext';

export const CollabTemplatesExplore = () => {
  const { user } = useContext(AppContext);
  const [templatesLoading, setTemplatesLoading] = useState(false);
  const [collabTemplates, setCollabTemplates] = useState([]);
  const generateSnackbar = useNotistack();

  const { t } = useTranslation();
  const router = useRouter();

  const getCollabTemplates = async () => {
    try {
      setTemplatesLoading(true);
      const res = await fetchCollabTemplates();
      if (res.status === 'success') {
        setCollabTemplates(res.collabTemplates);
      }

      setTemplatesLoading(false);
    } catch (err) {
      setTemplatesLoading(false);
      generateSnackbar('error', 'Error', 'Error fetching collab templates');
    }
  };

  useEffect(() => {
    getCollabTemplates();
  }, []);

  return (
    <>
      <SecondaryNavbar
        title={t('Collab Templates')}
        rightButtonText={t('Create Template')}
        showRightButton={user?.userRole === 'admin'}
        onClickRightButton={() => router.push(`/collab/template/create`)}
      />

      <CollabsExploreContainer>
        <GridContainer>
          {!templatesLoading ? (
            <>
              {collabTemplates?.length > 0 ? (
                <>
                  {collabTemplates.map((template, index) => (
                    <CollabTemplateTile
                      sx={{ width: 400 }}
                      key={template?._id}
                      identifier={template?.identifier}
                      index={index}
                      title={template?.title}
                      id={template?._id}
                      tags={template?.tags}
                      platformType={template?.platformType}
                    />
                  ))}
                </>
              ) : (
                <>
                  <TemplateEmptyState>
                    No collab templates found
                  </TemplateEmptyState>
                </>
              )}
            </>
          ) : (
            <>
              {[...Array(6)].map((_, index) => (
                <CollabTemplateTile key={index} isLoading identifier={index} />
              ))}
            </>
          )}
        </GridContainer>
      </CollabsExploreContainer>
    </>
  );
};
