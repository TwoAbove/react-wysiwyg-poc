import React, { Component } from 'react';
import RichTextEditor from 'react-rte';

import { Typography } from '@material-ui/core';

interface MessageProps {
	text: string;
	name: string;
}

const Message = (props: MessageProps) => {
	const { name, text } = props;
	const value = RichTextEditor.createValueFromString(text, 'markdown');
	return (
		<div>
			<Typography>Name: {name}</Typography>
			<RichTextEditor value={value} readOnly />
		</div>
	);
};

export default Message;
