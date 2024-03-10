import { Avatar } from '~/components';
import {
  UserDescriptionContainer,
  UserDescriptionSubContainer,
  UserName,
  UserSubText,
} from './elements';

export const UserDescriptionCell = ({ image, name, subText }) => {
  return (
    <UserDescriptionContainer>
      <Avatar showRing avatar={image} size={32} />

      <UserDescriptionSubContainer ml={-0.5}>
        <UserName>{name}</UserName>
        <UserSubText>{subText}</UserSubText>
      </UserDescriptionSubContainer>
    </UserDescriptionContainer>
  );
};
