import React, { useState } from 'react';
import { DrawReviewStars } from './stars';
import * as utils from '../../../../../utils';
import * as Styled from '../../../../../components';
import { UploadData, useAuthDispatch } from '../../../../../context';

export const ReviewBox = (props) => {
	const dispatch = useAuthDispatch();
	const [rate, setRates] = useState(1);
	const [review, setReview] = useState('');

	async function handleSubmitReview(e) {
		utils.clearContextErrors(dispatch);
		utils.clearSuccessMessage(dispatch);
		const payload = {
			job_id: props.job_id,
			rating: rate,
			comment: review,
		};
		if (utils.AssertAndValidateReview(payload.comment, dispatch)) {
			let res = await UploadData(dispatch, payload, utils.remoteuri.reviewJob);
			if (res.message) {
				dispatch({ type: 'ACTION_SUCCESS', message: res.message });
			}
		}
	}
	function handleCloseButton(e) {
		utils.clearContextErrors(dispatch);
		utils.clearSuccessMessage(dispatch);
		props.setReviewer(false);
	}
	return (
		<div style={{ width: '100%' }}>
			<Styled.Reviewer>
				<Styled.ReviewerHeader>
					<strong>Client Review</strong>
				</Styled.ReviewerHeader>
				<Styled.ReviewerContent>
					<div style={{ marginBottom: '8px' }}>
						Reviews are public and editable. Everyone can see your Account name
						and photo. Developers admin (System vets) can also see your location
						and device information (such as language, model, and OS version) and
						may use this information to respond to you.
					</div>
					<div>
						<textarea
							rows={10}
							cols={30}
							style={{ width: '100%' }}
							value={review}
							placeholder='Tell us how you feel about the services offered'
							onChange={(e) => setReview(e.target.value)}
						/>
					</div>
					<div
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							justifyContent: 'space-between',
						}}>
						<div>
							<span>Give a rating</span>
							<br />
							<span id='rts_st_ar_s'>
								<DrawReviewStars setRates={setRates} rate={rate} />
							</span>
						</div>
						<div style={{ paddingTop: '15px' }}>
							<span>
								<Styled.CancelReview
									type='button'
									onClick={(e) => handleCloseButton(e)}>
									Close
								</Styled.CancelReview>
								<Styled.SubmitReview
									type='button'
									onClick={(e) => handleSubmitReview(e)}>
									Submit
								</Styled.SubmitReview>
							</span>
						</div>
					</div>
				</Styled.ReviewerContent>
				<utils.ViewErrorMessage />
				<utils.ShowSuccess />
			</Styled.Reviewer>
		</div>
	);
};
