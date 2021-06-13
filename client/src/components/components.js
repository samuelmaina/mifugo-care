export const InputField = (props) => {
	return (
		<input
			style={{ width: props.width }}
			type={props.type}
			name={props.name}
			placeholder={props.placeholder}
			onChange={(e) => {
				props.setField(e.target.value);
			}}
		/>
	);
};

export const SelectField = (props) => {
	let value = localStorage.getItem('group');

	if (value === null) {
		value = 'group1';
	}

	if (value !== props.selected && props.selected !== '') {
		value = props.selected;
		localStorage.setItem('group', value);
	}

	return (
		<select
			name='userClasses'
			data-testid='selector'
			onChange={(e) => {
				props.setGroup(e.target.value);
			}}
			value={value}>
			<option value='group1'>Join as a freelance...</option>
			<option value='vet'>Vet officer</option>
			<option value='group3'>Agriculturalist</option>
			<option value='client'>Client</option>
		</select>
	);
};

export const Links = () => {
	return (
		<ul>
			<li>
				<a href='/empty'>link 1</a>
			</li>
			<li>
				<a href='/empty'>link 2</a>
			</li>
			<li>
				<a href='/empty'>link 3</a>
			</li>
		</ul>
	);
};
