import { Redirect, useParams } from 'react-router';
import { CapsuleElem, capsuleService } from '.';

// Hook https://usehooks.com/useRouter/
export function CapsulePage() {
	const { id } = useParams<Record<string, string>>();

	const newLocal = capsuleService.findCapsuleByID(id);
	if (!newLocal) return <Redirect to="/" />;
	return <CapsuleElem data={newLocal} />;
}
