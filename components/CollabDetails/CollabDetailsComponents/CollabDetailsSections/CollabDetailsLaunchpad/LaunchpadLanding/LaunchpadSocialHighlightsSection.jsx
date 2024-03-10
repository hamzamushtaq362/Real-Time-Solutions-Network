import { DividingHeaderRow } from './DividingHeaderRow';
import { Spacer } from '~/components';
import { Box } from '@mui/material';
import { WorksGridContainer } from '../BTSSection/elements';
import { getSocialEmbed } from '../utils';

export const LaunchpadSocialHighlightsSection = ({ collabDetails }) => {
  const socialHighlights = collabDetails?.socialHighlights;

  const groupSocialHighlights = (socialHighlights) => {
    // Create an object to store grouped social highlights
    const groupedHighlights = {};

    // Iterate through the social highlights
    socialHighlights.forEach((highlight) => {
      const { url } = highlight;

      // Extract the platform from the URL (e.g., 'instagram', 'twitter')
      const platform = url.split('/')[2];

      // If the platform is not in the groupedHighlights object, create an array for it
      if (!groupedHighlights[platform]) {
        groupedHighlights[platform] = [];
      }

      // Add the social highlight to the corresponding platform array
      groupedHighlights[platform].push({ url });
    });

    // Convert the groupedHighlights object to an array of arrays
    return Object.values(groupedHighlights);
  };

  const socialHighlightsAllRows = groupSocialHighlights(socialHighlights);


  return (
    <>
      <DividingHeaderRow title="Social Highlights" />
      <Spacer value={30} />

      <Box px={3}>
        {socialHighlightsAllRows?.map((socialHighlightsRow, index) => (
          <>
            <WorksGridContainer key={index} mb={4}>
              {socialHighlightsRow.map((socialHighlight, index) => (
                <Box key={index} mr={3}>
                  {getSocialEmbed(socialHighlight.url)}
                </Box>
              ))}
            </WorksGridContainer>
          </>
        ))}
      </Box>
    </>
  );
};
