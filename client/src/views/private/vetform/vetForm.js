import React, { useState } from 'react';
import * as Styled from '../../../components';
import { useAuthDispatch, useAuthState, UploadData } from '../../../context';
import * as utils from '../../../utils';
import '../../styling/css/vetform.css';
import { UserLocation } from './location';
import { SubmitFiles } from './files';
import { Userdetails } from './details';
import Specs from '../../../utils/data/specFields.json';
import rootdata from '../../../utils/data/root.json';

export const VetForm = (props) => {
	const dispatch = useAuthDispatch();

	const { loading } = useAuthState();
	const [view, setView] = useState(0);

	const data = {
		linkedIn: '',
		experience: '',
		county: '',
		subCounty: '',
		ward: '',
		expertise: Specs,
		location: [],
		resume: [],
		certifications: [],
		profile: [],
		speciality: '',
		spec: rootdata,
	};

	const [payload, setPayload] = useState(data);
	const [controls, setControllers] = useState({
		Popup: false,
		counter: 0,
		selectedTypeVl: 0,
		spec: false,
	});

	const handlePopupWindow = (e) => {
		const element = e.target.nodeName;

		if (!(element === 'UL' || element === 'LI' || element === 'INPUT')) {
			if (controls.Popup) setControllers({ ...controls, Popup: false });
			else setControllers({ ...controls, Popup: true });
		}
	};

	const handleNext = (e) => {
		if (utils.checkVetFormsubmitErrors(payload, view, dispatch)) {
			utils.clearContextErrors(dispatch);
			if (view === 2) {
				handleClick();
			} else {
				setView(view + 1);
			}
		}
	};
	const handlePrevious = () => {
		if (view === 0) {
			setView(0);
		} else {
			setView(view - 1);
		}
	};
	const handleToggle = (e) => {
		const temp = payload.expertise;

		let count = controls.counter;

		for (let i = 0; i < payload.expertise.length; i++) {
			if (payload.expertise[i].field === e.target.name) {
				temp[i].isChecked = !temp[i].isChecked;
				if (temp[i].isChecked) count += 1;
				else count -= 1;
				break;
			}
		}
		setPayload({ ...payload, expertise: temp });
		setControllers({ ...controls, counter: count });
	};

	const handleClick = async () => {
		if (payload.location.length >= 2) {
			const path = utils.remoteuri.addVetDet;
			let upld = utils.appendForreqUpload(payload);
			let response = await UploadData(dispatch, upld, path);

			if (response) {
				utils.clearContextErrors(dispatch);
				props.history.push('/vet/homepage');
			} else return;
		} else {
			const error = `Network Error .Cannot proceed Without Geocoded data`;
			dispatch({ type: 'APIACCESS_ERROR', error: error });
		}
	};

	let rendered;
	switch (view) {
		case 0:
			rendered = (
				<Userdetails
					payload={payload}
					setPayload={setPayload}
					controls={controls}
					setControllers={setControllers}
				/>
			);
			break;
		case 1:
			rendered = <SubmitFiles payload={payload} setPayload={setPayload} />;
			break;
		case 2:
			rendered = <UserLocation payload={payload} setPayload={setPayload} />;
			break;
		default:
			break;
	}
	return (
		<Styled.Container
			onClick={(e) => (controls.popUp ? handlePopupWindow(e) : null)}>
			<Styled.Form encType='multipart/form-data'>
				<Styled.Header>Vet update Details</Styled.Header>
				{rendered}
				{view === 2 ? (
					<div style={{ position: 'relative', top: '6rem' }}>
						<Styled.CancelReview
							type='button'
							onClick={(e) => handlePrevious()}>
							Previous
						</Styled.CancelReview>
						<Styled.Button
							type='button'
							data-testid='uploadButton'
							onClick={(e) => handleNext(e)}>
							submit{loading ? `...` : null}
						</Styled.Button>
					</div>
				) : (
					<div style={{ position: 'relative', top: '6rem' }}>
						<Styled.CancelReview
							type='button'
							onClick={(e) => handlePrevious()}>
							Previous
						</Styled.CancelReview>
						<Styled.SubmitReview type='button' onClick={(e) => handleNext(e)}>
							Next
						</Styled.SubmitReview>{' '}
					</div>
				)}
				{view !== 2 ? <utils.ViewErrorMessage /> : null}
			</Styled.Form>
			{controls.Popup ? (
				<Styled.Popup>
					<Styled.CancelButton onClick={(e) => handlePopupWindow(e)}>
						&times;
					</Styled.CancelButton>
					<ul>
						{payload.expertise.map((field) => (
							<li key={field.field}>
								<input
									type='checkbox'
									name={field.field}
									onChange={(e) => handleToggle(e)}
									checked={field.isChecked}
								/>
								{field.field}
							</li>
						))}
					</ul>
				</Styled.Popup>
			) : null}
			{payload.speciality && view === 0 ? (
				<Styled.TodisplayTypes>
					{utils.ViewSpecies(rootdata, controls.selectedTypeVl)}
				</Styled.TodisplayTypes>
			) : null}
		</Styled.Container>
	);
};
