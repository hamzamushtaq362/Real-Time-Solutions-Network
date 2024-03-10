import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import {
  Spacer,
  Divider,
  Autocomplete,
  BadgeLabel,
  NormalInput,
  PrimaryButton,
  Spinner,
} from '~/components';
import {
  BecomeCuratorContainer,
  FieldHeaderText,
  InterestedCollabsLabelsContainer,
  InfoText,
  ButtonContainer,
} from './elements';
import { DialogHeaderText, Dialog } from '../elements';
import { useNotistack, useLocalStorage } from '~/hooks';
import { becomeCurator } from '~/apis';
import { useTheme } from '@mui/material';
import tagsJson from 'constants/tags.json';

export const BecomeCuratorDialog = ({ open, handleClose, setAuthChanges }) => {
  const { t } = useTranslation();

  const theme = useTheme();
  const collabTypesFieldMessage = {
    text: 'No interested collabs selected',
    color: theme.palette.grey.normal5,
  };
  const desiredEarningFieldMessage = {
    text: '',
    color: theme.palette.grey.normal5,
  };

  const [interestedCollabs, setInterestedCollabs] = useState([]);
  const [selectedInterestedCollabs, setSelectedInterestedCollabs] = useState(
    [],
  );
  const [desiredEarning, setDesiredEarning] = useState(null);

  const [selectedCollabTypesMessage, setSelectedCollabTypesMessage] = useState(
    collabTypesFieldMessage,
  );

  const [desiredEarningMessage, setDesiredEarningMessage] = useState(
    desiredEarningFieldMessage,
  );
  const [auth, setAuth] = useLocalStorage('auth');
  const [loading, setLoading] = useState(false);

  const generateSnackbar = useNotistack();

  useEffect(() => {
    let interestedCollabsOptions = [];
    tagsJson.tags.forEach((i) => {
      interestedCollabsOptions.push({ label: i, value: i });
    });
    setInterestedCollabs(interestedCollabsOptions);
  }, []);

  const onInterestedCollabSelect = (selectedCollabType) => {
    setSelectedInterestedCollabs((prevState) => {
      return [...prevState, selectedCollabType];
    });

    setInterestedCollabs((prevState) => {
      return prevState.filter(
        (collabType) => collabType !== selectedCollabType,
      );
    });
  };

  const removeSelectedInterestedCollab = (collabType) => {
    const removedCollabType = selectedInterestedCollabs.find(
      (interestedCollabType) => interestedCollabType === collabType,
    );

    setSelectedInterestedCollabs((prevState) => {
      return prevState.filter((collabType) => collabType !== removedCollabType);
    });

    setInterestedCollabs((prevState) => {
      return [removedCollabType, ...prevState];
    });
  };

  const handleDesiredEarning = (event) => {
    setDesiredEarning(event.target.value);
  };

  const resetErrorState = () => {
    setSelectedCollabTypesMessage(collabTypesFieldMessage);
    setDesiredEarningMessage(desiredEarningFieldMessage);
  };

  const resetFormState = () => {
    setSelectedInterestedCollabs([]);
    setDesiredEarning(null);
    resetErrorState();
  };

  const onSubmit = async () => {
    if (selectedInterestedCollabs.length === 0 || !desiredEarning) {
      if (selectedInterestedCollabs.length === 0) {
        setSelectedCollabTypesMessage({
          text: 'Please select atleast one collab type to continue',
          color: theme.palette.red.main,
        });
      }

      if (!desiredEarning) {
        setDesiredEarningMessage({
          text: 'Please enter your desired earning %',
          color: theme.palette.red.main,
        });
      }

      return;
    }
    resetErrorState();

    try {
      setLoading(true);

      const selectedInterestedCollabsTypes = selectedInterestedCollabs.map(
        ({ value }) => value,
      );

      const response = await becomeCurator(
        desiredEarning,
        selectedInterestedCollabsTypes,
      );

      if (response.status === 'success') {
        generateSnackbar(response.message, 'success');
        setAuth((prevState) => {
          return { ...prevState, isCurator: true };
        });

        handleClose();
        // Update the local storage to set isCurator to be true
        const updatedAuth = { ...auth, isCurator: true };
        setAuth(updatedAuth);
        setAuthChanges(updatedAuth);
      }

      setLoading(false);
    } catch (error) {
      const message = error?.response?.data?.message || 'Something went wrong!';

      generateSnackbar(message, 'error');
      setLoading(false);
    }
  };

  const onDialogClose = () => {
    resetFormState();
    handleClose();
  };

  return (
    (<Dialog open={open} onClose={onDialogClose} width="722px">
      <BecomeCuratorContainer>
        <DialogHeaderText>{t("BECOME A CURATOR")}</DialogHeaderText>
        <Spacer value={16} />
        <Divider />
        <Spacer value={32} />

        {/* Desired Earnings Start */}

        <FieldHeaderText>{t("Desired Earnings")}</FieldHeaderText>

        <Spacer value={20} />

        <NormalInput
          variant="outlined"
          type="number"
          placeholder="%"
          fontWeight={300}
          borderRadius="8px"
          padding="15px 20px"
          name="percentage"
          value={
            desiredEarning >= 0 && desiredEarning <= 99 ? desiredEarning : 0
          }
          handleChange={(event) => handleDesiredEarning(event)}
        />

        {desiredEarningMessage.text ? (
          <>
            <Spacer value={20} />
            <InfoText color={desiredEarningMessage.color}>
              {desiredEarningMessage.text}
            </InfoText>
          </>
        ) : null}

        {/* Desired Earnings End */}

        <Spacer value={50} />

        {/* Interested Collabs Start */}

        <FieldHeaderText>{t("Interested Collabs")}</FieldHeaderText>
        <Spacer value={20} />
        <Autocomplete
          variant="outlined"
          autoCompleteItems={interestedCollabs.filter((i) => {
            return !selectedInterestedCollabs.includes(i);
          })}
          placeholder={t("Select interested collabs")}
          padding="10px"
          onChange={(_, option) => {
            if (option) {
              onInterestedCollabSelect(option);
            }
          }}
          clearOnBlur
        />

        {selectedInterestedCollabs.length > 0 ? (
          <>
            <Spacer value={40} />
            <InterestedCollabsLabelsContainer>
              {selectedInterestedCollabs.map((collab, index) => (
                <>
                  <BadgeLabel
                    key={index}
                    onCross={() => removeSelectedInterestedCollab(collab)}
                    crossable
                    text={collab.value}
                  />
                  <Spacer value={12} type="horizontal" />
                </>
              ))}
            </InterestedCollabsLabelsContainer>
          </>
        ) : (
          <>
            <Spacer value={20} />
            <InfoText color={selectedCollabTypesMessage.color}>
              {selectedCollabTypesMessage.text}
            </InfoText>
          </>
        )}

        {/* Interested Collabs End */}

        <Spacer value={60} />

        <ButtonContainer>
          <PrimaryButton disabled={loading} width="200px" onClick={onSubmit}>
            {!loading ? (
              'Submit'
            ) : (
              <Spinner color={theme.palette.background.default} size={15} />
            )}
          </PrimaryButton>
        </ButtonContainer>
      </BecomeCuratorContainer>
    </Dialog>)
  );
};
