import { Entry } from '../../entry';
import { TimelineView } from './main';

export const Timeline = (props) => {
	return <Entry Component={TimelineView} nav={props} />;
};
