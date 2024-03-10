import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import { CollabOverviewTitle } from './elements';
import { PrimaryButton, SecondaryButton } from 'components/Button';

import { Spacer } from '~/components';
import {
  RowContainer,
  RowLabelHeaderContainer,
  RowLabelHeader,
  InputLabel,
  RowContentContainer,
  ContentSubContainer,
} from 'components/UserSettings/UserSettingsAccountSection/elements';
import { useState } from 'react';
import { Dropdown } from 'components/Dropdown/Dropdown';
import { useNotistack } from 'hooks/useNotistack';
import { useRouter } from 'next/router';
import { addDiscordChannel, getDiscordChannels } from 'apis/discordApi';
import { getCollabIdByTitleIdentifier } from '~/apis';

const DropdownBox = ({ title, subtitle, label, value, setValue, options }) => (
  <RowContainer>
    <RowLabelHeaderContainer>
      <RowLabelHeader>{title}</RowLabelHeader>
      <InputLabel>{subtitle}</InputLabel>
    </RowLabelHeaderContainer>
    <RowContentContainer>
      <ContentSubContainer>
        <InputLabel>{label}</InputLabel>
        <Spacer value={20} />
        <Dropdown
          selectedItem={value}
          setSelectedItem={(value) => setValue(value)}
          options={options}
          width="100%"
          // onBlurCapture={handleSubmit(onSaveDetails)}
        />
      </ContentSubContainer>
    </RowContentContainer>
  </RowContainer>
);

export default function AddDiscordBotMain() {
  const { t } = useTranslation();

  const router = useRouter();
  const [collabId, setCollabId] = useState('');
  const generateSnackbar = useNotistack();

  const [discordChannels, setDiscordChannels] = useState([]);
  const [value, setValue] = useState('Select Channel');
  const [channelNames, setChannelNames] = useState([]);

  const handleConnectDiscordClick = async () => {
    const collabId = await getCollabIdByTitleIdentifier(router.query.collabId);

    setCollabId(collabId);

    localStorage.setItem('collabIdForDiscord', router.query.collabId);

    router.push(
      `https://discord.com/api/oauth2/authorize?client_id=1099958160686583828&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fdiscord&response_type=code&scope=bot`,
    );
  };

  const handleAddClick = async () => {
    if (!collabId) return;
    if (value === 'Select Channel') {
      generateSnackbar('Please select a channel', 'info');
      return;
    }
    const channelId = discordChannels.find(
      (channel) => channel.label === value,
    );
    if (!channelId) return;

    const addChannel = await addDiscordChannel(collabId, channelId.value);

    if (!addChannel || !addChannel.data) {
      generateSnackbar('Error adding channel', 'info');
      return;
    }

    if (addChannel.data.message == 'Channel already added') {
      generateSnackbar('Channel already added', 'info');
      return;
    }

    generateSnackbar('Channel added successfully', 'success');
  };

  useEffect(() => {}, [value]);

  const getChannels = async () => {
    const data = await getDiscordChannels(collabId);
    setDiscordChannels(data?.data?.data || []);
    setChannelNames(data?.data?.channelNames || []);
  };

  useEffect(() => {
    if (!collabId) return;
    getChannels();
  }, [collabId]);

  return (
    (<div style={{ margin: '20px 20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CollabOverviewTitle>{t("Add Channel")}</CollabOverviewTitle>
        <PrimaryButton
          onClick={handleAddClick}
          style={{ width: 'fit-content' }}
        >{t("Add")}</PrimaryButton>
      </div>
      {!discordChannels ||
        (discordChannels.length === 0 && (
          <div style={{ width: 'fit-content' }}>
            {/* <Link
          href={`https://discord.com/api/oauth2/authorize?client_id=1099958160686583828&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fdiscord&response_type=code&scope=bot`}
        > */}
            <SecondaryButton onClick={handleConnectDiscordClick}>{t("Connect Discord Server")}</SecondaryButton>
            {/* </Link> */}
          </div>
        ))}
      {/* Select channel dropdown */}
      <Spacer type="y" value={30} />
      {discordChannels && discordChannels.length > 0 && (
        <DropdownBox
          title={t("Channel Name")}
          subtitle={t("Select Channel Namee")}
          label={t("Select Channnel")}
          value={value}
          options={channelNames}
          setValue={setValue}
        />
      )}
      <Spacer type="y" value={30} />
    </div>)
  );
}
