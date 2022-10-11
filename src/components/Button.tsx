import { ButtonHTMLAttributes, FC, memo } from 'react'
import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
};

const Button:FC<ButtonProps> = ({isOutlined = false, ...props}: ButtonProps) => {
  return (
    <button className={`button ${isOutlined ? "outlined" : ''}`}  {...props} />
  )
}

export default memo(Button);
