import React, { useEffect, useState } from 'react';
import { CollabTemplateTile, CollabTile, SectionHeader } from '~/components';
import Carousel from '../Carousel/Carousel';
import {
  collabCarouselResponsiveRules,
  DashboardSectionContainer,
} from './elements';
import { useRouter } from 'next/router';
import { fetchCollabTemplates } from '~/apis';
import { useTranslation } from 'react-i18next';

const Templates = () => {
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const [templates, setTemplates] = useState([]);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    getTemplates();
  }, []);

  const getTemplates = async () => {
    try {
      setTemplatesLoading(true);
      const res = await fetchCollabTemplates(1, 12, true);

      setTemplates(res.collabTemplates);
      setTemplatesLoading(false);
    } catch (err) {
      setTemplates([]);
      setTemplatesLoading(false);
    }
  };

  return (
    <DashboardSectionContainer px={4}>
      <SectionHeader
        text={t('Start with a Template')}
        buttonText={t('Explore All')}
        buttonOnClickHandler={() => router.push('/collab/template/explore')}
      />
      <>
        {!templatesLoading ? (
          <>
            {templates && templates?.length > 0 ? (
              <Carousel settings={collabCarouselResponsiveRules}>
                {templates.map((template, index) => (
                  <CollabTemplateTile
                    sx={{ width: 340 }}
                    key={template?._id}
                    identifier={template?.identifier}
                    index={index}
                    title={template?.title}
                    id={template?._id}
                    tags={template?.tags}
                    platformType={template?.platformType}
                  />
                ))}
              </Carousel>
            ) : (
              <></>
            )}
          </>
        ) : (
          <Carousel settings={collabCarouselResponsiveRules}>
            {[...Array(9)].map((index) => (
              <CollabTile key={index} isLoading isTemplate={true} />
            ))}
          </Carousel>
        )}
      </>
    </DashboardSectionContainer>
  );
};

export default Templates;
