import React, { useEffect, useState } from 'react';
import { Slider } from '../../../utils';
import { paths, timeLinevalue } from '../../../utils';
import * as Icons from '../../../images/svg/svg';
import * as Styled from '../../../components';
import { useAuthDispatch } from '../../../context';

const MainView = (props) => {
	const dispatch = useAuthDispatch();

	const [val, setVal] = useState(0);

	useEffect(() => {
		async function get() {
			setVal(await timeLinevalue(dispatch));
		}

		get();
	}, [dispatch]);

	return (
		<div className='card-view'>
			<Styled.CvTop>
				<Styled.CvTop1>
					<Styled.RequestTimeline
						onClick={(e) => props.nav.history.push(paths.requestTimeline)}>
						<span>
							<Icons.VhListUl size={40} />
						</span>
						<Styled.RequestTimelineInner>
							<strong>Request Timeline</strong>
							<div>
								<p style={{ lineHeight: '22px' }}>
									<Styled.RequestTimelineChecked>
										&#10004;
									</Styled.RequestTimelineChecked>
									<span>
										You have <b>{val}</b> initiated Request in the Meantime
									</span>
								</p>
							</div>
						</Styled.RequestTimelineInner>
					</Styled.RequestTimeline>
					<Styled.RequestHistory
						onClick={(e) => props.nav.history.push(paths.historyReview)}>
						<span>
							<Icons.VhGift size={40} />
						</span>
						<Styled.RequestHistoryInner>
							<strong>History Review</strong>
							<div>
								<p>Write reviews and rate services offered</p>
							</div>
						</Styled.RequestHistoryInner>
					</Styled.RequestHistory>
				</Styled.CvTop1>
				<Styled.CvTop2>
					<Styled.NewsSectionFlex>
						<Styled.NewsSectionHeader>
							<strong>Trending Topics</strong>
						</Styled.NewsSectionHeader>
						<Slider component={NewsSectionSlideview} num={3} />
					</Styled.NewsSectionFlex>
					<Styled.NewsSectioncontent>
						<Styled.RssView>
							<Styled.Rsscontent>
								Consequat adipisicing irure cillum dolore velit amet mollit
								nisi.Nulla ex amet proident amet.
							</Styled.Rsscontent>
							<Styled.Rsscontent>
								Aliquip nulla aliqua ut labore cillum sint eiusmod ad mollit
								enim consectetur cillum. Officia occaecat pariatur..
							</Styled.Rsscontent>
						</Styled.RssView>
					</Styled.NewsSectioncontent>
				</Styled.CvTop2>
			</Styled.CvTop>
			<Styled.CCont>
				<Styled.AnimCard onClick={(e) => props.nav.history.push(paths.request)}>
					<Styled.H1>Request Vet Service</Styled.H1>
				</Styled.AnimCard>
				<Styled.AnimCard onClick={(e) => props.nav.history.push(paths.ratings)}>
					<Styled.H1>view vet Rating</Styled.H1>
					<strong>Ratings</strong>
				</Styled.AnimCard>
				<Styled.AnimCard>
					<Styled.H1>Update Personal Details</Styled.H1>
					<strong>Profile</strong>
				</Styled.AnimCard>
			</Styled.CCont>
		</div>
	);
};

const NewsSectionSlideview = (props) => {
	return (
		<Styled.NewsSectionImgs index={props.index}>
			<div
				style={{
					position: 'relative',
					top: '70%',
					left: '25%',
					width: '40%',
					height: '30%',
					zIndex: -10,
				}}>
				<Icons.VhImageCurveBottom />
			</div>
		</Styled.NewsSectionImgs>
	);
};

export default MainView;
