import { Entry } from '../../entry';
import * as Styled from '../../../../components';
import vets from '../../../../utils/data/vets.json';

export const Ratings = (props) => {
	return <Entry Component={ComponentView} nav={props}></Entry>;
};

const ComponentView = (props) => {
	return (
		<Styled.ClientRatingsView>
			{vets.map((field) => (
				<Styled.RatingCard key={field.speciality}>
					<div
						style={{
							padding: '1% 2%',
							fontSize: '21px',
							fontFamily: 'Impact, fantasy',
							color: '#065d7a',
						}}>
						<strong>{field.speciality}</strong>
					</div>
					<Styled.RatingCardContent>
						{field.vets.map((vet) => (
							<Styled.Vetview key={vet}>
								<div style={{ width: '70%' }}>
									<a href={`/client/ratings/details?id=${vet}`}>
										<Styled.Vetviewimg>
											<Styled.CoverimgA></Styled.CoverimgA>
										</Styled.Vetviewimg>
									</a>
								</div>
								<div>{vet}</div>
							</Styled.Vetview>
						))}
					</Styled.RatingCardContent>
				</Styled.RatingCard>
			))}
		</Styled.ClientRatingsView>
	);
};
