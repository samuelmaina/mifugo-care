import React, { useState } from 'react';
import { InputField, Container, Card, Span } from '../../components';
import '../styling/css/vetform.css';
export const VetForm = (props) => {
	const [linkedIn, setURL] = useState('');
	const [experience, setLevel] = useState('');
	return (
		<Container>
			<form encType='multipart/form-data'>
				<Card>
					<Span>linkedIn Url:</Span>
					<br />
					<InputField
						type={'text'}
						name={'linkedIn'}
						placeholder={'http://U..'}
						setField={setURL}
					/>
				</Card>
				<Card>
					<Span>
						Level Of Experience<i>*</i>
					</Span>
					<br />
					<select name='experience' onChange={(e) => setLevel(e.target.value)}>
						<option value=''>Select Your Level of Experience</option>
						<option value='<1'>Less than 1 Year</option>
						<option value='2-3'>2 - 3 Years</option>
						<option value='>3'>More than 3 years</option>
					</select>
				</Card>
			</form>
		</Container>
	);
};
