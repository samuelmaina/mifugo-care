import { Entry } from '../../entry';
import { RequestService } from './main';

export const Request = (props) => {
	return <Entry Component={RequestService} nav={props}></Entry>;
};
