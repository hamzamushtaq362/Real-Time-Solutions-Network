import { useTranslation } from 'react-i18next';
import { addDiscordBot } from 'apis/discordApi';
import { useNotistack } from 'hooks/useNotistack';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function Discord() {
  const { t } = useTranslation();

  const router = useRouter();

  const generateSnackbar = useNotistack();

  const { code } = router.query;

  const runBot = async () => {
    const collabId = localStorage.getItem('collabIdForDiscord');
    if (!collabId) return;
    generateSnackbar('Adding discord bot', 'info');
    const data = await addDiscordBot(code, collabId);
    if (!data || !data.data) {
      generateSnackbar('Error adding discord bot redirecting', 'error');
      localStorage.removeItem('collabIdForDiscord');
      router.push(`/collab/${collabId}/add-discord`);
      return;
    }
    localStorage.removeItem('collabIdForDiscord');
    generateSnackbar('Discord bot added successfully. Redirecting', 'success');
    router.push(`/collab/${collabId}/add-discord`);
  };

  useEffect(() => {
    if (code) {
      runBot();
    }
  }, [code]);

  return <div style={{ margin: '20px 10px' }}>{t("Loading....")}</div>;
}
