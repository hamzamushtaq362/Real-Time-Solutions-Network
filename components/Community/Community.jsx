import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

import {
  NoInsightsCont,
  ParentCont,
  NoInsightsText,
} from '../Insights/elements';

import {
  ImageIcon,
  PrimaryButton,
  InsightsAddAddressDialog,
  Spacer,
} from '~/components';
import { AddIcon, NoInsightsImage } from '~/assets';
import {
  fetchContractPriceHistory1,
  fetchContractVolumeHistory1,
  addAddresses,
  deleteContractAddress,
  deleteWalletAddress,
  fetchAllContracts1,
  fetchContractStats1,
  fetchOwnersCountByContract1,
  fetchTopTenCollectors1,
  getAddedAddresses,
  isPolygonAddress1,
  getUserWalletAddresses,
} from '~/apis';
import { useNotistack } from '~/hooks';
import Image from 'next/image';
import AllInsights from 'components/Insights/tabs/AlIInsights';
import ContractDropDown from './ContractDropdown';
import WalletDropdown from './WalletDropdown';
import UserWalletDropdown from './UserWalletDropdown';
import CollectionProfile from './CollectionProfile';
import CreatorProfile from './CreatorProfile';
import { ProfileGrid } from './element';

export default function Insight() {
  const [ensName, setEnsName] = useState('');
  const { t } = useTranslation();

  const [contractAnchorEl, setContractAnchorEl] = useState(null);
  const [walletAnchorEl, setWalletAnchorEl] = useState(null);
  const [userWalletAnchorEl, setUserWalletAnchorEl] = useState(null);

  const [userWalletAddress, setUserWalletAddress] = useState([]);

  const [selectedUserWalletAddress, setSelectedUserWalletAddress] =
    useState('');

  const [selectedWalletAddress, setSelectedWalletAddress] = useState();
  const [selectedWalletIndex, setSelectedWalletIndex] = useState();

  // Custom Hooks
  const generateSnackbar = useNotistack();

  const [contractsData, setContractsData] = useState([]);

  const [isFirstMountDone, setIsFirstMountDone] = useState(false);

  const [addedContractAddresses, setAddedContractAddresses] = useState([]);

  // Loading UseStates
  const [isAllContractsLoading, setIsAllContractsLoading] = useState(true);
  const [topTenCollectorLoading, setTopTenCollectorLoading] = useState(true);
  const [isNoAddressFound, setIsNoAddressFound] = useState(false);

  // Address
  const [selectedContractAddress, setSelectedContractAddress] = useState('');
  const [mainWalletAddress, setMainWalletAddress] = useState('');
  const [currentAddressChain, setCurrentAddressChain] = useState('');
  const [allContractAddresses, setAllContractAddresses] = useState([]);

  const [addSourceRadioValue, setAddSourceRadioValue] = useState('contract');

  // Api Data
  const [contractPricingHistory, setContractPricingHistory] = useState([]);
  const [contractVolumeHistory, setContractVolumeHistory] = useState([]);
  const [contractSalesHistory, setContractSalesHistory] = useState([]);
  const [contractOwnerCounts, setContractOwnerCounts] = useState([]);
  const [contractStats, setContractStats] = useState([]);
  const [topTenCollectors, setTopTenCollectors] = useState([]);

  // Durations
  const [priceHistoryDuration, setPriceHistoryDuration] = useState(30);
  const [salesHistoryDuration, setSalesHistoryDuration] = useState(30);
  const [ownerCountDuration, setOwnerCountDuration] = useState(30);
  const [volumeHistoryDuration, setVolumeHistoryDuration] = useState(7);

  // Modal
  const [dialogBoxOpen, setDialogBoxOpen] = useState(false);
  const [isWalletAddressBox, setIsWalletAddressBox] = useState(false);
  const [currentTab, setCurrentTab] = useState('1');
  const [addedAddresses, setAddedAddresses] = useState({
    mainAddress: '',
    wallets: [],
    contracts: [],
  });

  // Inputs
  const [contractAddressInput, setContractAddressInput] = useState([]);
  const [walletAddressInput, setWalletAddressInput] = useState([]);
  const [fetchAddressesAgain, setFetchAddressesAgain] = useState([]);
  // const address = '0xc1caf0c19a8ac28c41fe59ba6c754e4b9bd54de9';

  // Modal Logic -------------------------
  const clearInputAddress = () => {
    setContractAddressInput([]);
    setWalletAddressInput([]);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleChange = (event) => {
    setAddSourceRadioValue(event.target.value);
    if (event.target.value === 'wallet') {
      setIsWalletAddressBox(true);
    } else {
      setIsWalletAddressBox(false);
    }
  };

  const isSubmitButtonClickable = () => {
    if (!contractAddressInput.length && !walletAddressInput.length) {
      return true;
    }
    if (contractAddressInput.length) {
      return false;
    } else if (walletAddressInput.length) {
      return false;
    }
  };

  const addAddressToBackend = async (walletAddress, contractAddress) => {
    const addAddress = await addAddresses(walletAddress, contractAddress);
    if (!addAddress) {
      generateSnackbar('Something went Wrong!', 'error');
      clearInputAddress();
      return;
    }
    if (addAddress.status === 'success') {
      generateSnackbar('Address Added', 'success');
      clearInputAddress();
      setFetchAddressesAgain([...fetchAddressesAgain, 2]);
      fetchData();
    } else {
      generateSnackbar(addAddress.message, 'error');
      clearInputAddress();
    }
  };

  const handleAddressSubmit = () => {
    const isButtonClickable = isSubmitButtonClickable();
    if (isButtonClickable) {
      generateSnackbar('Address is Required', 'error');
      return;
    }
    addAddressToBackend(walletAddressInput, contractAddressInput);
  };

  const deleteAddress = async (type, address) => {
    const handleSuccess = (message) => {
      if (message == 'success') {
        generateSnackbar('Address deleted', 'success');
        setFetchAddressesAgain([...fetchAddressesAgain, 2]);
      } else {
        generateSnackbar('Something Went Wrong! Try again', 'error');
      }
    };

    if (type == 'contract') {
      const deleteAddres = await deleteContractAddress(address);
      if (deleteAddres) {
        handleSuccess(deleteAddres);
      }
    }

    if (type == 'wallet') {
      const deleteAddres = await deleteWalletAddress(address);
      if (deleteAddres) {
        handleSuccess(deleteAddres);
      }
    }
  };

  // Modal Logic Over -----------------------------

  const isPolygonChain = async (contractAddress) => {
    try {
      const fetchChain = await isPolygonAddress1(contractAddress);
      setCurrentAddressChain(fetchChain);
    } catch (error) {
      return 'ethereum';
    }
  };

  // Get the contracts associated with the wallet address
  const getContractsByWalletAddress = async (addressData) => {
    if (!addressData) return [];
    try {
      setIsAllContractsLoading(true);
      let contractAddress = '';
      let finalArray = [];

      // Fetch the contract addresses of the wallet connected which was connected during signup..
      if (addressData.WalletAddress) {
        const contractsByWalletData = await fetchAllContracts1(
          addressData.WalletAddress,
        );
        finalArray.push({
          walletAddress: addressData.WalletAddress,
          contractAddresses: contractsByWalletData,
        });
        if (contractsByWalletData.length && !selectedContractAddress) {
          contractAddress = contractsByWalletData[0].address;
          setSelectedWalletAddress(addressData.WalletAddress);
          setSelectedWalletIndex(0);
        }
      }

      // Fetch the contract addresses which the user added by themselves.
      for (let i = 0; i < addressData.addedWallets.walletAddress.length; i++) {
        const walletAddress = addressData.addedWallets.walletAddress[i];
        const contractsByWalletData = await fetchAllContracts1(walletAddress);
        if (contractsByWalletData.length && !selectedContractAddress) {
          contractAddress = contractsByWalletData[0].address;
          setSelectedWalletAddress(walletAddress);
          setSelectedWalletIndex(i + 1);
        }

        finalArray.push({
          walletAddress: walletAddress,
          contractAddresses: contractsByWalletData,
        });
      }

      setAddedContractAddresses(
        addressData?.addedWallets?.contractAddress || [],
      );

      //   let otherAddObj = [];
      for (
        let i = 0;
        i < addressData.addedWallets.contractAddress.length;
        i++
      ) {
        if (!selectedContractAddress) {
          setSelectedContractAddress(
            addressData.addedWallets.contractAddress[0],
          );
        }
      }
      //   if (otherAddObj.length) {
      //     contractAddress = otherAddObj[0].address;
      //   }
      //   finalArray.push({
      //     walletAddress: 'Added Contracts',
      //     contractAddresses: otherAddObj,
      //   });
      setContractsData(finalArray);
      return contractAddress;
    } catch (error) {
      //
    } finally {
      setIsAllContractsLoading(false);
    }
  };

  const getContractPriceHistory = async (address, duration) => {
    try {
      const contractPricingHistoryData = await fetchContractPriceHistory1(
        address,
        duration,
        currentAddressChain,
      );
      setContractPricingHistory(contractPricingHistoryData || []);
    } catch (error) {
      //
    }
  };

  const getContractVolumeHistory = async (address, duration) => {
    try {
      const contractVolumeistoryData = await fetchContractVolumeHistory1(
        address,
        duration,
        currentAddressChain,
      );

      setContractVolumeHistory(contractVolumeistoryData);
    } catch (error) {
      //
    }
  };

  const getContractSalesHistory = async (address, duration) => {
    try {
      const contractSalesHistoryData = await fetchContractVolumeHistory1(
        address,
        duration,
        currentAddressChain,
      );

      setContractSalesHistory(contractSalesHistoryData);
    } catch (error) {
      //
    }
  };

  const getOwnerCountByContract = async (address, duration) => {
    try {
      const contractOwnerCountData = await fetchOwnersCountByContract1(
        address,
        duration,
        currentAddressChain,
      );
      setContractOwnerCounts(contractOwnerCountData);
    } catch (error) {
      //
    } finally {
      //
    }
  };
  const getContractStats = async (addresses) => {
    try {
      let FinalData = {};
      let salesData = {
        sales: 0,
        everdayAverageSales: 0,
        difference: 0,
        thirtyDaySales: 0,
      };

      let collectorsData = {
        total: 0,
      };

      for (let i = 0; i < addresses.length; i++) {
        const address = addresses[i];
        const contractStatsData = await fetchContractStats1(
          address.address,
          address.chain,
        );
        // let volume = contractStatsData.Volume;
        let sale = contractStatsData.Sale;
        let collector = contractStatsData.Collector;

        // Volume
        // volumeData.volume += volume?.volume || 0;
        // volumeData.percentage += volume?.percentage || 0;
        // volumeData.SevenDaysDifference += volume?.SevenDaysDifference || 0;
        // volumeData.percentageUp += volume?.percentageUp || 0;

        // Sales
        salesData.sales += sale?.sale || 0;
        salesData.difference += sale?.difference || 0;
        salesData.everdayAverageSales += sale?.everdayAverageSales || 0;
        salesData.thirtyDaySales += sale?.thirtyDaySales || 0;

        collectorsData.total += collector?.collectors || 0;
      }

      // Volume
      // let isVolumeUp = false;
      // let volumeDifference = getPercentage(
      //   volumeData.percentage,
      //   volumeData.volume,
      // ).toFixed(2);
      // if (volumeDifference == 'NaN') {
      //   volumeDifference = '0.00';
      // }
      // if (volumeData.SevenDaysDifference - volumeData.percentageUp > 0) {
      //   isVolumeUp = true;
      // }

      // Sales
      // let isSalesUp = false;
      // let difference = salesData.everdayAverageSales - salesData.sales;
      // if (difference > 0) {
      //   isSalesUp = true;
      // }
      // let percentage = getPercentage(
      //   Math.abs(difference),
      //   salesData.thirtyDaySales,
      // ).toFixed(2);

      // if (percentage == 'NaN') {
      //   percentage = '0.00';
      // }

      // const userDetails = await getUserDetails();
      // const totalCollabs = userDetails?.data?.totalCollabs || 0;
      // FinalData['Volume'] = {
      //   volume: volumeData?.volume,
      //   percentage: volumeDifference,
      //   isVolumeUp,
      // };

      FinalData['Sale'] = {
        sale: salesData.sales,
        // percentage: percentage,
        // isSalesUp: isSalesUp,
      };

      FinalData['Collector'] = {
        collectors: collectorsData.total,
      };

      // FinalData['Collabs'] = {
      //   count: totalCollabs,
      // };

      FinalData['fetched'] = true;

      setContractStats(FinalData);
    } catch (error) {
      //
    }
  };

  const getAddedAddress = async () => {
    try {
      const addressData = await getAddedAddresses();
      const add = {
        mainAddress: addressData.WalletAddress,
        wallets: addressData.addedWallets.walletAddress || [],
        contracts: addressData.addedWallets.contractAddress || [],
      };
      setAddedAddresses(add);
      if (
        !addressData.WalletAddress &&
        !addressData.addedWallets.walletAddress.length &&
        !addressData.addedWallets.contractAddress.length
      ) {
        return;
      }

      if (addressData.WalletAddress) {
        setMainWalletAddress(addressData.WalletAddress);
      }

      const getAddress = await getContractsByWalletAddress(addressData);
      setAllContractAddresses(allContractAddresses);

      return getAddress;
    } catch (error) {
      //
    }
  };

  const [topTenCollectorsAddressFull, setTopTenCollectorsAddressFull] =
    useState([]);

  const getTopTenCollectors = async (address) => {
    try {
      setTopTenCollectorLoading(true);
      const topTenCollectorsData = await fetchTopTenCollectors1(
        address,
        500,
        currentAddressChain,
      );
      setTopTenCollectorsAddressFull(topTenCollectorsData.allAddresses);
      setTopTenCollectors(topTenCollectorsData.finalData);
    } catch (error) {
      //
    } finally {
      setTopTenCollectorLoading(false);
    }
  };

  const contractAddresses = async (allAddresses) => {
    let allContractAddresses = [];
    for (let i = 0; i < allAddresses.length; i++) {
      const contractAddresses = allAddresses[i].contractAddresses;
      for (let j = 0; j < contractAddresses.length; j++) {
        const contractAddress = contractAddresses[j];
        let chain = 'ethereum';

        if (i == 1 || i == 2) {
          const fetchChain = await isPolygonAddress1(contractAddress.address);
          chain = fetchChain;
          if (!chain) {
            chain = 'ethereum';
          }
        }

        allContractAddresses.push({ address: contractAddress.address, chain });
      }
    }
    setAllContractAddresses(allContractAddresses);
  };

  const fetchData = async () => {
    const address = await getAddedAddress();
    if (!address || !address.length) {
      setIsAllContractsLoading(false);
      setIsNoAddressFound(true);
      return;
    } else {
      setIsNoAddressFound(false);
      setSelectedContractAddress(address);
    }
  };

  const getUserWallets = async () => {
    const wallets = await getUserWalletAddresses();
    setUserWalletAddress(wallets);
  };

  const whenWalletAddressChanged = async (index) => {
    const address = contractsData[index]?.contractAddresses;
    if (address && address.length) {
      setSelectedContractAddress(address[0].address);
    } else {
      generateSnackbar('No nfts found', 'info');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isFirstMountDone) {
      whenWalletAddressChanged(selectedWalletIndex);
    }
  }, [selectedWalletIndex]);

  useEffect(() => {
    getUserWallets();
  }, []);

  useEffect(() => {
    if (selectedContractAddress) {
      isPolygonChain(selectedContractAddress);
    }
  }, [selectedContractAddress]);

  useEffect(() => {
    if (contractsData.length) {
      contractAddresses(contractsData);
    }
  }, [contractsData]);

  // When New Addresses are added.
  // useEffect(() => {
  //   if (fetchAddressesAgain.length) {
  //     setSelectedContractAddress('');
  //     fetchData();
  //   }
  // }, [fetchAddressesAgain]);

  useEffect(() => {
    if (allContractAddresses && allContractAddresses.length) {
      getContractStats(allContractAddresses);
    }
  }, [allContractAddresses]);

  useEffect(() => {
    if (selectedContractAddress && currentAddressChain) {
      getContractPriceHistory(selectedContractAddress, priceHistoryDuration);
    }
  }, [selectedContractAddress, currentAddressChain, priceHistoryDuration]);

  useEffect(() => {
    if (selectedContractAddress && currentAddressChain) {
      getContractVolumeHistory(selectedContractAddress, volumeHistoryDuration);
    }
  }, [selectedContractAddress, currentAddressChain, volumeHistoryDuration]);

  useEffect(() => {
    if (selectedContractAddress && currentAddressChain) {
      getContractSalesHistory(selectedContractAddress, salesHistoryDuration);
    }
  }, [selectedContractAddress, currentAddressChain, salesHistoryDuration]);

  useEffect(() => {
    if (selectedContractAddress && currentAddressChain) {
      getOwnerCountByContract(selectedContractAddress, ownerCountDuration);
    }
  }, [selectedContractAddress, currentAddressChain, ownerCountDuration]);

  useEffect(() => {
    if (selectedContractAddress && currentAddressChain) {
      getTopTenCollectors(selectedContractAddress);
    }
  }, [selectedContractAddress, currentAddressChain]);

  return (<>
    <Spacer value={200} />
    {/* <div style={{fontSize: "2rem", padding: "2rem"}}>
      contract address - {selectedContractAddress}
      wallet address - {selectedWalletAddress}
    </div> */}
    {/* Dialog Starts */}
    <InsightsAddAddressDialog
      open={dialogBoxOpen}
      setOpen={setDialogBoxOpen}
      handleClose={() => setDialogBoxOpen(false)}
      currentTab={currentTab}
      handleTabChange={handleTabChange}
      isWalletAddressBox={isWalletAddressBox}
      addedAddresses={addedAddresses}
      contractAddressInput={contractAddressInput}
      isSubmitButtonClickable={isSubmitButtonClickable}
      handleAddressSubmit={handleAddressSubmit}
      deleteAddress={deleteAddress}
      setContractAddressInput={setContractAddressInput}
      walletAddressInput={walletAddressInput}
      setWalletAddressInput={setWalletAddressInput}
      handleChange={handleChange}
      addSourceRadioValue={addSourceRadioValue}
    />
    {/* Dialog Ends */}
    <ParentCont>
      {!selectedContractAddress &&
      !isAllContractsLoading &&
      isNoAddressFound &&
      !selectedWalletAddress ? (
        <NoInsights onClick={() => setDialogBoxOpen(true)} />
      ) : (
        <>
          <Spacer value={200} />

          {selectedWalletAddress && (
            <>
              <ProfileGrid>
                <CreatorProfile
                  setEnsName={setEnsName}
                  ensName={ensName}
                  stats={contractStats || {}}
                  walletAddress={selectedWalletAddress}
                />
              </ProfileGrid>
              
            </>
          )}
          {selectedContractAddress && (
            <>
           <div
                style={{
                  width: '100%',
                  padding: '2rem 4rem',
                  backgroundColor: 'white',
                  fontSize: '3rem',
                  fontWeight: '600',
                }}
              >{t("Collection")}</div>
              <ProfileGrid>
                <CollectionProfile
                  ensName={ensName}
                  selectedContractAddress={selectedContractAddress}
                />
              </ProfileGrid>
              
            </>
          )}

          <AllInsights
            contractPricingHistory={contractPricingHistory}
            contractVolumeHistory={contractVolumeHistory}
            contractSalesHistory={contractSalesHistory}
            priceHistoryDuration={priceHistoryDuration}
            setPriceHistoryDuration={setPriceHistoryDuration}
            volumeHistoryDuration={volumeHistoryDuration}
            setVolumeHistoryDuration={setVolumeHistoryDuration}
            salesHistoryDuration={salesHistoryDuration}
            setSalesHistoryDuration={setSalesHistoryDuration}
            contractOwnerCounts={contractOwnerCounts}
            ownerCountDuration={ownerCountDuration}
            setOwnerCountDuration={setOwnerCountDuration}
            address={selectedContractAddress}
            currentChain={currentAddressChain}
            topTenCollectors={topTenCollectors}
            topTenCollectorsLoading={topTenCollectorLoading}
            walletAddress={mainWalletAddress}
            topTenCollectorsAddressFull={topTenCollectorsAddressFull}
          />
        </>
      )}

      <UserWalletDropdown
        btnClick={() => setDialogBoxOpen(true)}
        btnText={t("Add Creator")}
        anchorEl={userWalletAnchorEl}
        setAnchorEl={setUserWalletAnchorEl}
        data={userWalletAddress}
        setSelectedWalletAddress={setSelectedUserWalletAddress}
        selectedWalletAddress={selectedUserWalletAddress}
      />
      <WalletDropdown
        btnClick={() => setDialogBoxOpen(true)}
        btnText={t("Add Creator")}
        anchorEl={walletAnchorEl}
        setIsFirstMountDone={setIsFirstMountDone}
        setAnchorEl={setWalletAnchorEl}
        data={contractsData}
        setSelectedWalletIndex={setSelectedWalletIndex}
        setSelectedWalletAddress={setSelectedWalletAddress}
        selectedWalletAddress={selectedWalletAddress}
      />

      <ContractDropDown
        btnClick={() => setDialogBoxOpen(true)}
        btnText={t("Add NFT")}
        shareAnchorEl={contractAnchorEl}
        setShareAnchorEl={setContractAnchorEl}
        contractsData={contractsData}
        isNoAddressFound={isNoAddressFound}
        selectedContractAddress={selectedContractAddress}
        setSelectedContractAddress={setSelectedContractAddress}
        selectedWalletAddress={selectedWalletAddress}
        addedContractAddresses={addedContractAddresses}
        selectedWalletIndex={selectedWalletIndex}
        isAllContractsLoading={isAllContractsLoading}
      />
    </ParentCont>
  </>);
}
export const NoInsights = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    (<NoInsightsCont>
      <Image src={NoInsightsImage} alt={t("no insights found")} />
      <NoInsightsText>{t("Start by adding a wallet / contract")}</NoInsightsText>
      <PrimaryButton
        width="168px"
        variant="contained"
        onClick={onClick}
        style={{
          marginLeft: '1.5rem',
          borderRadius: '9px',
        }}
      >
        <ImageIcon
          src={AddIcon}
          sx={{ width: '13px', marginRight: '5px' }}
          alt="add-icon"
        />{" "}{t("Add Source")}</PrimaryButton>
    </NoInsightsCont>)
  );
};
