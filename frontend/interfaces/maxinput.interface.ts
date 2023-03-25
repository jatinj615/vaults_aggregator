export default interface MaxInputInterface {
  id: string;
  name?: string;
  primaryText?: string | JSX.Element;
  secondaryText?: string | JSX.Element;
  disabled?: boolean;
  value: string;
  step?: number;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
  handleInput: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  handleClickMaxBtn?: React.MouseEventHandler<HTMLButtonElement>;
  handleClickHalfBtn?: React.MouseEventHandler<HTMLButtonElement>;
  customStyles?: any;
}
