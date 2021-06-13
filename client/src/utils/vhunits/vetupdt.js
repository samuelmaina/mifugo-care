//import root from '../data/root.json';
export const RenderCheckboxes = (props) => {
	const data = props.data;

	function handleChange(e) {
		const temp = data.spec;
		let count = data.speciality === '' ? 0 : data.speciality;
		for (let i = 0; i < temp.length; i++) {
			if (data.spec[i].class === e.target.name) {
				temp[i].checked = !temp[i].checked;
				if (temp[i].checked) count += 1;
				else count -= 1;
				break;
			}
		}
		count = count === 0 ? '' : count;
		props.setPayload({ ...data, spec: temp });
		props.setPayload({ ...data, speciality: count });
	}

	return (
		<div>
			<ul>
				{data.spec.map((field) => (
					<li key={field.class}>
						<input
							type='checkbox'
							name={field.class}
							onChange={(e) => handleChange(e)}
							checked={field.checked}
						/>
						{field.class}
					</li>
				))}
			</ul>
		</div>
	);
};

export const getselectedspec = (arr) => {
	const temp = [];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].checked) temp.push(arr[i].types);
	}
	return temp;
};
