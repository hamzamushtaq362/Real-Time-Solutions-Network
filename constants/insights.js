import { useTranslation } from 'react-i18next';
export const insightsConfig =()=>{
  const { t } = useTranslation();

  [
    {
      id: 1,
      type: 'all',
      path: '/',
      text: t('All'),
    },
    // {
    //   id: 2,
    //   type: 'collab',
    //   path: '/',
    //   text: 'Collabs',
    // },
    {
      id: 3,
      type: 'nft',
      path: '/',
      text: t('NFT'),
    },
    {
      id: 4,
      type: 'collector',
      path: '/',
      text: t('Collector'),
    },
  ];
  
};