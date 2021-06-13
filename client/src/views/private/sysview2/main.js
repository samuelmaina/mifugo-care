import React, { useState, useEffect } from 'react';
import * as Styled from '../../../components';
import { Slider, remoteuri, ShowSuccess } from '../../../utils';
import * as taskPane from './Task';
import { fetchData, useAuthDispatch } from '../../../context';

export const VetView = (props) => {
	const dispatch = useAuthDispatch();
	const [selected, setSelected] = useState(0);
	///Pool for Recommended Jobs
	const [pool1, setPool1] = useState([]);
	///Pool for Main Jobs
	const [poolMain, setMain] = useState([]);
	const [viewMap, setView] = useState(true);
	const [viewRecommendations, setviewRecommendation] = useState(1);
	const [afterTaskDone, setAfterMath] = useState(0);

	useEffect(() => {
		const getrecom = async () => {
			let data = await fetchData(dispatch, remoteuri.viewRecomm);
			if (data) {
				setPool1(data.jobs);
			}
		};
		getrecom();
		const interval = setInterval(() => getrecom(), 60000);
		return () => {
			clearInterval(interval);
		};
	}, [dispatch]);

	const handlerecChange = async (status) => {
		if (!status) {
			let data = await fetchData(dispatch, remoteuri.getPool);
			if (data) {
				setMain(data.jobs);
				let dt = await fetchData(dispatch, remoteuri.viewRecomm);
				if (dt) {
					setPool1(dt.jobs);

					setSelected(0);
				}
			}
		}
		setSelected(0);
		setviewRecommendation(status);
	};
	const UnderRecActive = () =>
		viewRecommendations ? '2px solid lightgray' : '0';

	const underJPoolActive = () =>
		!viewRecommendations ? '2px solid lightgray' : '0';

	let jobs = [];
	jobs = poolMain ? poolMain : jobs;
	if (viewRecommendations) jobs = pool1 ? pool1 : [];

	return (
		<Styled.VetView>
			{afterTaskDone ? (
				<taskPane.Aftermath
					data={jobs[selected].job_id}
					setAfterMath={setAfterMath}
					setMain={setMain}
					handlerecChange={handlerecChange}
				/>
			) : (
				<Styled.VetView>
					<Styled.VetViewHeader style={{ width: '100%' }}>
						<div onClick={(e) => handlerecChange(true)}>
							<Styled.H2
								style={{
									borderBottom: `${UnderRecActive()}`,
								}}>
								View Recommended Tasks
							</Styled.H2>
						</div>
						<div onClick={(e) => handlerecChange(false)}>
							<Styled.H2
								style={{
									borderBottom: `${underJPoolActive()}`,
								}}>
								My jobpool
							</Styled.H2>
						</div>
					</Styled.VetViewHeader>

					{jobs.length !== 0 ? (
						<Styled.VetView>
							<div
								style={{
									flex: '1 1 40%',
									margin: '2rem',
									borderTop: '40px solid #1280a5',
									borderRadius: '5px',
								}}>
								<Styled.Ol>
									{jobs.map((task, i) => (
										<Styled.Li
											key={task.job_id._id}
											onClick={(e) => setSelected(i)}>
											{taskPane.TaskTimeOfTheDay(task.job_id.time)}
										</Styled.Li>
									))}
								</Styled.Ol>
							</div>
							<div>
								{
									<taskPane.Task
										{...parseJobs(jobs, selected)}
										setView={setView}
										viewMap={viewMap}
										viewRec={viewRecommendations}
										setAfterMath={setAfterMath}
										setviewRecommendation={setviewRecommendation}
										handlerecChange={handlerecChange}
										setMain={setMain}
									/>
								}
								{viewRecommendations ? null : <ShowSuccess />}
							</div>
							<div
								style={{
									flex: '1 1 70%',
									margin: '2rem',
									borderTop: '20px solid #1280a5',
									borderRadius: '5px',
									boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.05)',
								}}>
								{viewMap ? (
									<taskPane.GoogleMap data={parseLocation(jobs, selected)} />
								) : (
									<Slider
										component={taskPane.PhotosSlideView}
										{...parseJobs(jobs, selected)}
										num={parseNum(jobs, selected)}
									/>
								)}
							</div>
						</Styled.VetView>
					) : (
						<Styled.VetView>
							<Styled.VetViewHeader style={{ width: '100%' }}>
								<Styled.Plainfield>
									You have no scheduled tasks
								</Styled.Plainfield>
							</Styled.VetViewHeader>
						</Styled.VetView>
					)}
				</Styled.VetView>
			)}
		</Styled.VetView>
	);
};

const parseNum = (jobs, selected) => {
	if (jobs[selected] === undefined) {
		const len = jobs.length;
		return jobs[len - 1].job_id.imageUrls.length;
	}
	return jobs[selected].job_id.imageUrls.length;
};

const parseJobs = (jobs, selected) => {
	if (jobs[selected] === undefined) {
		const len = jobs.length;
		return jobs[len - 1];
	} else return jobs[selected];
};

const parseLocation = (jobs, selected) => {
	if (jobs[selected] === undefined) {
		const len = jobs.length;
		return jobs[len - 1].job_id;
	}
	return jobs[selected].job_id;
};
