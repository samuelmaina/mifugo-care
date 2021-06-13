import { Entry } from '../entry';
import { VetView } from './main';

export const vet = (props) => {
	return <Entry Component={VetView} nav={props} />;
};
