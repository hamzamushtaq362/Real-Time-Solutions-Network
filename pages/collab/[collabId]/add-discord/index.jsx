import { AuthLayout, MainLayout } from '~/layouts';
import AddDiscordBotMain from 'components/CollabDetails/CollabDetailsLayouts/AddDiscordBotMain';

export default function AddDiscordBotPage() {
  return <AddDiscordBotMain />;
}

AddDiscordBotPage.getLayout = function getLayout(page) {
  //   const collabDetails = page?.props?.collabResponse?.data?.collab;

  //   const { title, description, image, keywords } =
  //     getCollabDetailsMetaInfomation(collabDetails);

  return (
    <MainLayout
    //   title={title}
    //   description={description}
    //   image={image}
    //   keywords={keywords}
    >
      <AuthLayout>{page}</AuthLayout>
    </MainLayout>
  );
};
