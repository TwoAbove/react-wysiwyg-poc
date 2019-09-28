import React, { Component } from 'react';
import axios from 'axios';

import {
	withStyles,
	createStyles,
	WithStyles,
	Theme
} from '@material-ui/core/styles';

import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import logo from './logo.svg';
import './App.css';
import Editor from './Editor';
import ChatMessage from './ChatMessage';

const getDataForId = (id: string) =>
	axios.get(`/api/chat/${id}`).then(response => response.data);

const sendMessageForId = (id: string, data: any) =>
	axios.post(`/api/chat/${id}`, data).then(response => response.data);

const appStyles = ({ palette, spacing }: Theme) =>
	createStyles({
		connectButton: {
			margin: spacing(1)
		},
		root: {
			padding: spacing(1)
		},
		textField: {},
		messages: {}
	});

interface IProps extends WithStyles<typeof appStyles> {}
interface IState {
	chatId: string;
	userId: string;
	chatData: Array<{ text: string; name: string }>;
}

class App extends Component<IProps, IState> {
	state: IState = {
		chatId: '',
		userId: '',
		chatData: []
	};

	render() {
		const { chatId, userId, chatData } = this.state;
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<TextField
					id="standard-name"
					label="Chat Id"
					className={classes.textField}
					value={chatId}
					onChange={this.handleChange('chatId')}
					margin="normal"
				/>
				<TextField
					id="standard-name"
					label="User Name"
					className={classes.textField}
					value={userId}
					onChange={this.handleChange('userId')}
					margin="normal"
				/>
				<Button className={classes.connectButton} onClick={this.connect}>
					Connect
				</Button>
				<div className={classes.messages}>
					{chatData.map((chatMessage, i) => (
						<ChatMessage
							key={i}
							text={chatMessage.text}
							name={chatMessage.name}
						/>
					))}
				</div>
				<div>
					<Editor onSave={this.handleSave} initialText="" />
				</div>
			</div>
		);
	}

	connect = async () => {
		const data = await getDataForId(this.state.chatId);
		this.setState({
			chatData: data
		});
	};

	handleSave = async (text: string) => {
		const { userId, chatId } = this.state;
		const data = {
			text,
			name: userId
		};
		const res = await sendMessageForId(chatId, data);
		this.setState({
			chatData: res
		});
	};

	handleChange = (name: any) => (event: any) => {
		this.setState({ [name]: event.target.value } as IState);
	};
}

export default withStyles(appStyles)(App);
