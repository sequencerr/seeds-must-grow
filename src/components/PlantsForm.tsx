import { ChangeEvent, Component, FormEvent } from 'react';

// https://reactjs.org/docs/forms.html#controlled-components
export class PlantsForm extends Component {
	state = {
		value: ''
	};

	handleChange(event: ChangeEvent<HTMLInputElement>) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event: FormEvent<HTMLFormElement>) {
		alert('Sended Plant: ' + this.state.value);
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<label>
					Plant:
					<input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
				</label>
				<input type="submit" value="Send" />
			</form>
		);
	}
}
