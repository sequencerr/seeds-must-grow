import { Component } from 'react';

export class CapsuleInfoBlock extends Component {
	props!: {
		title: string;
		value: number;
		measure: string;
	};

	render() {
		const { title, value, measure } = this.props;

		return (
			<div className="capsule__info__elem">
				<div className="capsule__info__title">{title}</div>
				<div className="capsule__info__value">
					{value}
					<span className="capsule__info__measure"> {measure}</span>
				</div>
			</div>
		);
	}
}
