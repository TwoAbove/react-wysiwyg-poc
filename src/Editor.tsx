import React, { Component } from 'react';
import RichTextEditor from 'react-rte';

import {
	withStyles,
	createStyles,
	WithStyles,
	Theme
} from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

const type = 'html'

const editorStyles = ({ palette, spacing }: Theme) =>
	createStyles({
		button: {
			margin: spacing(1)
		},
		root: {
			padding: spacing(1)
		}
	});

interface EditorProps extends WithStyles<typeof editorStyles> {
	initialText: string;
	onSave: (data: string) => void;

	readOnly?: boolean;
	onChange?: (data: string) => void;
}

class Editor extends Component<EditorProps> {
	state = {
		value: RichTextEditor.createValueFromString(
			this.props.initialText,
			type
		)
	};

	onChange = (value: any) => {
		this.setState({ value });
	};

	handleClick = () => {
		this.props.onSave(this.state.value.toString(type));
	};

	render() {
		const { value } = this.state;
		const { readOnly, classes } = this.props;
		return (
			<div className={classes.root}>
				<RichTextEditor
					value={value}
					readOnly={readOnly}
					onChange={this.onChange}
				/>
				<Button
					variant="outlined"
					component="span"
					onClick={this.handleClick}
					className={classes.button}
				>
					Send
				</Button>
			</div>
		);
	}
}

export default withStyles(editorStyles)(Editor);
