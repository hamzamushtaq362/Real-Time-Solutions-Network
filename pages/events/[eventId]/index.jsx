import { AuthLayout, MainLayout } from '~/layouts';
import { fetchHostedEventDetails } from '~/apis';
import { getCollabDetailsMetaInfomation } from '~/utils';
import { EventDetails } from '../../../components/Events/EventDetails';

export default function EventDetailsPage(props) {
  return <EventDetails eventResponse={props.collabEvent} />;
}

EventDetailsPage.getLayout = function getLayout(page) {
  const eventDetails = page?.props?.collabEvent;
  
  const { title, description, image, keywords } =
    getCollabDetailsMetaInfomation(eventDetails);
  
  return (
    <MainLayout
      title={title}
      description={description}
      image={image}
      keywords={keywords}
    >
      <AuthLayout>{page}</AuthLayout>
    </MainLayout>
  );
};

export async function getServerSideProps(context) {
  const { eventId } = context.params;

  // get public event details
  const eventRes = await fetchHostedEventDetails(eventId);

  // Redirect if status is 'draft'
  // if (eventResponse?.data?.event?.status === 'draft') {
  //   return {
  //     redirect: {
  //       destination: `/event/${[eventId]}/edit?source=${eventResponse?.data?.event?.source}`,
  //       permanent: false,
  //     },
  //   };
  // }
  
  return {
    props: {
      collabEvent: eventRes.collabEvent,
    },
  };
}
