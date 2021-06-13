// backbone structure for Both History Review and Request Timeline

import React, { useState, useEffect } from 'react';
import * as Styled from '../../components';
import { ReviewBox } from '../../views/private/sysview1/Ratings/Review/';
import { useAuthDispatch } from '../../context';
import * as utils from '../../utils';

export const PairStruct = (props) => {
	const [data, setData] = useState([]);

	const dispatch = useAuthDispatch();
	const handleReview = (e, index) => {
		setReviewer(!Reviewer);
		utils.clearContextErrors(dispatch);
		utils.clearSuccessMessage(dispatch);
		setBoxInView(index);
	};

	const review = props.RBtn;
	useEffect(() => {
		const doRequestAlljobs = async (status) => {
			const data = await utils.doRequestAlljobs(dispatch);
			if (data) setData(utils.sanitizedJobs(data.jobs, status));
		};

		if (review) doRequestAlljobs('done');
		else doRequestAlljobs('allocated');
	}, [dispatch, review]);

	const [Reviewer, setReviewer] = useState(false);
	const [inview, setBoxInView] = useState(0);

	return (
		<Styled.VetView>
			{data.length !== 0 ? (
				<Styled.PairStruct>
					{data.map((req, i) => (
						<Styled.ViewTask key={req._id}>
							<Styled.RequestedView>
								<div>
									<Styled.PostedBy>Date :</Styled.PostedBy>
									<Styled.DatePosted>
										{utils.getSplitDate(req.time, 'date')}
									</Styled.DatePosted>
								</div>
								<div>
									<Styled.PostedBy>Time :</Styled.PostedBy>
									<Styled.DatePosted>
										{utils.getSplitDate(req.time, 'time')}
									</Styled.DatePosted>
								</div>
								<div>
									<Styled.PostedBy>Amount :</Styled.PostedBy>
									<Styled.DatePosted>{req.amount}</Styled.DatePosted>
								</div>
								<div>
									<Styled.PostedBy>speciality :</Styled.PostedBy>
									<Styled.DatePosted>{req.speciality}</Styled.DatePosted>
								</div>
								<div>
									<Styled.PostedBy>description :</Styled.PostedBy>
									<Styled.DatePosted>{req.description}</Styled.DatePosted>
								</div>
							</Styled.RequestedView>
							<Styled.AssignedView>
								<div>
									<Styled.RequestStatus>{req.status}</Styled.RequestStatus>
								</div>
							</Styled.AssignedView>
							<Styled.AssignedView>
								<div>
									{review ? (
										<Styled.ReviewVetButton
											style={{ float: 'right' }}
											onClick={(e) => handleReview(e, i)}>
											Write a review{' '}
										</Styled.ReviewVetButton>
									) : null}
								</div>
								{Reviewer && i === inview ? (
									<ReviewBox setReviewer={setReviewer} job_id={req._id} />
								) : null}
							</Styled.AssignedView>
						</Styled.ViewTask>
					))}
				</Styled.PairStruct>
			) : (
				<Styled.PairStruct>
					<div style={{ textAlign: 'center' }}>your Timeline is Empty</div>
				</Styled.PairStruct>
			)}
		</Styled.VetView>
	);
};
