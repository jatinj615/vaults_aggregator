import MaxInputInterface from './maxinput.interface';

export default interface SelectInputInterface extends MaxInputInterface {
  tooltipMessage?: string | JSX.Element;
  listSelectedValue?: string;
  onListChange?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
