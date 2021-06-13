import React from 'react';
import { GetStars } from './Review';
import * as Styled from '../../../../components';
import details from '../../../../utils/data/details.json';
import * as Icons from '../../../../images/svg/svg';

export const VetOnView = (props) => {
	//const [Reviewer, setReviewer] = useState(false);

	const search = props.nav.history.location.search;

	const query = new URLSearchParams(search);

	let params;
	for (params of query.entries()) {
		params = params[1];
	}

	return (
		<div style={{ flex: '1 1 auto', width: '84%' }}>
			<Styled.HeadContent>
				<Styled.DetailsVetView>
					<Styled.Vetviewimg />
				</Styled.DetailsVetView>
				<Styled.DetailsVetInfo>
					<Styled.VetInfoName>{params}</Styled.VetInfoName>
					<GetStars number={details.Ratings} />
				</Styled.DetailsVetInfo>
				{/*details.Client ? (
					<Styled.ReviewVet>
						<Styled.ReviewVetButton onClick={(e) => setReviewer(!Reviewer)}>
							Write a review{' '}
						</Styled.ReviewVetButton>
					</Styled.ReviewVet>
				) : null}
				{Reviewer ? <ReviewBox setReviewer={setReviewer} /> : null*/}
			</Styled.HeadContent>
			<Styled.ReviewHead>
				<strong>Reviews</strong>
			</Styled.ReviewHead>
			{details.Reviews.map((field) => (
				<Styled.ReviewCard key={field.postedBy}>
					<Styled.ReviewHeader>
						<Styled.PostedBy>{field.postedBy}</Styled.PostedBy>
						<br />
						<GetStars number={field.ratings} />
						<Styled.DatePosted>{field.datePosted}</Styled.DatePosted>
						<Styled.LikesSection>
							<Styled.LikesIcon>
								<Icons.VhThumbsUp size={18} fillColor={'black'} />
							</Styled.LikesIcon>
							{field.likes}
						</Styled.LikesSection>
					</Styled.ReviewHeader>
					<div style={{ margin: '2rem .5rem' }}>
						<Styled.ReviewMessage>{field.message}</Styled.ReviewMessage>
					</div>
				</Styled.ReviewCard>
			))}
		</div>
	);
};
