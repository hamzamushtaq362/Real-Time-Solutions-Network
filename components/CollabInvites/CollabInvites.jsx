import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL, fetchRefreshToken } from '~/apis';
import { Spacer, CardsEmptyState, LoadingMore } from '~/components';
import { reFetchTokenExpire } from '~/redux';
import {
  InvitationsContainer,
  InvitationsGridContainer,
  InvitesTitle,
} from './elements';
import InvitationTileSent from './components/InvitationTileSent';
import { InvitationsHeader } from './components/InvitationsHeader';
import InvitationTileReceived from './components/InvitationTileReceived';
import { InvitationTileSkeleton } from './components/InviteTileSkeleton';
import { useNotistack, useWindowSize } from '~/hooks';
import { setSessionData, getLimitRecordsByScreenSize } from '~/utils';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslation } from 'react-i18next';

export const CollabInvites = ({ explore }) => {
  const [activeTab, setActiveTab] = useState('created');
  const generateSnackbar = useNotistack();
  const buttonsData = [
    { id: 1, type: 'created', text: 'Sent' },
    { id: 2, type: 'all', text: 'Received' },
  ];

  const [invites, setInvites] = useState([]);
  const [auth, setAuth] = useState(null);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitRecords, setLimitRecords] = useState(30);
  const [noMoreRemainingCollabs, setNoMoreRemainingRecords] = useState(false);
  const { t } = useTranslation();
  const windowSize = useWindowSize();

  const getSentInvites = async (type, initialLimitRecords) => {
    try {
      setLoading(true);
      const f1 = async () => {
        let obj = {};
        if (type === 'sent') {
          obj['senderId'] = auth.userId;
        } else {
          obj['receiverId'] = auth.userId;
        }
        const res = await axios.post(
          `${BASE_URL}/api/v1/collabmember/all?page=${currentPage}&limit=${initialLimitRecords}`,
          {
            ...obj,
            isInvite: true,
          },
        );
        if (res) return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res?.data?.status === 'fail-discord') {
        generateSnackbar(res.data.message, 'error');
      }
      if (res?.data?.status === 'success') {
        const members = res?.data?.data?.members;

        setInvites(members);
        if (type === 'sent') {
          setSessionData('sent-invites', members);
        } else {
          setSessionData('received-invites', members);
        }

        if (members?.length < initialLimitRecords) {
          setNoMoreRemainingRecords(true);
        }
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const getNextSentInvites = async (type) => {
    try {
      const f1 = async () => {
        let obj = {};
        if (type === 'sent') {
          obj['senderId'] = auth.userId;
        } else {
          obj['receiverId'] = auth.userId;
        }
        const res = await axios.post(
          `${BASE_URL}/api/v1/collabmember/all?page=${
            currentPage + 1
          }&limit=${limitRecords}`,
          {
            ...obj,
            isInvite: true,
          },
        );
        if (res) return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res?.data?.status === 'fail-discord') {
        generateSnackbar(res.data.message, 'error');
      }
      if (res?.data?.status === 'success') {
        const members = res?.data?.data?.members;

        setInvites((prevState) => {
          return [...prevState, ...members];
        });

        if (members?.length === 0) {
          setNoMoreRemainingRecords(true);
        }
        setCurrentPage((prevState) => prevState + 1);
      }
    } catch {
      //
    }
  };

  const refreshHandler = () => {
    if (activeTab === 'created') {
      getSentInvites('sent');
    } else {
      getSentInvites('received');
    }
  };

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    setAuth(auth);
  }, []);

  // <> Please do not remove <>
  //   useEffect(() => {
  //     if (activeTab === 'created') {
  //       // const sentInvites = getSessionData('sent-invites');
  //       // if (false) {
  //       //   setInvites(sentInvites);
  //       // } else {
  //       //   getSentInvites('sent');
  //       // }
  //       getSentInvites('sent');
  //     } else {
  //       // const receivedInvites = getSessionData('received-invites');
  //       // if (receivedInvites) {
  //       //   setInvites(receivedInvites);
  //       // } else {
  //       //   getSentInvites('received');
  //       // }
  //       getSentInvites('received');
  //     }
  //   }, [activeTab, auth]);

  //   useEffect(() => {
  //     // Resetting state
  //     setInvites([]);
  //     setCurrentPage(1);
  //     setLimitRecords(30);
  //     setNoMoreRemainingRecords(false);
  //   }, [activeTab]);

  useEffect(() => {
    if (windowSize?.width) {
      setInvites([]);
      setCurrentPage(1);
      setNoMoreRemainingRecords(false);

      const records = getLimitRecordsByScreenSize(windowSize?.width);
      setLimitRecords(records);

      if (activeTab === 'created') {
        getSentInvites('sent', records);
      } else {
        getSentInvites('received', records);
      }
    }
  }, [windowSize, activeTab]);

  return (
    <InvitationsContainer>
      {!explore && <InvitesTitle>{t('Invites')}</InvitesTitle>}

      <Spacer value={32} />

      <InvitationsHeader
        width={'300px'}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        buttonsData={buttonsData}
        loading={loading}
        refreshHandler={refreshHandler}
      />

      <Spacer value={32} />
      <>
        {!loading ? (
          <>
            {activeTab === 'created' && (
              <>
                {invites && invites.length > 0 ? (
                  <InfiniteScroll
                    dataLength={invites?.length || 0}
                    next={() => getNextSentInvites('sent')}
                    hasMore={!noMoreRemainingCollabs}
                    loader={<LoadingMore />}
                    endMessage={<></>}
                  >
                    <InvitationsGridContainer>
                      {invites.map((inv, index) => {
                        return <InvitationTileSent key={index} inv={inv} />;
                      })}
                    </InvitationsGridContainer>
                  </InfiniteScroll>
                ) : (
                  !loading && (
                    <CardsEmptyState
                      emptyStateText="There are no Invites found"
                      isInvite={true}
                    />
                  )
                )}
              </>
            )}
            {activeTab === 'all' && (
              <>
                {invites && invites.length > 0 ? (
                  <InfiniteScroll
                    dataLength={invites.length}
                    next={() => getNextSentInvites('received')}
                    hasMore={!noMoreRemainingCollabs}
                    loader={<LoadingMore />}
                    endMessage={<></>}
                  >
                    <InvitationsGridContainer>
                      {invites.map((inv, index) => {
                        return <InvitationTileReceived key={index} inv={inv} />;
                      })}
                    </InvitationsGridContainer>
                  </InfiniteScroll>
                ) : (
                  <>
                    {!loading && (
                      <CardsEmptyState
                        emptyStateText="There are no Invites founds"
                        isInvite={true}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <InvitationsGridContainer>
            {[...Array(20)].map((_, index) => (
              <InvitationTileSkeleton
                inviteType={activeTab === 'created' ? 'sent' : 'received'}
                key={index}
              />
            ))}
          </InvitationsGridContainer>
        )}
      </>
    </InvitationsContainer>
  );
};
