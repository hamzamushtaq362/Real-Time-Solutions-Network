import { useTranslation } from 'react-i18next';
import {
  AddAddressContentContainer,
  CollectionBottomTabs,
  ModalDescription,
  ChooseAddressTitle,
  ModalAddressTitle,
  ModalAddressGrid,
  ModalAddressCard,
} from './elements';
import { Dialog } from '../elements';
import { Spacer, PrimaryButton } from '~/components';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box } from '@mui/material';
import { getSmallAddress } from '~/utils';
import Image from 'next/image';
import { CrossIcon, WalletIcon, DiamondIcon } from '~/assets';
import MultiValueInput from 'subcomponents/inputs/MultiValueInput';

export const InsightsAddAddressDialog = ({
  open,
  handleClose,
  currentTab,
  handleTabChange,
  isWalletAddressBox,
  addedAddresses,
  contractAddressInput,
  isSubmitButtonClickable,
  handleAddressSubmit,
  deleteAddress,
  setContractAddressInput,
  walletAddressInput,
  setWalletAddressInput,
}) => {
  const { t } = useTranslation();

  return (
    (<Dialog open={open} onClose={handleClose} width="650px">
      <AddAddressContentContainer>
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList textColor="inherit" onChange={handleTabChange}>
              <CollectionBottomTabs
                label={t("+ Add Source")}
                value="1"
                active={currentTab == 1 ? true : false}
              />
              <CollectionBottomTabs
                label={t("Added Sources")}
                value="2"
                active={currentTab == 2 ? true : false}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ModalDescription>{t("Add NFT Contract Address or Wallet Address to view Insights")}</ModalDescription>
            <ChooseAddressTitle>{t("Choose Address type")}</ChooseAddressTitle>

            {/* Newly added */}

            {/* <Spacer value={24} />

            <ChooseRadioContainer>
              <RadioGroup
                row
                name="row-radio-buttons-group"
                value={addSourceRadioValue}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="contract"
                  control={<Radio defaultChecked />}
                  label="Contract"
                  defaultChecked="true"
                  slotProps={{
                    typography: {
                      fontStyle: 'normal',
                      fontWeight: '500',
                      fontSize: '14px',
                      lineHeight: '24px',
                    },
                  }}
                />
                <FormControlLabel
                  value="wallet"
                  control={<Radio />}
                  label="Wallet"
                  slotProps={{
                    typography: {
                      fontStyle: 'normal',
                      fontWeight: '500',
                      fontSize: '14px',
                      lineHeight: '24px',
                    },
                  }}
                />
              </RadioGroup>
            </ChooseRadioContainer>
            {/* </AddImageContainer> */}
            {isWalletAddressBox ? (
              <div>
                <Spacer value={16} />
                <MultiValueInput
                  tags={walletAddressInput}
                  setTags={setWalletAddressInput}
                  placeholder={t("Enter Wallet Address...")}
                />
              </div>
            ) : (
              <div>
                <Spacer value={16} />
                <MultiValueInput
                  tags={contractAddressInput}
                  setTags={setContractAddressInput}
                  placeholder={t("Enter Contract Address...")}
                />
              </div>
            )}
            <Spacer value={24} />
            <div
              style={{
                justifyContent: 'center',
                display: 'flex',
              }}
            >
              <PrimaryButton
                width="168px"
                disabled={isSubmitButtonClickable()}
                onClick={() => {
                  handleAddressSubmit();
                  handleClose();
                }}
              >{t("Add Address")}</PrimaryButton>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <ModalDescription>{t("Check Connected Wallet and Contract")}</ModalDescription>
            <ModalAddressTitle>{t("Added Wallets")}</ModalAddressTitle>
            <ModalAddressGrid>
              {addedAddresses?.mainAddress && (
                <ModalAddressCard>
                  <Image className="img" src={WalletIcon} />
                  <span>{getSmallAddress(addedAddresses?.mainAddress)}</span>
                </ModalAddressCard>
              )}
              {addedAddresses?.wallets && addedAddresses.wallets.length ? (
                addedAddresses.wallets.map((item, index) => (
                  <ModalAddressCard key={index}>
                    <Image className="img" src={WalletIcon} />
                    <span>{getSmallAddress(item)}</span>
                    <Image
                      onClick={() => deleteAddress('wallet', item)}
                      className="img"
                      src={CrossIcon}
                    />
                  </ModalAddressCard>
                ))
              ) : (
                <ModalDescription isMargin={false}>{t("No Added Wallets")}</ModalDescription>
              )}
            </ModalAddressGrid>
            <Spacer value={90} />
            <ModalAddressTitle>{t("Added Contracts")}</ModalAddressTitle>
            <ModalAddressGrid>
              {addedAddresses?.contracts && addedAddresses.contracts.length ? (
                addedAddresses.contracts.map((item, index) => (
                  <ModalAddressCard key={index}>
                    <Image className="img" src={DiamondIcon} />
                    <span>{getSmallAddress(item)}</span>
                    <Image
                      onClick={() => deleteAddress('contract', item)}
                      className="img"
                      src={CrossIcon}
                    />
                  </ModalAddressCard>
                ))
              ) : (
                <ModalDescription isMargin={false}>{t("No Added Contracts")}</ModalDescription>
              )}
            </ModalAddressGrid>
          </TabPanel>
        </TabContext>
      </AddAddressContentContainer>
    </Dialog>)
  );
};
