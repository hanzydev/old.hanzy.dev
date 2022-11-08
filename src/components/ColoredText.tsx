import { FC } from 'react';

type IProps = {
    text: string;
    color: string;
} & React.HTMLAttributes<HTMLSpanElement>;

const ColoredText: FC<IProps> = ({ text, color, ...props }) => {
    return <span className={`text-${color}`} {...props}>{text}</span>;
};

export default ColoredText;
