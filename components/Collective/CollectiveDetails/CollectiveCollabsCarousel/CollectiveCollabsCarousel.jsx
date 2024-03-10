import { useTranslation } from 'react-i18next';
import Carousel from 'components/Carousel/Carousel';
import { CollabTile } from 'components/CollabCommon';
import { collabCarouselResponsiveRules } from 'components/DashboardHome/elements';
import React, { useState } from 'react';
import { NoCollabsFountText } from './elements';

export const CollectiveCollabsCarousel = ({ collabs, collectiveLink }) => {
  const { t } = useTranslation();

  const [loading] = useState(false);

  return (
    (<div>
      <Carousel settings={collabCarouselResponsiveRules}>
        {!loading &&
          (collabs && collabs?.length > 0 ? (
            collabs.map((collab, index) => (
              <CollabTile
                key={collab._id}
                index={index}
                title={collab.title}
                description={collab.description}
                collectiveCollab={true}
                id={collab._id}
                identifier={collab.identifier}
                collectiveLink={collectiveLink}
              />
            ))
          ) : (
            <NoCollabsFountText style={{ marginTop: '1rem' }}>{t("No Collabs")}</NoCollabsFountText>
          ))}
      </Carousel>
    </div>)
  );
};
