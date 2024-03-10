import { MainLayout } from '~/layouts';
import {
  fetchAllContractNFTs,
  fetchContractDetails,
  fetchContractStatsByOpenseaBackend, fetchPerticularNFTDetails,
} from '~/apis';
import { CollectionPageWrapper } from '~/components';
import { getNFTCollectionMetaInformation } from '~/utils';

export default function CollectionPage({
  address,
  contractDetailsData,
  contractStatsData,
  contractNftsData,
  nftDetails
}) {
  return (
    <CollectionPageWrapper
      contractDetailsData={contractDetailsData}
      contractStatsData={contractStatsData}
      contractNftsData={contractNftsData}
      nftDetails={nftDetails}
      address={address}
    />
  );
}

CollectionPage.getLayout = function getLayout(page) {
  const props = page.props;

  const { title, description, image, keywords } =
    getNFTCollectionMetaInformation(props?.contractDetailsData);

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
  const { address } = context.params;

  const contractDetailsData = await fetchContractDetails(address);
  const nftDetails = await fetchPerticularNFTDetails(address, '1');

  const slug = contractDetailsData?.collection?.slug;

  const contractStatsData = await fetchContractStatsByOpenseaBackend(slug);

  const contractNftsData = await fetchAllContractNFTs(address);

  // Pass data to the page via props
  return {
    props: {
      address,
      contractDetailsData,
      contractStatsData,
      contractNftsData,
      nftDetails
    },
  };
}
