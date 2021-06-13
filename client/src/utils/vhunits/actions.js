import { useAuthState } from '../../context';
import * as Styled from '../../components';

export const ShowSuccess = () => {
	const { successMessage } = useAuthState();
	console.log('success message', successMessage);
	return (
		<Styled.SuccessCard>
			{successMessage ? <strong>{successMessage}</strong> : null}
		</Styled.SuccessCard>
	);
};
