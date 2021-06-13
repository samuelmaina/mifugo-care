import React, { useState, useEffect } from 'react';
import * as Styled from '../../components';
import * as utils from '../../utils';
import { useAuthState, useAuthDispatch } from '../../context';
import counties from '../data/counties.json';

export const ViewSpecies = (rootdata, val) => {
	return (
		<Styled.SpeciesTypes style={{ marginTop: '20px' }}>
			<Styled.SpeciesTypesHeader>
				<strong>Any of the Following</strong>
			</Styled.SpeciesTypesHeader>
			{rootdata[val].types.map((type, i) => (
				<Styled.SpeciesTypeExample key={i}>
					<strong>{type}</strong>
				</Styled.SpeciesTypeExample>
			))}
		</Styled.SpeciesTypes>
	);
};

export const ViewErrorMessage = () => {
	const { errorMessage } = useAuthState();
	return (
		<div>
			{errorMessage ? (
				<Styled.ErrorCard>
					<p className='errorField' role='alert'>
						<strong>{errorMessage}</strong>
					</p>
				</Styled.ErrorCard>
			) : null}
		</div>
	);
};

export const TryThis = (props) => {
	const dispatch = useAuthDispatch();
	const data = props.data;
	const [customLocationSetup, configureLocation] = useState(false);
	const [turnedOffGeoLocatorVls, switchtoManual] = useState(false);
	const [county, setCounty] = useState('');
	const [subCounty, setSubCounty] = useState('');
	const [ward, setward] = useState('');
	const [reversedGeocodes, setPhysicalAddress] = useState('');

	function handleClick(e) {
		if (
			reversedGeocodes === 'null' &&
			(customLocationSetup || !turnedOffGeoLocatorVls)
		) {
			alert('Set up Alternative address ');

			return;
		}
		props.setView(2);
	}

	const handleCountyChange = (e) => {
		if (county !== e.target.value) {
			setSubCounty('');

			county ? setward('') : setward(ward);
		}
		setCounty(e.target.value);
	};

	const configSetUp = async (e) => {
		if (county && subCounty && ward) {
			if (utils.AssertAndValidateAddress(ward, dispatch)) {
				configureLocation(false);
				console.log('Initiated');
				const response = await utils.geocoder(
					`${ward},${subCounty},${county}`,
					dispatch
				);
				if (response) {
					switchtoManual(true);
					props.setPayload({
						...data,
						location: [],
					});
					const temp = data.location;
					temp.push(response.lat);
					temp.push(response.lng);
					props.setPayload({
						...data,
						location: temp,
					});
				}
				utils.clearContextErrors(dispatch);
			}
		} else {
			utils.CustomLocationSetuperrors({ county, subCounty, ward, dispatch });
			return;
		}
	};

	useEffect(() => {
		async function fetchData() {
			let response = await utils.reverseGeocode(dispatch, data.location);
			if (!response) setPhysicalAddress('null');
			else setPhysicalAddress(response);
		}
		if (props.controls.source === 'client') {
			fetchData();
		}
	}, [dispatch, data.location, props.controls.source]);

	//Edited ^

	const getColor = () => {
		if (props.controls.source === 'client') return 'white';
		else return 'black';
	};

	return (
		<Styled.RSmCont style={{ color: getColor() }}>
			<Styled.H1>{props.controls.text}</Styled.H1>
			<Styled.Rsummary>
				<h3>
					<strong>Location:</strong>
				</h3>
				<Styled.RsummaryCoords>
					{turnedOffGeoLocatorVls ? (
						<div>
							{' '}
							{ward} , {subCounty} , {county} county, Kenya
						</div>
					) : (
						<div>{reversedGeocodes}</div>
					)}

					<div>
						Not Your Location?{' '}
						<Styled.LocSetup
							type='button'
							onClick={(e) => configureLocation(true)}>
							Set Up
						</Styled.LocSetup>
					</div>
				</Styled.RsummaryCoords>
			</Styled.Rsummary>
			<Styled.Rsummary>
				{customLocationSetup ? (
					<Styled.CustomLocationSetup absolute={isit_ab(props.controls.source)}>
						<div>
							<strong>*all fields required</strong>
						</div>
						<Styled.Select
							name='cls_county'
							onChange={(e) => handleCountyChange(e)}>
							<option value=''>County of Residence</option>
							{counties.map((county) => (
								<option key={county.code} value={county.name}>
									{county.name}
								</option>
							))}
						</Styled.Select>
						{county ? (
							<Styled.Select
								name='cls_subCounty'
								onChange={(e) => setSubCounty(e.target.value)}>
								<option value=''>Sub-County</option>
								{counties[utils.findChildren(county)].sub_counties.map(
									(sub) => (
										<option key={sub} value={sub}>
											{sub}
										</option>
									)
								)}
							</Styled.Select>
						) : null}
						<Styled.RInput
							type='text'
							placeholder='your area Location / Ward'
							onChange={(e) => setward(e.target.value)}
						/>
						<div>
							<Styled.LocSetup type='button' onClick={(e) => configSetUp(e)}>
								confirm
							</Styled.LocSetup>
						</div>
						<ViewErrorMessage />
					</Styled.CustomLocationSetup>
				) : null}
			</Styled.Rsummary>
			{props.controls.source === 'client' ? (
				<div>
					<Styled.RsmProcBtn role='button' onClick={(e) => handleClick(e)}>
						Continue
					</Styled.RsmProcBtn>
				</div>
			) : null}
		</Styled.RSmCont>
	);
};

const isit_ab = (what) => {
	if (what === 'vet') {
		return true;
	}
	return false;
};
