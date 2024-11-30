import React from "react";

const Message = ({ senderId, message }) => {
	return (
		<div>
			<strong>{senderId}</strong>: <span>{message}</span>
		</div>
	);
};

export default Message;
