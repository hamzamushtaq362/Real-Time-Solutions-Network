import { useEffect, useState } from 'react';
import { getCorrectImage, truncateString } from '~/utils';
import {
  NFTCardContainer,
  NFTCardImage,
  NFTCardCreatorContainer,
  NFTCardCreatorName,
  NFTCardDescription,
} from './elements';

export const NFTCard = ({
  imgSrc,
  title,
  description,
  contractAddress,
  metadataUri,
}) => {
  const [imageSrcState, setImageSrcState] = useState(imgSrc);
  const updateBuyerDetails = async () => {
    // const res = await fetchPerticularNFTDetails(contractAddress, tokenId);
    // setBuyerDetails({
    //   ...buyerDetails,
    //   profilePicture:
    //     res?.last_sale?.transaction?.to_account?.profile_img_url || undefined,
    //   price: res?.last_sale?.payment_token?.eth_price || 0.0,
    //   address: res?.last_sale?.transaction?.to_account?.address || undefined,
    // });
    if (!imgSrc) {
      const correctImage = await getCorrectImage(metadataUri);
      setImageSrcState(correctImage);
    }
  };
  useEffect(() => {
    updateBuyerDetails();
  }, [contractAddress]);

  return (
    <NFTCardContainer>
      <NFTCardImage
        component="img"
        height="200"
        image={imgSrc || imageSrcState}
        alt={title}
      />
      <NFTCardCreatorContainer>
        {/* <NFTCardCreatorImage src={creatorImage} alt="Creator Image" /> */}
        <NFTCardCreatorName>{title}</NFTCardCreatorName>
      </NFTCardCreatorContainer>
      {description && (
        <NFTCardDescription>
          {truncateString(description, 100)}
        </NFTCardDescription>
      ) }
      {/* {buyerDetails.address !== undefined ? (
        <NFTCardLastSoldContainer>
          <NFTCardLastSoldText>Last Sold</NFTCardLastSoldText>
          <NFTCardLastSoldPrice>
            {parseFloat(buyerDetails.price).toFixed(2).toString() + ' ETH'}
          </NFTCardLastSoldPrice>
          <NFTCardBuyerContainer>
            <NFTCardBuyerImage
              src={buyerDetails.profilePicture}
              alt="Creator Image"
            />
            <NFTCardLastSoldText>
              {truncateString(buyerDetails.address, 5)}
              {buyerDetails.address
                .split('')
                .slice(
                  buyerDetails.address.length - 6,
                  buyerDetails.address.length - 1,
                )
                .join('')}
            </NFTCardLastSoldText>
          </NFTCardBuyerContainer>
        </NFTCardLastSoldContainer>
      ) : (
        <NFTCardLastSoldContainer>
          <NFTCardLastSoldText>
            No transaction details found!
          </NFTCardLastSoldText>
        </NFTCardLastSoldContainer>
      )} */}
    </NFTCardContainer>
  );
};
