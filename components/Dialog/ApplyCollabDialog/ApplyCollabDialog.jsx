import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { Spacer, PrimaryButton, StyledInput } from '~/components';
import {
  ApplyCollabContentContainer,
  AvatarHeaderText,
  ApplyCollabContainer,
  DialogLabelText,
  ApplyCollabMainHeader,
  ApplyCollabTitleHeader,
} from './elements';
import { Dialog } from '../elements';
import { Box, useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  setCurrentDialog,
  fetchRefreshToken,
  reFetchTokenExpire,
} from '~/redux';
import { BASE_URL } from '~/apis';
import axios from 'axios';
import { useNotistack } from '~/hooks';
import { trackMixPanel } from '~/utils';
import { Dropdown } from 'components/Dropdown/Dropdown';
import { COLLAB_PAYMENT_TYPES, COLLAB_PAYMENT_MODE } from 'constants/collab';
import StyledTextarea from 'components/Input/StyledTextarea';

export const ApplyCollabDialog = ({
  open,
  handleClose,
  collab,
  setCollabAssociationDetails,
  selectedWalletForCollab,
  setSelectedWalletForCollab,
  user,
}) => {
  const { t } = useTranslation();

  const [compensationType, setCompensationType] = useState('');
  const [compensationMethod, setCompensationMethod] = useState(null);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [personalNote, setPersonalNote] = useState('');
  const [memberRoleObject, setMemberRoleObject] = useState('');
  const [rolesDetailArray, setrolesDetailArray] = useState([]);
  const isLargeDevice = useMediaQuery(`(min-width: ${1800}px)`);

  const dispatch = useDispatch();
  const generateSnackbar = useNotistack();

  useEffect(() => {
    if (setSelectedWalletForCollab) {
      setSelectedWalletForCollab(user.addresses[0]);
    }
  }, []);

  useEffect(() => {
    if (collab && collab?.roles && collab?.roles?.length > 0) {
      setSelectedRole(collab?.roles[0].skill);
      setrolesDetailArray(collab?.roles);
      setMemberRoleObject(collab?.roles[0]);
      setCompensationType(collab?.roles[0].paymentType);
      setCompensationMethod(collab?.roles[0].paymentMode);
      setAmount(collab?.roles[0].amount);
    }
  }, [collab]);

  const requestToJoinCollab = async () => {
    try {
      setLoading(true);
      let obj = {
        memberRole: {
          paymentMode: memberRoleObject.paymentMode,
          paymentType: memberRoleObject.paymentType,
          amount: memberRoleObject.amount,
          skill: memberRoleObject.skill,
        },
        personalNote,
      };

      if (negOpen) {
        if (compensationType || compensationMethod) {
          const memberNegotiation = {
            paymentMode: compensationMethod,
            paymentType: compensationType && compensationType,
            amount: amount && amount,
            skill: selectedRole,
          };

          obj = { ...obj, memberNegotiation };
        }
      }

      const f1 = async () => {
        const res = await axios.post(
          `${BASE_URL}/api/v1/collabmember?source=${'internal'}`,
          {
            collabId: collab?._id,
            memberRole: obj.memberRole && obj.memberRole,
            memberNegotiation: obj.memberNegotiation && obj.memberNegotiation,
            personalNote: obj.personalNote && obj.personalNote,
            selectedWalletForCollab,
            senderId: collab?.creatorId?._id,
          },
        );
        if (res) return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res.data.status === 'fail-discord') {
        alert(res.data.message);
      }
      if (res.data.status === 'success') {
        generateSnackbar('Applied Successfully!', 'success');
        dispatch(setCurrentDialog(''));
        setCollabAssociationDetails(res.data.data.collabMember);
        trackMixPanel('Apply_Collab');
      }
      setLoading(false);
    } catch (err) {
      const { message } = err.response.data || {};
      generateSnackbar(message || 'Something went wrong!', 'error');
      setLoading(false);
      dispatch(setCurrentDialog(''));
    }
  };

  // negotiate
  const [negOpen] = useState(false);

  // const handleNegotiate = () => {
  //   setNegOpen(!negOpen);
  // };

  const updateMemberRoleObject = (selectedRole) => {
    const roleDetails = rolesDetailArray.filter((roleObj) => {
      return roleObj.skill == selectedRole;
    });

    setMemberRoleObject(roleDetails[0]);
  };

  useEffect(() => {
    updateMemberRoleObject(selectedRole);
  }, [selectedRole]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      width={isLargeDevice ? '50%' : '80%'}
    >
      <ApplyCollabContainer>
        {/* <ApplyImageContainer>
          <ApplyImage src={collab?.images[0]} />
        </ApplyImageContainer> */}
        <Box flex={1} height="100%">
          <ApplyCollabContentContainer>
              <ApplyCollabMainHeader>
                {t('Apply to Join')}
                <ApplyCollabTitleHeader>
                  {collab.title ? collab.title : ''}
                </ApplyCollabTitleHeader>
              </ApplyCollabMainHeader>
              <>

              </>

            {/* <DialogHeaderText>
              {t('Apply to Join Collab Name')}
            </DialogHeaderText>

            <DialogLabelText>
              {t('Please confirm the details to Apply to the Collab')}
            </DialogLabelText> */}

            {/* <FlexBox
              mt={4}
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box flex={1}>
                <DialogLabelText>{t('Collab')}</DialogLabelText>
                <DialogValueText>
                  {collab.title ? collab.title : '-'}
                </DialogValueText>
              </Box>
              <Box flex={1}>
                <User
                  users={[collab.creatorId]}
                  avatarSize={32}
                  avatarSpacing={1}
                />
              </Box>
            </FlexBox> */}

            <Spacer value={52} />

            <Box mt={1} mb={2}>
              <DialogLabelText mb={1}>
                {t('Select the Collaborator spot you would like to apply')}
              </DialogLabelText>

              <Dropdown
                selectedItem={selectedRole}
                setSelectedItem={(value) => setSelectedRole(value)}
                width="100%"
                options={collab?.roles?.map(({ skill }) => skill)}
                disabled={collab?.roles?.length === 1}
              />
            </Box>

            {selectedRole &&
              user &&
              user.addresses &&
              user.addresses.length > 1 && (
                <div>
                  <div className="negotiate-details-1">
                    <div
                      style={{ color: '#000', fontWeight: '500' }}
                      className="negotiate-details-1-c"
                    >
                      <AvatarHeaderText>
                        {t('Select Wallet For Collab')}
                      </AvatarHeaderText>
                    </div>
                  </div>
                  <div className="invitep-box">
                    <select
                      onChange={(e) => {
                        setSelectedWalletForCollab(e.target.value);
                      }}
                      className="invitep-box-inp"
                      id="invitep-box-labeld"
                    >
                      {user &&
                        user.addresses &&
                        user.addresses.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              )}
            <Spacer value={32} />

            {/* {memberRoleObject && (
              <FlexBox
                alignItems="flex-end"
                justifyContent="space-between"
                mt={4}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <Box>
                    <DialogLabelText>{t('Payment Method')}</DialogLabelText>
                    <DialogValueText>
                      {collab &&
                        selectedRole &&
                        memberRoleObject &&
                        memberRoleObject.paymentMode}
                    </DialogValueText>
                  </Box>

                  <Box>
                    <DialogLabelText>{t('Amount')}</DialogLabelText>
                    <DialogValueText>
                      {getAmountAndType(memberRoleObject)}
                    </DialogValueText>
                  </Box>
                </Box>

                <Box flex={1} ml={4}>
                  <NegotiateLink onClick={handleNegotiate}>
                    {!negOpen ? 'Click to Negotiate' : 'Cancel Negotiation'}
                  </NegotiateLink>
                </Box>
              </FlexBox>
            )} */}

            {/* <Spacer value={32} /> */}

            {negOpen && (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    columnGap: '15px',
                    marginBottom: '20px',
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Dropdown
                      options={Object.values(COLLAB_PAYMENT_MODE)}
                      selectedItem={compensationMethod}
                      setSelectedItem={(value) => {
                        setCompensationMethod(value);
                        if (value === COLLAB_PAYMENT_MODE.RevenueSharing) {
                          setCompensationType('');
                        }
                      }}
                      width="100%"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      columnGap: '5px',
                      flex: 1,
                    }}
                  >
                    {compensationMethod !== COLLAB_PAYMENT_MODE.NoPayment ? (
                      <>
                        {compensationMethod ===
                        COLLAB_PAYMENT_MODE.RevenueSharing ? (
                          <>
                            <StyledInput
                              placeholder="%"
                              type="number"
                              value={
                                amount >= 0 && amount <= 99
                                  ? parseInt(amount)
                                  : 0
                              }
                              onChange={(e) => {
                                setAmount(e.target.value);
                              }}
                              height={40}
                            />
                          </>
                        ) : (
                          <>
                            <Box sx={{ flex: 1 }}>
                              <Dropdown
                                options={Object.keys(COLLAB_PAYMENT_TYPES)}
                                selectedItem={compensationType}
                                setSelectedItem={(value) =>
                                  setCompensationType(value)
                                }
                                width="100%"
                              />
                            </Box>

                            <Box sx={{ flex: 1 }}>
                              <StyledInput
                                defaultValue={0}
                                value={amount}
                                placeholder="Amount"
                                type="number"
                                onChange={(e) => {
                                  setAmount(e.target.value);
                                }}
                                height={40}
                              />
                            </Box>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </Box>
                </Box>
              </>
            )}

            <Spacer value={32} />

            {selectedRole && (
              <Box mt={4} mb={2}>
                <DialogLabelText mb={1}>
                  {t('Add Personal Note to submit with your request')}
                </DialogLabelText>
                <StyledTextarea
                  name={'personalNote'}
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e.target.value)}
                  fullWidth
                  placeholder={t('Add personal note')}
                  rows={4}
                  maxLength={3200}
                />
              </Box>
            )}

            {/*{compensationMethod === COLLAB_PAYMENT_MODE.FixedPayment && (*/}
            {/*  <FlexBox my={3.8}>*/}
            {/*    <InfoIcon*/}
            {/*      width={22}*/}
            {/*      height={22}*/}
            {/*      color={theme.palette.text.primary}*/}
            {/*    />*/}
            {/*    <InfoText>*/}
            {/*      {t(*/}
            {/*        'Once you apply for this position after that collabs admin will\n                  accept and add fund in Vault',*/}
            {/*      )}*/}
            {/*    </InfoText>*/}
            {/*  </FlexBox>*/}
            {/*)}*/}

            <Box
              sx={{ width: '100%' }}
              my={
                memberRoleObject?.paymentMode ===
                COLLAB_PAYMENT_MODE.FixedPayment
                  ? 2
                  : 4
              }
            >
              <PrimaryButton
                disabled={!selectedRole || loading}
                onClick={() => {
                  requestToJoinCollab();
                }}
              >
                {loading ? 'Applying...' : 'Apply to Collab'}
              </PrimaryButton>
            </Box>
            <Spacer value={8} />
          </ApplyCollabContentContainer>
        </Box>
      </ApplyCollabContainer>
    </Dialog>
  );
};
