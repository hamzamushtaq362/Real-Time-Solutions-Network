import { useTranslation } from 'react-i18next';
import {
  NFTBoxContainer,
  NFTBoxImageContainer,
  NFTBoxTextContainer,
  NFTContentText,
  NFTCreatorMessageContainer,
  NFTCreatorMessageBoxContainer,
  NFTCreatorButtonContainer,
  NFTCreatorMessageProfileContainer,
  NFTDetailContainer,
  NFTImageCaption,
  NFTCreatorProfileTitle,
  NFTCreatorProfileTextContainer,
  NFTCreatorMessageText,
  NFTCreatorMessageBox,
  NFTDetailsTopHeaderDiv,
  LeftComponentForNftDetailsTopHeader,
  MintStatusForNFTHeader,
  NFTHeaderLink,
  InputHeader,
  InputBottomText,
} from './elements';

import Opensea from '../../assets/png/Opensea2.png';
import Rarible from '../../assets/png/rarible.png';
import Globe from '../../assets/png/globe.png';
import {
  Spacer,
  PrimaryButton,
  Avatar,
  ImageIconElement,
  Divider,
  ThreeDots,
} from '~/components';
import { sendReminderToMembersForNFTApproval } from '~/apis';
import { useNotistack } from '~/hooks';

import DefaultCover from '../../assets/png/collab-details-image.png';

import config from '~/config';
import { useTheme } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { isConverversationExistsWithUser } from 'apis/inbox';
import { useRouter } from 'next/router';

export const NFTDetails = (props) => {
  const { t } = useTranslation();
  const { collab, members } = props;
  const { nftImage, nftDescription, nftTitle } = collab;
  const theme = useTheme();
  const router = useRouter();

  const checkStatus = (creatorData) => {
    if (creatorData.approveNftPublishing != undefined) {
      if (creatorData.approveNftPublishing) {
        return 'Approved';
      } else {
        return 'Disapproved';
      }
    } else {
      return 'Notified, Waiting for approval';
    }
  };
  const generateSnackbar = useNotistack();
  const [claimedNFT, setClaimedNFTS] = useState(0);
  const [isloading, setLoading] = useState(false);
  const [nftMintQuantity, setnftMintQuantity] = useState(null);

  useEffect(() => {
    setnftMintQuantity(collab?.nftMintquantity);

    const mintedNFtCount = async () => {
      if (collab?.claimedNFTs === collab?.nftMintquantity) {
        setClaimedNFTS(collab.claimedNFTs);
      } else {
        setLoading(true);
      }
    };
    mintedNFtCount();
  }, [collab]);

  const getMintStatus = () => {
    if (nftMintQuantity > 1) {
      if (claimedNFT > 0) {
        return `${claimedNFT}/${collab?.nftMintquantity} Minted`;
      } else {
        return 'Ready For Mint';
      }
    } else {
      if (claimedNFT === 1) {
        return 'Minted';
      } else {
        return 'Ready For Mint';
      }
    }
  };

  const messageButtonClickHandler = async (userId) => {
    const res = await isConverversationExistsWithUser(userId);
    const isConversationExist = res?.data?.conversationExist;
    if (isConversationExist) {
      const conversationId = res?.data?.conversationId;
      router.push(`/inbox?conversation=${conversationId}`);
    } else {
      router.push(`/inbox?user=${userId}`);
    }
  };

  return (
    <>
      <NFTDetailContainer>
        <InputBottomText
          fontFamily="Gilroy-Medium"
          fontSize="16px"
          lineHeight="24px"
          color={theme.palette.grey.common}
          marginLeft="20px"
          pointer="cursor"
          onClick={() => {
            props?.setNFT(false);
          }}
          showCursor
        >
          {t('← Back to Collab')}
        </InputBottomText>
        <Spacer value={24} />

        <NFTDetailsTopHeaderDiv>
          <InputHeader
            fontSize="24px"
            fontWeight="700"
            lineHeight="26px"
            marginLeft="20px"
            color={theme.palette.text.primary}
          >
            {t('NFT Details')}
          </InputHeader>

          {(collab.selectedPublishMode === 'userMintNft' ||
            collab.selectedPublishMode === 'userDeploysContract') && (
            <LeftComponentForNftDetailsTopHeader>
              {collab.nftReadyForMinting ? (
                <a
                  href={`${config.NFTMINT_URL}${collab.nftDropContractAddress}&chainId=${config.NETWORK_CHAIN_ID}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <MintStatusForNFTHeader>
                    {isloading ? (
                      <ThreeDots color={theme.palette.background.inverse} />
                    ) : (
                      getMintStatus()
                    )}
                  </MintStatusForNFTHeader>
                </a>
              ) : (
                <MintStatusForNFTHeader
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, #ff6e7f, #bfe9ff)',
                    cursor: 'not-allowed',
                  }}
                >
                  {t('Pending')}
                </MintStatusForNFTHeader>
              )}

              {claimedNFT > 0 && (
                <>
                  <a
                    href={
                      collab.nftDropContractAddress
                        ? `${config.NFTOpensea_URL}${collab.nftDropContractAddress}`
                        : ''
                    }
                    rel="noreferrer"
                    target="_blank"
                  >
                    <NFTHeaderLink>
                      <Image
                        width="40"
                        height="40"
                        alt="nftlinks"
                        src={Opensea.src}
                      />
                    </NFTHeaderLink>
                  </a>

                  <a
                    href={
                      collab.nftDropContractAddress
                        ? `${config.NFTRarible_URL}${collab.nftDropContractAddress}`
                        : ''
                    }
                    rel="noreferrer"
                    target="_blank"
                  >
                    <NFTHeaderLink>
                      <Image
                        width="40"
                        height="40"
                        alt="nftlinks"
                        src={Rarible.src}
                      />
                    </NFTHeaderLink>
                  </a>
                  <NFTHeaderLink>
                    <Image
                      width="40"
                      height="40"
                      alt="nftlinks"
                      src={Globe.src}
                    />
                  </NFTHeaderLink>
                </>
              )}
            </LeftComponentForNftDetailsTopHeader>
          )}
          {collab.selectedPublishMode === 'nonNftPublish' &&
            members?.length === 0 && (
              <LeftComponentForNftDetailsTopHeader>
                <MintStatusForNFTHeader>
                  {t('Published To RTSN')}
                </MintStatusForNFTHeader>
              </LeftComponentForNftDetailsTopHeader>
            )}
          {collab.selectedPublishMode === 'nonNftPublish' &&
            members?.length > 0 && (
              <LeftComponentForNftDetailsTopHeader>
                <MintStatusForNFTHeader>
                  {collab.nftPublishProcessInitiated
                    ? 'Published To RTSN'
                    : 'Pending'}
                </MintStatusForNFTHeader>
              </LeftComponentForNftDetailsTopHeader>
            )}
        </NFTDetailsTopHeaderDiv>

        <Spacer value={24} />
        <NFTBoxContainer>
          <NFTBoxImageContainer>
            <ImageIconElement
              src={nftImage ? nftImage : DefaultCover}
              width="94%"
              height="244px"
              margin="3%"
              objectFit="cover"
              borderRadius="14px"
              textAlign="center"
              justifyContent="center"
            />
            <NFTImageCaption>{nftTitle}</NFTImageCaption>
          </NFTBoxImageContainer>
          <NFTBoxTextContainer>
            <NFTContentText>
              {nftDescription ? nftDescription : ''}
            </NFTContentText>
          </NFTBoxTextContainer>
        </NFTBoxContainer>
        <Spacer value={24} />

        {members?.length > 0 && (
          <>
            <InputHeader
              color={theme.palette.black.main}
              fontSize="24px"
              fontWeight="700"
              lineHeight="26px"
              marginLeft="20px"
            >
              {t('What do creators have to say')}
            </InputHeader>
            <NFTCreatorMessageBox>
              {members?.map((creator) => {
                return (
                  <>
                    <NFTCreatorMessageBoxContainer>
                      <NFTCreatorMessageProfileContainer>
                        <Avatar
                          size="48px"
                          marginLeft="4px"
                          marginTop="-5px"
                          avatar={creator.userId.imageUrl}
                          statusIcon="verified"
                          statusIconSize={'21px'}
                          statusIconRightPosition={true}
                        />
                        <NFTCreatorProfileTextContainer>
                          <NFTCreatorProfileTitle>
                            {creator.userId.username}
                          </NFTCreatorProfileTitle>
                          <InputBottomText
                            fontFamily={t('Montreal, sans-serif')}
                            fontSize="14px"
                            lineHeight="26px"
                            fontWeight="400"
                            color={theme.palette.grey.commonSecondary}
                          >
                            {creator.userId.email}
                          </InputBottomText>
                        </NFTCreatorProfileTextContainer>
                      </NFTCreatorMessageProfileContainer>

                      <NFTCreatorMessageContainer>
                        <NFTCreatorMessageText
                          color={() => {
                            if (checkStatus(creator) === 'Approved') {
                              return theme.palette.green?.main;
                            } else if (checkStatus(creator) === 'Disapproved') {
                              return theme.palette.red.main;
                            } else {
                              return theme.palette.blue.main;
                            }
                          }}
                        >
                          {checkStatus(creator)}
                        </NFTCreatorMessageText>
                      </NFTCreatorMessageContainer>

                      {
                        <NFTCreatorButtonContainer>
                          <PrimaryButton
                            width="137px"
                            height="36px"
                            borderRadius="5px"
                            alignSelf="center"
                            fontWeight="600"
                            fontSize="14px"
                            lineHeight="16px"
                            onClick={() => {
                              if (creator.approveNftPublishing) {
                                messageButtonClickHandler(creator.userId._id);
                              } else {
                                sendReminderToMembersForNFTApproval(
                                  collab._id,
                                  creator.userId._id,
                                );
                                generateSnackbar('Reminder Sent', 'success');
                              }
                            }}
                          >
                            {creator.approveNftPublishing
                              ? 'Send Message'
                              : 'Send Reminder'}
                          </PrimaryButton>
                        </NFTCreatorButtonContainer>
                      }
                    </NFTCreatorMessageBoxContainer>
                    <Divider strokeWidth="0.15rem" />
                    <Spacer value={64} />
                  </>
                );
              })}
            </NFTCreatorMessageBox>
          </>
        )}
      </NFTDetailContainer>
    </>
  );
};
