import React, { FC, useState } from "react";

interface IErrorMessageProps {
    message: string;
}

const ErrorMessage: FC<IErrorMessageProps> = ({
    message = ""
}) => {
    const [hello, setHello] = useState<string>("Hello from component with message: " + message);

    const onChangeMessage = () => {
        setHello("Message changed with message: " + message);
    };

    return <>
        <span>Props: {message}</span>
        <br />
        <span>States: {hello}</span>
        <br />
        <button onClick={onChangeMessage}>Change Message</button>
    </>;
};

export default ErrorMessage;