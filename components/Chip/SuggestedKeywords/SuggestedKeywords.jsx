import React from 'react';
import { Box, Chip } from '@mui/material';

import { SuggestedKeywordsHeader } from '../elements';

function SuggestedKeywords({ onSelectSkill, availableSkills }) {
  return (
    <Box display="flex" flexWrap="wrap" alignItems="center" gap="1rem">
      <SuggestedKeywordsHeader>Suggested : </SuggestedKeywordsHeader>
      {availableSkills &&
        availableSkills.map((skill) => (
          <SkillChip
            key={skill}
            skill={skill}
            onSelect={() => onSelectSkill(skill)}
          />
        ))}
    </Box>
  );
}

function SkillChip({ skill, onSelect }) {
  return (
    <Chip style={{ margin: '0 4px 4px 0' }} label={skill} onClick={onSelect} />
  );
}

export default SuggestedKeywords;
