import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  addNewWallet,
  BASE_URL,
  updateUserSelectedWalletAddress,
} from '~/apis';
import {
  CoinbaseIcon,
  FortmaticIcon,
  MetaMaskIcon,
  TorusIcon,
  WalletConnectIcon,
} from '~/assets';
import {
  WalletAddButton,
  UserSettingsWalletContainer,
  Heading,
  PrimaryWallet,
  SelectPrimaryWallet,
  Web3Container,
  Web3Title,
  ManageWallets,
  ManageWalletsItems,
  ManageWalletsItem,
  WalletInfo,
  WalletStatus,
  WalletActions,
  WalletInfoTitle,
  SelectPrimaryWalletBoxOption,
  RemoveModalHeading,
  RemoveModalWalletContainer,
  RemoveModalWalletRow,
  RemoveModalWalletRowSection,
  RemoveModalWalletRowSectionImage,
  RemoveModalWalletRowSectionAddress,
  RemoveModalWalletRowSectionButton,
} from './elements';

import { fetchRefreshToken, reFetchTokenExpire } from '~/redux';

import axios from 'axios';
import { providers } from 'ethers';

import { getDateDistance, getSmallAddress } from '~/utils';
import { useLocalStorage, useNotistack } from '~/hooks';
import {
  OutlinedButton,
  PrimaryButton,
  Spinner,
  WalletSuccessDialog,
} from '~/components';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import { Dropdown } from 'components/Dropdown/Dropdown';
import Button from 'components/Onboard/common/Button/Button';
import { useTranslation } from 'react-i18next';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';

const removeModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 1,
  width: '350px',
};

const addModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 1,
  width: '620px',
};

const getWalletIcon = (type) => {
  switch (type) {
    case 'metamask':
      return MetaMaskIcon;
    case 'torus':
      return TorusIcon;
    case 'walletconnect':
      return WalletConnectIcon;
    case 'fortmatic':
      return FortmaticIcon;
    case 'coinbase':
      return CoinbaseIcon;
  }
};

const RemoveModal = (props) => {
  const { generateSnackbar } = useNotistack();
  const { t } = useTranslation();

  const removeWalletAddress = async (walletId) => {
    try {
      const f1 = async () => {
        const res = await axios.delete(
          `${BASE_URL}/api/v1/wallets/${walletId}`,
        );
        return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res) {
        props.setWallets(res?.data?.data?.wallets);
        props.close();
      }
    } catch (err) {
      generateSnackbar(err?.response?.data?.message, 'error');
    }
  };
  return (
    <Modal className="mui-custom-modal" open={props.open} onClose={props.close}>
      <Box sx={removeModalStyle}>
        <RemoveModalHeading>{t('Remove Wallets')}</RemoveModalHeading>
        <RemoveModalWalletContainer>
          {props.data &&
            props.data.map((wallet, index) => (
              <RemoveModalWalletRow key={index}>
                <RemoveModalWalletRowSection>
                  <RemoveModalWalletRowSectionImage
                    src={getWalletIcon(wallet.type) || MetaMaskIcon}
                    height={30}
                    width={30}
                    alt={'wallet-favicon'}
                  />
                  <RemoveModalWalletRowSectionAddress>
                    {getSmallAddress(wallet.walletAddress)}
                  </RemoveModalWalletRowSectionAddress>
                </RemoveModalWalletRowSection>
                <RemoveModalWalletRowSectionButton
                  onClick={() => {
                    removeWalletAddress(wallet._id);
                  }}
                >
                  -
                </RemoveModalWalletRowSectionButton>
              </RemoveModalWalletRow>
            ))}
        </RemoveModalWalletContainer>
      </Box>
    </Modal>
  );
};

export const UserSettingsWalletSection = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState({
    icon: null,
    address: null,
  });
  const [auth, setAuth] = useLocalStorage('auth');
  const generateSnackbar = useNotistack();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [walletsRemoveList, setWalletsRemoveList] = useState(null);
  const { t } = useTranslation();

  // Connented Wallets
  const [wallets, setWallets] = useState(null);

  useEffect(() => {
    updateConnectedWallets();
  }, [wallets]);

  const [walletsList, setWalletsList] = useState([
    {
      icon: MetaMaskIcon,
      title: 'Metamask',
      connected: null,
      addAction: () => {
        addWalletToProfile();
      },
      removeAction: (wallets) => {
        setWalletsRemoveList(
          wallets ? wallets.filter((i) => i.type === 'metamask') : [],
        );
        setOpenRemoveModal(true);
      },
      addMoreAction: (wallets) => {
        setWalletsRemoveList(
          wallets ? wallets.filter((i) => i.type === 'metamask') : [],
        );
        setOpenAddModal(true);
      },
    },
    // {
    //   icon: TorusIcon,
    //   title: 'Torus',
    //   connected: null,
    //   addAction: () => {
    //   },
    //   removeAction: (wallets) => {
    //     setWalletsRemoveList(
    //       wallets ? wallets.filter((i) => i.type === 'torus') : [],
    //     );
    //     setOpenRemoveModal(true);
    //   },
    // },
    {
      icon: WalletConnectIcon,
      title: 'WalletConnect',
      connected: null,
      addAction: () => {
        walletConnectLogin();
      },
      removeAction: (wallets) => {
        setWalletsRemoveList(
          wallets ? wallets.filter((i) => i.type === 'walletconnect') : [],
        );
        setOpenRemoveModal(true);
      },
      addMoreAction: (wallets) => {
        setWalletsRemoveList(
          wallets ? wallets.filter((i) => i.type === 'walletconnect') : [],
        );
        setOpenAddModal(true);
      },
    },
    // {
    //   icon: FortmaticIcon,
    //   title: 'Fortmatic',
    //   connected: null,
    //   addAction: () => {
    //   },
    //   removeAction: (wallets) => {
    //     setWalletsRemoveList(
    //       wallets ? wallets.filter((i) => i.type === 'fortmatic') : [],
    //     );
    //     setOpenRemoveModal(true);
    //   },
    // },
    // {
    //   icon: CoinbaseIcon,
    //   title: 'Coinbase Wallet',
    //   connected: null,
    //   addAction: () => {
    //   },
    //   removeAction: (wallets) => {
    //     setWalletsRemoveList(
    //       wallets ? wallets.filter((i) => i.type === 'coinbase') : [],
    //     );
    //     setOpenRemoveModal(true);
    //   },
    // },
  ]);

  // get all walletAddress
  const getUserDetails = async () => {
    try {
      const f1 = async () => {
        const res = await axios.get(`${BASE_URL}/api/v1/wallets`);
        return res;
      };

      const res = await reFetchTokenExpire(f1, fetchRefreshToken);

      if (res.data.status === 'success') {
        setWallets(res.data.data.wallets);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const OpenSuccessModal = () => {
    setOpenSuccess(true);
  };

  const CloseSuccessModal = () => {
    setOpenSuccess(false);
  };

  // add metamask wallet
  const addWalletToProfile = (setLoading, close) => {
    setLoading(true);
    addNewWallet(setWallets, OpenSuccessModal).then(() => {
      setLoading(false);
      close();
    });
  };

  const updateConnectedWallets = () => {
    const temp = walletsList;
    temp.forEach((i) => (i.connected = null));
    setWalletsList([...temp]);
    wallets &&
      wallets.map(async (wallet) => {
        const temp = walletsList;
        const type = wallet?.type || 'metamask';
        switch (type) {
          case 'metamask':
            temp[0].connected = {
              name: auth?.fullName,
              address: wallet.walletAddress,
              updatedAt: wallet.updatedAt,
            };
            break;
          case 'torus':
            temp[1].connected = {
              name: auth?.fullName,
              address: wallet.walletAddress,
              updatedAt: wallet.updatedAt,
            };
            break;
          case 'walletconnect':
            temp[2].connected = {
              name: auth?.fullName,
              address: wallet.walletAddress,
              updatedAt: wallet.updatedAt,
            };
            break;
          case 'fortmatic':
            temp[3].connected = {
              name: auth?.fullName,
              address: wallet.walletAddress,
              updatedAt: wallet.updatedAt,
            };
            break;
          case 'coinbase':
            temp[4].connected = {
              name: auth?.fullName,
              address: wallet.walletAddress,
              updatedAt: wallet.updatedAt,
            };
            break;
        }
        setWalletsList([...temp]);
      });
  };

  const updateSelectedWalletState = async () => {
    const address = getSmallAddress(auth.selectedWalletAddress);
    const icon = getWalletIcon(auth.selectedWalletType || 'metamask');
    setSelectedWallet({
      ...selectedWallet,
      icon,
      address,
    });
  };

  const updateSelectedWallet = async (address, type) => {
    const response = await updateUserSelectedWalletAddress(address);
    if (response?.data?.status === 'success') {
      setAuth({
        ...auth,
        selectedWalletAddress: address,
        selectedWalletType: type,
      });
      generateSnackbar('Successfully updated wallet', 'success');
    }
    updateSelectedWalletState();
  };

  const walletConnectLogin = async (setLoading, close) => {
    setLoading(true);
    try {
      const walletConnectProvider = new WalletConnectProvider({
        infuraId: '3cd774e14cf34ff78167908f8377051c', // Required
        // qrcode: true
      });

      await walletConnectProvider.enable();
      const provider = new providers.Web3Provider(walletConnectProvider);

      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const wallets = await axios.post(`${BASE_URL}/api/v1/wallets`, {
        walletAddress: address,
        type: 'walletconnect',
      });
      if (wallets.data.status === 'success') {
        setWallets(wallets.data.data.wallets);
        OpenSuccessModal();
      }
      setLoading(false);
      close();
    } catch (err) {
      //
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    updateSelectedWalletState();
  }, [auth]);

  const addMore = (wallet, setLoading, close) => {
    switch (wallet) {
      case 'metamask': {
        addWalletToProfile(setLoading, close);
        break;
      }
      case 'walletconnect': {
        walletConnectLogin(setLoading, close);
        break;
      }
    }
  };

  const AddModal = (props) => {
    const [isAdding, setIsAdding] = useState(false);
    return (
      <Modal
        open={props.open}
        onClose={props.close}
        className="mui-custom-modal"
      >
        <Box sx={addModalStyle}>
          <RemoveModalHeading>{t('Connected Wallets')}</RemoveModalHeading>
          <RemoveModalWalletContainer>
            <RemoveModalWalletRow>
              <RemoveModalWalletRowSection
                sx={{ justifyContent: 'space-between', width: '100%' }}
              >
                <RemoveModalWalletRowSectionAddress>
                  <b>{t('Wallet')}</b>
                </RemoveModalWalletRowSectionAddress>
                <RemoveModalWalletRowSectionAddress>
                  <b>{t('Address')}</b>
                </RemoveModalWalletRowSectionAddress>
                <RemoveModalWalletRowSectionAddress>
                  <b>{t('Added')}</b>
                </RemoveModalWalletRowSectionAddress>
              </RemoveModalWalletRowSection>
            </RemoveModalWalletRow>
            {props.data &&
              props.data.map((wallet, index) => (
                <>
                  <RemoveModalWalletRow key={index}>
                    <RemoveModalWalletRowSection
                      sx={{ justifyContent: 'space-between', width: '100%' }}
                    >
                      <RemoveModalWalletRowSectionImage
                        src={getWalletIcon(wallet.type) || MetaMaskIcon}
                        height={30}
                        width={30}
                        alt={'wallet-favicon'}
                      />
                      <RemoveModalWalletRowSectionAddress>
                        {getSmallAddress(wallet.walletAddress)}
                      </RemoveModalWalletRowSectionAddress>
                      <RemoveModalWalletRowSectionAddress>
                        {getDateDistance(wallet?.updatedAt)}
                      </RemoveModalWalletRowSectionAddress>
                    </RemoveModalWalletRowSection>
                  </RemoveModalWalletRow>
                </>
              ))}
            <Button
              sx={{ marginTop: '32px', fontSize: '16px' }}
              onClick={() => {
                addMore(props.data[0].type, setIsAdding, props.close);
              }}
              disabled={isAdding}
            >
              {!isAdding ? (
                'Add New Wallet'
              ) : (
                <Spinner inverse={true} size={20} />
              )}
            </Button>
          </RemoveModalWalletContainer>
        </Box>
      </Modal>
    );
  };

  return (
    <UserSettingsWalletContainer>
      <Heading>{t('Connected Wallets')}</Heading>
      <PrimaryWallet>
        <Box>
          <LeftHeaderComp
            headerText={t('Primary Wallet')}
            subheader={t('Choose displayed wallet')}
          />
        </Box>
        <SelectPrimaryWallet>
          {wallets && wallets.length > 0 && (
            <Dropdown
              selectedItem={selectedWallet.address || 'No wallet added'}
              setSelectedItem={(value) =>
                updateSelectedWallet(value.walletAddress, value.type)
              }
              options={wallets.map((wal) => ({
                key: wal.walletAddress,
                label: getSmallAddress(wal.walletAddress),
                value: { walletAddress: wal.walletAddress, type: wal.type },
              }))}
              OptionComponent={({ option }) => (
                <SelectPrimaryWalletBoxOption>
                  <Image
                    alt="wallet-favicon"
                    src={getWalletIcon(option.value.type) || MetaMaskIcon}
                    width={25}
                    height={25}
                  />
                  <Box ml={2}>{option.label}</Box>
                </SelectPrimaryWalletBoxOption>
              )}
              width={300}
              disabled={wallets.length === 1}
            />
          )}
        </SelectPrimaryWallet>
      </PrimaryWallet>
      <Web3Container>
        <Web3Title>{t('Web3')}</Web3Title>
        <ManageWallets>
          {walletsList.map((wal, index) => (
            <ManageWalletsItems key={index}>
              <ManageWalletsItem>
                <WalletInfo>
                  <Image
                    alt="wallet-favicon"
                    src={wal.icon}
                    width={40}
                    height={40}
                  />
                  <WalletInfoTitle>{wal.title}</WalletInfoTitle>
                </WalletInfo>
                <WalletStatus>
                  {wal.connected && <span>{wal.connected.name}</span>}
                  {wal.connected && (
                    <span style={{ textTransform: 'capitalize' }}>
                      {getDateDistance(wal.connected.updatedAt)}
                    </span>
                  )}
                  {!wal.connected && <span>{t('Not Added')}</span>}
                </WalletStatus>
                <WalletActions>
                  {!wal.connected && (
                    <PrimaryButton width={150} onClick={wal.addAction}>
                      {t('Add')}
                    </PrimaryButton>
                  )}
                  {wal.connected && (
                    // <OutlinedButton
                    //   onClick={wal.addAction}
                    //   width={150}
                    //   marginRight={8}
                    // >{t('Add More')} </OutlinedButton>
                    <WalletAddButton onClick={() => wal.addMoreAction(wallets)}>
                      {t('Add More')}
                    </WalletAddButton>
                    // <AddMore onClick={() => wal.addMoreAction(wallets)}>
                    //   <AddMoreButton>Add More </AddMoreButton>
                    // </AddMore>
                  )}
                  {wal.connected && (
                    <OutlinedButton
                      width={150}
                      onClick={() => wal.removeAction(wallets)}
                    >
                      {t('Remove')}
                    </OutlinedButton>
                  )}
                </WalletActions>
              </ManageWalletsItem>
            </ManageWalletsItems>
          ))}
          <AddModal
            open={openAddModal}
            close={() => setOpenAddModal(false)}
            data={walletsRemoveList}
            setWallets={setWallets}
          />
          {openSuccess && (
            <WalletSuccessDialog
              setWallets={setWallets}
              OpenSuccessModal={OpenSuccessModal}
              addWalletToProfile={addWalletToProfile}
              open={openSuccess}
              handleClose={CloseSuccessModal}
              width="472px"
              height="372px"
            />
          )}
          <RemoveModal
            open={openRemoveModal}
            close={() => setOpenRemoveModal(false)}
            data={walletsRemoveList}
            setWallets={setWallets}
          />
        </ManageWallets>
      </Web3Container>
    </UserSettingsWalletContainer>
  );
};
