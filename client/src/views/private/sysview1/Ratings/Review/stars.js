import React, { useState } from 'react';
import * as Icons from '../../../../../images/svg/svg';

export const DrawReviewStars = (props) => {
	const [rated, setRated] = useState(false);

	const handleRating = (i) => {
		setRated(true);
		props.setRates(i + 1);
	};

	const check = (i) => {
		let src = document.getElementById('rts_st_ar_s');
		if (src) {
			for (let j = 0; j < i + 1; j++) {
				src.children[j].children.item(0).attributes.fill.value = '#1280a5';
				src.children[j].children.item(0).attributes.stroke.value = '#1280a5';
			}
		}
	};

	const checkout = (i) => {
		if (!rated || props.rate) {
			let src = document.getElementById('rts_st_ar_s');
			if (src) {
				for (let j = props.rate; j < i + 1; j++) {
					src.children[j].children.item(0).attributes.fill.value = 'white';
					src.children[j].children.item(0).attributes.stroke.value = 'black';
				}
			}
		}
	};

	if (props.rate) {
		checkout(4);
	}

	const stars = [];

	for (let i = 0; i < 5; i++) {
		stars[i] = {
			icon: <Icons.VhStar size='30px' fillColor='white' stroke_width='30' />,
			val: i,
		};
	}

	return stars.map((star) => (
		<i
			style={{ margin: '5px' }}
			onMouseEnter={(e) => {
				check(star.val);
			}}
			onMouseLeave={(e) => {
				checkout(star.val);
			}}
			onClick={(e) => {
				handleRating(star.val);
			}}
			key={star.val}>
			{star.icon}
		</i>
	));
};

export const GetStars = (props) => {
	let rate = props.number;

	const res = Math.ceil(parseFloat(rate));
	let flag = false;

	if (res !== rate) {
		rate = res;
		flag = true;
	}

	const rates = [];
	for (let i = 0; i < 5; i++) {
		if (i < rate - 1) rates[i] = { icon: <Icons.VhStar />, val: `star${i}` };
		else if (i === rate - 1 && flag)
			rates[i] = {
				icon: <Icons.VhStarHalf />,
				val: `star${i}`,
			};
		else
			rates[i] = {
				icon: <Icons.VhStar fillColor='rgb(128,128,128,0.4)' />,
				val: `star${i}`,
			};
	}
	return rates.map((star) => <i key={star.val}>{star.icon}</i>);
};
