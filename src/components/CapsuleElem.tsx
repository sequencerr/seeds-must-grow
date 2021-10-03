import { Component } from 'react';
import { CapsuleInfoBlock } from '.';

export class CapsuleElem extends Component {
	props!: {
		data: Capsule;
	};

	render() {
		const { went_speed, name, power, radiation, slots_count, temperature } = this.props.data;

		return (
			<div className="capsule">
				<div>
					<span className="capsule__name">Capsule "{name}" info:</span>

					<div className="capsule__blocks">
						<CapsuleInfoBlock title="Ventilation Speed" value={went_speed} measure="rpm"></CapsuleInfoBlock>
						<CapsuleInfoBlock title="Power" value={power} measure="kW"></CapsuleInfoBlock>
						<CapsuleInfoBlock title="Radiation" value={radiation} measure="mSv"></CapsuleInfoBlock>
						<CapsuleInfoBlock title="Slots Count" value={slots_count} measure=""></CapsuleInfoBlock>
						<CapsuleInfoBlock title="Temperature" value={temperature} measure="°C"></CapsuleInfoBlock>
					</div>
				</div>
			</div>
		);
	}
}
