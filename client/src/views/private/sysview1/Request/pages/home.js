import React, { useState } from 'react';
import { useAuthDispatch } from '../../../../../context';
import * as utils from '../../../../../utils';
import * as Styled from '../../../../../components';
import { VhCloudUpload } from '../../.././../../images/svg/svg';
import rootdata from '../../../../../utils/data/root.json';

export const RequestHomeView = (props) => {
	const dispatch = useAuthDispatch();
	const data = props.data;
	const [val, setSelectValue] = useState(0);

	const searchRootData = (value) => {
		for (let i = 0; i < rootdata.length; i++) {
			if (rootdata[i].class === value) return i;
		}
	};

	const handleSelectFieldClicked = (e) => {
		const index = searchRootData(e.target.value);
		setSelectValue(index);
		props.setPayload({ ...data, speciality: e.target.value });
	};

	const handleClick = (e) => {
		if (data.speciality === '') {
			dispatch({
				type: 'APIACCESS_ERROR',
				error: 'No Category selected. Select Category !',
			});
			return false;
		}
		if (utils.AssertAndValidateDesc(data.description, dispatch)) {
			utils.clearContextErrors(dispatch);
			props.setView(1);
		}
	};

	const imagesInput = React.createRef();

	return (
		<React.Fragment>
			<Styled.RequestForm enctype='multipart/form-data'>
				<Styled.Header>Request form</Styled.Header>
				<Styled.Card>
					<Styled.RSelect
						name='category'
						data-testid='category'
						onChange={(e) => handleSelectFieldClicked(e)}>
						<Styled.ROption value=''>..Select Category..</Styled.ROption>
						{rootdata.map((field, i) => (
							<Styled.ROption value={field.class} key={i}>
								{field.class}
							</Styled.ROption>
						))}
					</Styled.RSelect>
				</Styled.Card>
				<Styled.Card>
					{data.speciality ? utils.ViewSpecies(rootdata, val) : null}
				</Styled.Card>
				<Styled.Card>
					<label
						htmlFor='file-upload'
						className='custom-file-upload'
						style={{ width: '70%' }}>
						<i>
							<VhCloudUpload size={50} />
						</i>
						<strong>
							{data.images.length ? (
								<i>
									{data.images.length === 1 ? (
										<i>{data.images[0].name}</i>
									) : (
										<i> Selected {data.images.length}</i>
									)}
								</i>
							) : (
								<i>Custom Upload Images</i>
							)}
						</strong>
					</label>

					<input
						style={{ display: 'none' }}
						multiple
						id='file-upload'
						type='file'
						name='images'
						ref={imagesInput}
						accept='.jpeg, .jpg'
						onChange={(e) =>
							utils.monitorFilesInput(
								e,
								props.setPayload,
								data,
								utils.maxFileSize.images,
								10
							)
						}
					/>
				</Styled.Card>
				<Styled.Card>
					<strong>Brief Description on the Symptoms</strong>
				</Styled.Card>
				<Styled.Card>
					<Styled.TextArea
						placeholder='description'
						rows='8'
						cols='50'
						onChange={(e) =>
							props.setPayload({ ...data, description: e.target.value })
						}
					/>
				</Styled.Card>
				<Styled.Card>
					<utils.ViewErrorMessage />
				</Styled.Card>

				<Styled.Request type='button' onClick={(e) => handleClick(e)}>
					REQUEST
				</Styled.Request>
			</Styled.RequestForm>

			<div style={{ width: '40%', flex: '1 1 auto' }}></div>
		</React.Fragment>
	);
};
