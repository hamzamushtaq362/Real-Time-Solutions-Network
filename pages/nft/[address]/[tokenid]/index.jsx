import { MainLayout } from 'layouts/MainLayout';
import { CollectionDetailsPageWrapper } from '~/components';

import React from 'react';
import {
  fetchAllContractNFTs,
  fetchContractDetails,
  fetchNFTSalesData,
  fetchPerticularNFTDetails,
} from '~/apis';
import { getIndividualNFTMetaInformation } from '~/utils';

export default function CollectionDetailsPage({
  address,
  tokenid,
  NFTDetails,
  salesPriceData,
  lastSalesPrice,
  contractDetailsData,
  contractNftsData,
}) {
  return (
    <div>
      <CollectionDetailsPageWrapper
        address={address}
        token={tokenid}
        NFTDetailsServer={NFTDetails}
        salesPriceDataServer={salesPriceData}
        lastSalesPriceServer={lastSalesPrice}
        contractNftsData={contractNftsData}
        contractDetailsData={contractDetailsData}
      />
    </div>
  );
}

CollectionDetailsPage.getLayout = function getLayout(page) {
  const props = page.props;

  const { title, description, image, keywords } =
    getIndividualNFTMetaInformation(props?.NFTDetails);
  return (
    <MainLayout
      title={title}
      description={description}
      image={image}
      keywords={keywords}
    >
      {page}
    </MainLayout>
  );
};

export async function getServerSideProps(context) {
  const { address, tokenid } = context.params;
  const NFTDetails = await fetchPerticularNFTDetails(address, tokenid);
  const salesPriceData = await fetchNFTSalesData(address, tokenid);
  const contractNftsData = await fetchAllContractNFTs(address);
  const contractDetailsData = await fetchContractDetails(address);

  //   const salesPriceData = [];
  // const contractNftsData = [];
  // const contractDetailsData = {};


  return {
    props: {
      address,
      tokenid,
      NFTDetails: NFTDetails || [],
      salesPriceData: salesPriceData?.allSales || [],
      lastSalesPrice: salesPriceData?.lastSalesPrice || '-',
      contractNftsData,
      contractDetailsData,
    },
  };
}
