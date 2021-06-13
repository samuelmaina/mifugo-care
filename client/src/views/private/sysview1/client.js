import MainView from './main';

import { Entry } from '../entry';

export const Client = (props) => {
	return <Entry Component={MainView} nav={props} />;
};
