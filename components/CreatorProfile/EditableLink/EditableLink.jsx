import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { EditingUi } from './EditingUi/EditingUi';
import { DisplayLinkUi } from './DisplayLinkUi/DisplayLinkUi';

const EditableLink = ({
  index,
  control,
  dropdownArray,
  remove,
  toggleEdit,
  watch,
  item,
  onSave,
  loading,
  parentName
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isEditing, metaTitle, value } = item;

  return (
    <Grid
      container
      spacing={2}
      sx={{ position: 'relative', alignItems: 'center' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isEditing ?
        <EditingUi
          {...{
            index,
            control,
            dropdownArray,
            remove,
            onSave,
            watch,
            loading,
            parentName
          }}
        />:
        <DisplayLinkUi
          {...{
            isHovered,
            index,
            metaTitle,
            link: value,
            toggleEdit
          }}
        />
      }
    </Grid>
  );
};

export default EditableLink;
