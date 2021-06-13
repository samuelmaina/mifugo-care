import React, { useState } from 'react';
import * as Styled from '../../../../components';
import { remoteuri } from '../../../../utils';

export const PhotosSlideView = (props) => {
	const setCurr = (e, i) => {
		setSlide(false);
		setView(i);
	};

	const getPad = (i) => {
		const diff = i - index;
		let pad = 1.0 - diff * ratio;
		if (pad > 1.0) {
			let ex = pad - 1.0;
			pad = 1.0 - ex;
		}
		return pad;
	};

	const [slideview, setSlide] = useState(true);

	const [view, setView] = useState(0);

	var len = props.task.imageUrls.length;

	const ratio = 1 / len;

	let index = props.index;

	if (!slideview) index = view;

	var ts = props.task.imageUrls[index];

	return (
		<div style={{ display: 'flex', flexWrap: 'wrap' }}>
			<div style={{ width: '40%' }}>
				<img
					height='300px'
					width='100%'
					src={`${remoteuri.ROOT_URL}/${ts}`}
					alt={`view_image ${props.index}`}
				/>
			</div>
			<div
				style={{
					margin: '2rem 0 0 4rem',
				}}>
				{props.task.imageUrls.map((pic, i) => (
					<div key={pic}>
						<div
							style={{
								borderRadius: '50%',
								border: '2px solid green',
								margin: '.2rem',
								width: `${getPad(i) * 50}px`,
								height: `${getPad(i) * 50}px`,
							}}
							onClick={(e) => setCurr(e, i)}>
							<img
								style={{
									borderRadius: '50%',
									height: '100%',
									width: '100%',
								}}
								src={`${remoteuri.ROOT_URL}/${props.task.imageUrls[i]}`}
								alt={`view_image ${props.index}`}
							/>
						</div>
					</div>
				))}
			</div>
			<Styled.PhotosTog>
				<span>
					<strong>Toggle to </strong>
					<Styled.CustomButtons onClick={(e) => setSlide(!slideview)}>
						{slideview ? 'Block View' : 'Slide View'}
					</Styled.CustomButtons>
				</span>
			</Styled.PhotosTog>
		</div>
	);
};
