import * as Styled from '../../../../components';
import { UploadData, useAuthDispatch } from '../../../../context';
import { remoteuri } from '../../../../utils';
import { successResponse } from '../../../../utils/vhmethods/context';

export const TaskTimeOfTheDay = (raisedAt) => {
	const date = new Date(raisedAt);
	return date.toLocaleString('en-GB').replace(',', ' at ');
};

export const Task = (props) => {
	let response;
	const task = props.job_id;
	const data = {
		job_id: task._id,
	};

	const dispatch = useAuthDispatch();
	async function reject(e) {
		/***
		 * Not implemented on the Backend
		 */
		return 1;
	}
	async function accept(e) {
		response = await UploadData(dispatch, data, remoteuri.addtoPull);
		if (response) {
			successResponse('Success', dispatch);
			props.handlerecChange(false);
		}
	}
	return (
		<div
			className='task'
			style={{
				boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.05)',
				borderTop: '40px solid #1280a5',
				borderRadius: '5px',
				margin: '2rem',
				padding: '2rem',
			}}>
			<section>
				<strong>species:</strong> {task.speciality}
			</section>
			<section>
				<strong>Description:</strong> <span>{task.description}</span>
			</section>
			<Styled.TasksFlexer>
				<Styled.CustomButtons
					type='button'
					onClick={(e) => props.setView(!props.viewMap)}>
					<strong>view {props.viewMap ? 'photos' : 'map'}</strong>
				</Styled.CustomButtons>
				{props.viewRec ? (
					<Styled.ActOnRecTaskCont>
						<strong>Confirm Task ?</strong>
						<br />
						<Styled.DoReccTask type='button' onClick={(e) => accept(e)}>
							Accept
						</Styled.DoReccTask>
						<Styled.DoReccTask type='button' onClick={(e) => reject(e)}>
							Reject
						</Styled.DoReccTask>
					</Styled.ActOnRecTaskCont>
				) : (
					<div>
						<strong>Mark done </strong>
						<Styled.TaskDone
							onClick={(e) => {
								props.setAfterMath(true);
							}}>
							&#10004;
						</Styled.TaskDone>
					</div>
				)}
			</Styled.TasksFlexer>
		</div>
	);
};
