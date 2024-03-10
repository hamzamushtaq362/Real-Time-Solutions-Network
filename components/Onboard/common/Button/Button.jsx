import { OnboardButtonStyled } from './elements';

const Button = (props) => {
  return <OnboardButtonStyled {...props}>{props.children}</OnboardButtonStyled>;
};

export default Button;
