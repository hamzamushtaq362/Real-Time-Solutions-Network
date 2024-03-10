import { AuthLayout } from 'layouts';
import { CreatorProfilePage } from 'components/CreatorProfile/CreatorProfilePage';

export const CreatorProfileWrapper = (props) => {
  return (
    <AuthLayout>
      <CreatorProfilePage user={props?.user} />
    </AuthLayout>
  );
};
