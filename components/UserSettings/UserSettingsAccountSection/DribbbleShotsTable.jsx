import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  useTheme,
} from '@mui/material';
import {
  Avatar,
  SearchSelectAutocomplete,
  TextField,
  Tooltip,
  SmallSpinner,
} from '~/components';
import { DropdownUser } from 'components/Dropdown/DropdownUser';
import { StyledChip } from 'components/Chip';
import { FlexBox } from 'components/common/elements';
import DropdownEmailAvatar from 'components/Dropdown/DropdownEmailAvatar';
import { UilTimes } from '@iconscout/react-unicons';
import useSearch from 'hooks/useSearch';
import { useTranslation } from 'react-i18next';
import { IOSSwitch } from 'components/Dropdown/elements';
import {
  LiveText,
  StyledCell,
  StyledHeadCell,
} from 'components/UserSettings/UserSettingsAccountSection/elements';
import NewButton from 'components/Button/NewButton';
import axios from 'axios';
import { BASE_URL } from '~/apis';
import { useNotistack } from '~/hooks';
import { useRouter } from 'next/router';

const columns = [
  { id: 'collabName', label: 'Collab Name', width: 300 },
  { id: 'members', label: 'Collaborators', width: 270 },
  { id: 'draft', label: 'Draft', width: 100 },
];

const DribbbleShotsTable = ({
  shots,
  setShots,
  rows,
  setRows,
  onClose,
  updateCollaborators,
  updateDraftStatus,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const {
    userSearchItems,
    setSearchString,
    loading: searchLoading,
  } = useSearch();
  const generateSnackbar = useNotistack();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSelectAllClick = (event) => {
    setRows(
      rows.map((row) => ({
        ...row,
        selected: event.target.checked,
      })),
    );
  };

  const handleSelectClick = (event, id) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, selected: event.target.checked } : row,
      ),
    );
  };

  const handleCollaboratorsChange = (shotId, newCollaborators) => {
    updateCollaborators(shotId, newCollaborators);
  };

  const handleImport = async () => {
    try {
      setLoading(true);

      await axios.post(`${BASE_URL}/api/v1/dribbble/create-collabs`, {
        shots: rows
          .filter((row) => row.selected && !row.isImported)
          .map((row) => ({
            ...row,
            image: shots.find((shot) => shot.id === row.id)?.images?.hidpi,
            status: row.draft ? 'live' : 'draft',
            members: row.members.map((user) => {
              return typeof user === 'string'
                ? { type: 'externalUser', label: user }
                : user;
            }),
            source: 'external',
          })),
      });
      generateSnackbar(
        'Successfully imported shots. Redirecting to collabs page',
        'success',
      );
      onClose();
      router.push('/collab/explore?view=created');
      setTimeout(() => {
        setRows([]);
        setShots([]);
        setLoading(false);
      }, 1000);
    } catch (e) {
      generateSnackbar('An error occurred while saving', 'error');
      setLoading(false);
    }
  };

  return (
    <div style={{ height: 400, width: '100%', overflowY: 'scroll' }}>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
          <EnhancedTableHead
            numSelected={rows.filter((row) => row.selected).length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={rows.length}
          />
          <TableBody>
            {rows.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <Tooltip
                  key={index}
                  disabled={!row.isImported}
                  title="This shot is already imported"
                >
                  <TableRow
                    tabIndex={-1}
                    key={row.collabName}
                    sx={{
                      backgroundColor:
                        index % 2 === 1 ? '#FAFAFA' : 'transparent',
                      borderBottom: `1.5px solid #E4E4E7`,
                    }}
                  >
                    <StyledCell
                      id={labelId}
                      align="left"
                      width={320}
                      sx={{ paddingLeft: '62px' }}
                    >
                      <FlexBox>
                        <Checkbox
                          color="primary"
                          checked={row.selected}
                          onChange={(event) => handleSelectClick(event, row.id)}
                          disabled={row.isImported}
                        />
                        <Avatar
                          size={28}
                          avatar={row.image}
                          borderRadius="4px"
                        />
                        <Box ml={1}>{row.collabName}</Box>
                      </FlexBox>
                    </StyledCell>
                    <StyledCell width={380} sx={{ padding: 0 }}>
                      <SearchSelectAutocomplete
                        freeSolo
                        value={row.members}
                        options={userSearchItems}
                        getOptionLabel={(option) =>
                          option.input ? option.label : option
                        }
                        onChange={(event, newValue) => {
                          handleCollaboratorsChange(row.id, newValue);
                        }}
                        loading={searchLoading}
                        onInputChange={(event) => {
                          setSearchString(event?.target?.value);
                        }}
                        placeholder={t('Add Collaborators')}
                        noOptionsText={t('No Results')}
                        renderOption={(props, option) => (
                          <DropdownUser props={props} option={option} />
                        )}
                        disabled={row.isImported}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <StyledChip
                              key={index}
                              variant="outlined"
                              label={
                                <FlexBox>
                                  <Avatar
                                    size={22}
                                    avatar={
                                      option.image || (
                                        <DropdownEmailAvatar size={22} />
                                      )
                                    }
                                    withBorder={true}
                                    borderColor={theme.palette.grey.common}
                                  />
                                  <Box ml={1}>{option.label || option}</Box>
                                </FlexBox>
                              }
                              size="small"
                              deleteIcon={
                                <UilTimes
                                  color={theme.palette.text.label}
                                  size="22"
                                />
                              }
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                        limitTags={3}
                        listItemPadding="28px 16px"
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              placeholder={
                                row.members?.length > 0
                                  ? ''
                                  : t('Add Collaborators')
                              }
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                  <React.Fragment>
                                    {searchLoading ? (
                                      <SmallSpinner inverse />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                  </React.Fragment>
                                ),
                              }}
                              border="none"
                              padding="0"
                              disabled={row.isImported}
                            />
                          );
                        }}
                      />
                    </StyledCell>
                    <StyledCell>
                      <FlexBox>
                        <IOSSwitch
                          checked={row.draft}
                          onChange={() => updateDraftStatus(row.id)}
                          hovered={true}
                          disabled={row.isImported}
                        />
                        <LiveText sx={{ opacity: row.draft ? 1 : 0 }}>
                          Live
                        </LiveText>
                      </FlexBox>
                    </StyledCell>
                  </TableRow>
                </Tooltip>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <FlexBox mt={4} justifyContent="center">
        <NewButton width={300} onClick={handleImport} disabled={loading}>
          {loading ? 'Creating Collabs ...' : 'Import'}
        </NewButton>
      </FlexBox>
    </div>
  );
};

export default DribbbleShotsTable;

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead sx={{ backgroundColor: '#FAFAFA' }}>
      <TableRow sx={{ borderBottom: `1.5px solid #E4E4E7` }}>
        {columns.map((headCell, index) => (
          <StyledHeadCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sx={{ paddingLeft: index === 0 && '62px' }}
          >
            {index === 0 && (
              <Checkbox
                color="primary"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
              />
            )}
            <TableSortLabel onClick={() => {}}>{headCell.label}</TableSortLabel>
          </StyledHeadCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
