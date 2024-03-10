import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import {
  acceptOrRejectCollectiveInvite,
  getPublicCollabDetailsByLink,
} from 'apis/collective';

import { Divider, useTheme } from '@mui/material';
import {
  CollectiveDetailsContainer,
  CollectiveProfileContainer,
} from './elements';

import { NavButtonGroup, FooterBottomSection } from '~/components';
import MemberCollectiveApproval from './MemberCollectiveApproval/MemberCollectiveApproval';
import { getAllProjectOfCollective } from 'apis/collectiveProject';
import { CollectiveDetailsTopSection } from './CollectiveDetailsTopSection';
import { CollectiveProfileInformationSection } from './CollectiveProfileInformationSection';
import { CollectiveMembersSection } from './CollectiveMembersSection';
import { CollectiveInvitesSection } from './CollectiveInvitesSection';
import { CollectiveAllCollabsSection } from './CollectiveAllCollabsSection';
import { useTranslation } from 'react-i18next';
import AppContext from 'context/AppContext';

export const CollectiveDetails = ({ collectiveLink, isPublic }) => {
  const [loading, setLoading] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [acceptedMembers, setAcceptedMembers] = useState([]);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [memberStatus, setMemberStatus] = useState(null);
  const { user } = useContext(AppContext);
  const [collectiveData, setcollectiveData] = useState();
  const [collectiveId, setcollectiveId] = useState(null);
  const [collectiveProjects, setCollectiveProjects] = useState([]);

  const [activeButton, setActiveButton] = useState('all-collabs');
  const [isAdmin, setIsAdmin] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();

  const buttonsData = [
    {
      text: t('All Collabs'),
      value: 'all-collabs',
      count: collectiveProjects?.length,
    },
    {
      text: t('Members'),
      value: 'members',
      count: acceptedMembers?.length,
      hide: acceptedMembers?.length === 0,
    },
    {
      text: t('Invites'),
      value: 'invites',
      hide: !isAdmin || pendingMembers?.length === 0,
      count: pendingMembers?.length,
    },
    {
      text: t('Information'),
      value: 'information',
    },
  ];

  useEffect(() => {
    if (user && collectiveData) {
      const collectiveMember = collectiveData.members;
      collectiveMember.forEach((collectiveMember) => {
        if (collectiveMember?.userId?._id === user.userId) {
          setIsMember(true);
          setMemberStatus(collectiveMember);
        }
      });
      if (collectiveData?.admin?._id === user.userId) {
        setIsAdmin(true);
      }
    }
  }, [user, collectiveData]);

  const filterMembers = (members, admin) => {
    if (members) {
      let acceptedMembersArray = members.filter((user) => {
        if (user.status === 'ACCEPTED') {
          return user;
        }
      });
      let pendingMembersArray = members.filter((user) => {
        if (user.status === 'PENDING') {
          return user;
        }
      });

      setAcceptedMembers([{ userId: admin }, ...acceptedMembersArray]);
      setPendingMembers(pendingMembersArray);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const collectiveResponse = await getPublicCollabDetailsByLink(
        collectiveLink,
      );

      setcollectiveId(collectiveResponse?._id);
      filterMembers(collectiveResponse?.members, collectiveResponse?.admin);
      setcollectiveData(collectiveResponse);
    };
    getData();
  }, [collectiveLink]);

  const apiCall = async (status) => {
    setLoading(true);
    const newMember = await acceptOrRejectCollectiveInvite(
      collectiveId,
      status,
    );
    setAcceptedMembers([...acceptedMembers, newMember]);
    setLoading(false);
  };

  useEffect(() => {
    const getCollectiveProjects = async () => {
      const collectiveProjects = await getAllProjectOfCollective(collectiveId);

      if (collectiveProjects) {
        setCollectiveProjects(collectiveProjects);
      }
    };
    if (collectiveId) {
      getCollectiveProjects();
    }
  }, [collectiveId]);
  const showNavbar = !(
    buttonsData.filter((item) => item.hide === false || item.hide === undefined)
      .length === 1
  );

  return (
    <>
      {isMember && memberStatus.status === 'PENDING' && (
        <MemberCollectiveApproval
          member={memberStatus}
          apiCall={apiCall}
          loading={loading}
        />
      )}

      {collectiveData && (
        <CollectiveDetailsContainer>
          <CollectiveProfileContainer>
            {/* Team Profile Top Section */}
            <CollectiveDetailsTopSection
              collective={collectiveData}
              isPublic={isPublic}
              isAdmin={isAdmin}
              collectiveProjectsCount={collectiveProjects?.length}
            />

            {!isPublic && (
              <>
                {/* Tab Button Group */}
                {showNavbar ? (
                  <NavButtonGroup
                    buttonsData={buttonsData}
                    activeButton={activeButton}
                    setActiveButton={setActiveButton}
                    showBorderTop={true}
                    showBorderBottom={true}
                    sx={{ padding: '25px 30px' }}
                  />
                ) : (
                  <Divider color={theme.palette.borderLight} margin={0} />
                )}
                {activeButton === 'members' && (
                  <CollectiveMembersSection
                    members={acceptedMembers}
                    collective={collectiveData}
                    collectiveId={collectiveId}
                  />
                )}

                {activeButton === 'invites' && (
                  <>
                    <CollectiveInvitesSection invites={pendingMembers} />
                  </>
                )}
                {activeButton === 'all-collabs' && (
                  <>
                    <CollectiveAllCollabsSection
                      collective={collectiveData}
                      collabs={collectiveProjects}
                      collectiveLink={collectiveLink}
                    />
                  </>
                )}

                {activeButton === 'information' && (
                  <CollectiveProfileInformationSection
                    collective={collectiveData}
                    setActiveButton={setActiveButton}
                  />
                )}
              </>
            )}

            {isPublic && (
              <>
                <Divider />
                <CollectiveProfileInformationSection
                  collective={collectiveData}
                  setActiveButton={setActiveButton}
                />
              </>
            )}
          </CollectiveProfileContainer>
          <FooterBottomSection />
        </CollectiveDetailsContainer>
      )}
    </>
  );
};
