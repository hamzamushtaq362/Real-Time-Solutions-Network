import { allowedRoles } from '~/config';

export const check = (action, role) => {
  const roleStr = role ? role : 'default'
  return allowedRoles[action]?.includes(roleStr);

};

const CanRender = (props) =>
  check(props.action, props.currentRole) ? props.yes() : props.no();

CanRender.defaultProps = {
  yes: () => null,
  no: () => null,
};

export default CanRender;
