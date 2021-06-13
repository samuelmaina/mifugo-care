import Styled, { css, keyframes } from 'styled-components';
import medLab from '../images/medLab.jpeg';
import vt1 from '../images/vt1.jpg';
import vt2 from '../images/vt2.jpg';
import { device } from './device';
import { Input, Select, Card } from './authform';
import User from '../images/svg/user.svg';
const imgArray = [medLab, vt1, vt2];
const baseLayout = css`
	display: flex;
	flex-wrap: wrap;
`;
const expandedprofileView = css`
	padding: 1%;
	margin: 2%;
`;
const commonForCvTop1 = css`
	box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.05);
	border-top: 10px solid lightblue;
	border-radius: 5px;
	width: 100%;
	height: 140px;
	:hover {
		box-shadow: 3px 5px 2px 2px rgba(0, 0, 0, 0.1);
		border-top: 10px solid #065d7a;
		border-radius: 0;
		margin-top: 4px;
		width: 99%;
	}
`;
const fadeIn = keyframes`
    from {opacity: .99}
    to{opacity: 0.7}
`;
const fadeInImages = keyframes`
    from{opacity: .3}
    to {opacity: 1}
`;
export const H1 = Styled.h1`
	line-height: 60px;
    font-weight: 200;
    font-size: 25px;
	font-family: Impact, fantasy;
`;
export const ClientRoot = Styled.div``;
export const ViewPortLess1024 = Styled.div`
    width: 98%;
    margin: 1%;
    @media ${device.laptop} {
        display: none;
    }
`;
export const Wrapper = Styled.div`
    position: sticky;
	top: 0px;
    background-color:white;
    border-top: 10px solid #065d7a;
    z-index: 10;
    @media ${device.mobileS} {
        margin-bottom: 0px;
    }
    @media ${device.laptop} {
        margin-bottom: 40px;
    }
`;
export const Subnav = Styled.div`
    @media ${device.mobileS} {
        border: 0;
        height:0px;
    }
    @media ${device.laptop} {
        width: 100%;
        height: 40px;
        background-color: rgb(128, 128, 128, 0.1);
        border-bottom: 0.1px solid rgb(128, 128, 128, 0.3);
    }
`;
export const C_H = Styled.div`
    height: 69px;
    width: 100%;
`;
export const C_C = Styled.div`
    ${baseLayout}
    align-items: center;
    justify-content: space-between;
    height: 100%;
    @media ${device.mobileS} {
        margin: 0 2% 0 55px;
        width:auto;
    }
    @media ${device.laptop} {
        margin: 0 2% 0 20px;
    }
    
`;
export const H_W = Styled.div`
    height: 100%;
    text-align: left;
    font-family: Luminari,'Jazz LET',Impact, fantasy;
	color: #065d7a;
    text-decoration: underline 2px;
	line-height: 70px;
    @media ${device.mobiles} {
        font-size: 25px;
        width: auto;
    }
    @media ${device.laptop} {
        font-size: 40px;
        width: 20%;
    }
`;
export const H_C = Styled.div`
     ${baseLayout};
     @media ${device.mobiles} {
        flex: 1 1 auto;
        justify-content: flex-end;
    }
    @media ${device.laptop} {
        width: 80%;
        justify-content: space-between;
    }
`;
export const N_L = Styled.div`
    
    @media ${device.mobiles} {
        display:none;
    }
    @media ${device.laptop} {
        display: flex;
        flex-wrap: wrap;
        width: 30%;
    }
    
`;
export const N_R = Styled.div`
    ${baseLayout};
    align-items:center;
     @media ${device.mobiles} {
        width: 100%;
        justify-content: flex-end;
    }
     @media ${device.laptop} {
        width: 55%;
        justify-content: space-between;
    }
`;
export const LeftInnerAddon = Styled.div`
    @media ${device.mobileS}{
        display:none;
    }
    @media ${device.laptop}{
        position: relative;
	    width: 56%;
        display:block;
    }
`;
export const UserIcon = Styled.div`
	height: 25px;
	text-align: right;
    cursor: pointer;
    ${(props) =>
			props.active
				? css`
						box-shadow: 3px 5px 2px 2px rgba(0, 0, 0, 0.1);
				  `
				: null}
    :hover {
        box-shadow: 3px 5px 2px 2px rgba(0, 0, 0, 0.1);
    }
     @media ${device.mobileS}{
         width:100%;
    }
    @media ${device.laptop}{
        border-left: 1px solid;
        width: 35%;
    }
`;
export const ModalProfPopup = Styled.div`
    position: absolute;
    top: 54px;
    right: 22px;
    background-color: white;
    border: .1px solid #000000;
    border-top: 0;
`;
export const PrfPopupLi = Styled.li`
    padding: 1rem 8vw 1rem .9rem;
    :hover {
        background-color:rgba(0, 0, 0, 0.1);
        cursor: pointer;
    }
    
`;
export const CCont = Styled.div`
    ${baseLayout};
    justify-content: space-between;
    width: 100%;
    flex: 1 1 auto;
`;
export const ClientRootContainer = Styled.div`
    ${baseLayout};
	justify-content: space-between;
    width: 99%;
    margin-right: 1%;
    ${(props) =>
			props.width < 1024
				? css`
						width: 100%;
						margin-right: 0;
				  `
				: null}
    @media ${device.laptop} {
        display : flex;
    }
`;
export const AnimCard = Styled.div`
   box-shadow: 0 0 2px 5px rgba(0, 0, 0, 0.05);
   border-top: 5px solid lightblue;
   border-radius: 5px;
   cursor: pointer;
   padding-left: 1rem;
   color: #065d7a;
   :hover {
       background-color: #065d7a;
       border-radius: 2px;
       color: white;
   }
   @media ${device.mobileS} {
       display: none;
   }
   @media ${device.laptop} {
       display: block;
       width: 30%;
       height: 150px;
   }
`;
export const Navleft = Styled.div`
    position: sticky;
    top: 120px;
    width:15%;
    height: 80vh;
    background-color:  #065d7a;
    @media ${device.mobileS} {
       display: none;
   }
   @media ${device.laptop} {
       display:block;
   }
`;
export const NavLeftElms = Styled.div`
    cursor: pointer;
    padding: .5rem  1rem;
    :hover {
        opacity: .9;
        padding: .6rem  1.1rem;
    }
`;
export const CvTop = Styled.div`
	display:flex;
	flex-wrap: wrap;
	justify-content: space-between;
    margin-bottom: 40px;
`;
export const CvTop1 = Styled.div`
    border-top: 40px solid #1280a5;
    border-radius: 5px;
     @media ${device.mobileS} {
       width: 100%;
    }
    @media ${device.laptop} {
       width: 49.5%;
    }
`;
export const RequestTimeline = Styled.div`
    ${baseLayout};
    ${commonForCvTop1}
	margin-bottom: 20px;
	margin-top: 10px;
`;
export const RequestTimelineInner = Styled.div`
    margin-top: 2%;
	margin-left: 10%;
	width: 60%;
    `;
export const RequestTimelineChecked = Styled.i`
    border: 2px solid darkgreen;
	border-radius: 50%;
	padding: 0.4%;
	padding-right: 2.2%;
    font-size: 14px;
	font-weight: bold;
	color: darkgreen;
`;
export const RequestHistory = Styled.div`
    ${baseLayout};
    ${commonForCvTop1};
    `;
export const RequestHistoryInner = Styled.div`
    margin-top: 2%;
	margin-left: 10%;
	width: 50%;
`;
export const CvTop2 = Styled.div`
	box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.05);
    border-top: 40px solid #1280a5;
    border-radius: 5px;
     @media ${device.mobileS} {
       margin-top: 10px;
       width: 100%;
       order: -1;
    }
    @media ${device.laptop} {
       margin-top: 0;
       width: 49.5%;
       order: 0;
    }
`;
export const ToggleSpan = Styled.span`
	cursor: pointer;
	@media${device.mobileS} {
        position: absolute;
        top: 1.1rem;
        left: 1rem;
    }
    @media${device.laptop} {
        position: relative;
        top: 0.3rem;
	    left: 1rem;
    }
`;
export const Less1024SearchBar = Styled.div`
   position: relative;
   margin-top:5px;
   width: 100%;
   display:block;
   z-index: -10;
`;
export const Logout = Styled.button`
width: 80%;
background-color: #1280a5;
border:.5px solid #1280a5;
border-radius:5px;
padding:.7rem;
margin: 30px 10% 0 10%;
font: 400 20px Arial;
color: white;
cursor: pointer;
`;
export const Rule = Styled.div`
  height:1px;
  width: 100%;
  background-color:#1280a5;
  margin-bottom: 10px`;

export const NewsSectionFlex = Styled.div`
    ${baseLayout};
    @media ${device.mobileS} {
        margin: 0;
    }
    @media ${device.laptop} {
        margin: 10px 10% 5px 10%;
    }
`;
export const NewsSectionImgs = Styled.div`
    z-index: -11;
    background: url(${(props) => imgArray[props.index]}) no-repeat center;
    background-size: cover;
    height: 170px;
    width: 64%;
    border: 0.1px solid white;
    border-top-left-radius: 60%;
    border-bottom-left-radius: 30%;
    border-top-right-radius: 20%;
    border-bottom-right-radius: 20%;
    ${(props) =>
			props.index === 0
				? css`
						animation: 3s ${fadeInImages} ease-out;
				  `
				: css`
						animation: 2s ${fadeInImages} ease-out;
						opacity: 1;
				  `};
`;
export const NewsSectionHeader = Styled.div`
    padding-top:2%;
    text-align: center;
    font-size: 30px;
    font-family: impact,fantasy;
     width: 35%;
     color:rgb(230, 154, 55);
     text-decoration:  4px underline ;
`;
export const NewsSectioncontent = Styled.div`
    height: 100px;
    width: 100%;
`;
export const RssView = Styled.div`
    margin: 2%;
`;
export const Rsscontent = Styled.div`
     @media ${device.mobileS} {
         padding: 1%;
         font-size: 12px;
         font-weight: 200;
     }
      @media ${device.laptop} {
         padding: 2%;
         font-size: 14px;
         font-weight: bold;
     }
`;
export const ClientRequestView = Styled.div`
    width:84.5%;
    flex: 1 1 auto;
    background: url(${(props) => imgArray[props.index]}) no-repeat center;
	background-size: cover;
    animation: 3s ${fadeInImages} ease-out;
    opacity: 1;
    @media ${device.mobileS} {
        margin-left:0;
     }
    @media ${device.laptop} {
        margin-left: .5%;
        
     }
    `;
export const ClientRequestForm = Styled.div`
     ${baseLayout};
     position: relative;
     top: 0;
     left: 0;
     height: 100%;
     width: 100%;
     background-color: black;
    animation: 3s ${fadeIn} ease-in-out;
    opacity: 0.8;
     z-index: 1;
    `;
export const RequestForm = Styled.form`
	color: white;
    
    @media ${device.mobileS} {
        padding: 3%;
        width: 100%;
    }
    @media ${device.laptop} {
        padding: .1px;
        margin: 5px;
        box-shadow: 2px 1.5px 1px 2px rgba(255, 255, 255,0.1);
        width: 40%;
    }
`;
export const RInput = Styled(Input)`
    color: white;
    background-color: black;
    @media ${device.mobileS}{
        width: 95%;
    }
    @media ${device.laptop}{
        width: 90%;
    }
`;
export const RFileInput = Styled(RInput)`
    border: 0;
`;
export const RSelect = Styled(Select)`
    color: white;
    width: 100%;
`;
export const TextArea = Styled.textarea`
    @media ${device.mobileS} {
        width: 100%;
    }
    @media ${device.laptop} {
        width: 90%;
    }
`;
export const ROption = Styled.option`
    color: black;
`;
export const ErrorCard = Styled.div`
    text-align: center;
    font-style: italic;
    width: 90%;
`;
export const Request = Styled(Logout)`
       width: 60%;
    @media ${device.mobileS} {
        margin : 5% 0 5% 20%;
    }
    @media ${device.laptop} {
        margin: 2% 0 0 15%;
    }
    `;
export const ClientRatingsView = Styled.div`
    width: 84%;
	margin-left: 1%;
	flex: 1 1 auto;
`;
export const RatingCard = Styled.div`
    width: 100%;
    border-top: 40px solid #1280a5;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
`;
export const RatingCardContent = Styled.div`
    ${baseLayout};
    width: 100%;
`;
export const Vetview = Styled.div`
    ${baseLayout}
    ${expandedprofileView};
    width: 19%;
	height: 130px;
    justify-content: space-between;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.05);
    border-top: 5px solid lightblue;
    border-radius: 5px;
    :hover {
        padding: .8%;
        
    }
    `;
export const Vetviewimg = Styled.div`
    height: 120px;
	width: 100%;
	background: url(${User})no-repeat center;
    background-size: 60%;
`;
export const CoverimgA = Styled.div`
    height: 100%;
	width: 100%;
    :hover {
        background-color: black;
        opacity: 0.8;
    }
`;
export const HeadContent = Styled.div`
    ${baseLayout};
    
    border-top: 40px solid #1280a5;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    margin-left: .5%;
`;
export const DetailsVetView = Styled.div`
    height: 60%;
    width: 15%;
    ${expandedprofileView}
`;
export const DetailsVetInfo = Styled.div`
     ${expandedprofileView}
     flex: 1 1 auto;
`;
export const ReviewVet = Styled.div`
    ${expandedprofileView}
    `;
export const Reviewer = Styled.div`
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.05);
    @media ${device.mobileS} {
        margin: 5px 0 5px 0;
         width: 100%;
    }
    @media ${device.tablet} {
        margin: 0 0 5px 8%;
        width: 50%;
    }
`;
export const ReviewerHeader = Styled.div`
    background-color: #1280a5;
    padding: 1rem;
`;
export const ReviewerContent = Styled.div`
    padding: 1rem;
`;
export const ReviewVetButton = Styled.button`
   padding: .8rem 1.5rem;
`;
export const CancelReview = Styled.button`
   padding: .5rem 1.5rem;
   margin: 2px;
`;
export const SubmitReview = Styled.button`
   padding: .5rem 1.5rem;
   margin: 2px;
`;
export const ReviewHead = Styled(Card)`
    margin: 1rem 10rem;
    font-size: 24px;
    font-family: impact, fantacy;
    color: #1280a5;
`;
export const ReviewCard = Styled(Card)`
    margin: .5rem 10rem;
    border-top: 5px solid lightblue;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.05);
    border-radius: 5px;    
`;
export const ReviewMessage = Styled.div`
    margin-left: 8rem;
	background-color: rgb(128, 128, 128, 0.2);
	border: 1px solid lightgrey;
	padding: 2%;
	border-radius: 2px;
`;
export const ReviewHeader = Styled.div`
    margin: .5% 2%;
    font-size: 16px;
`;
export const LikesSection = Styled.span`
    font-family: impact,fantasy;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.05);
    float: right; 
    color: green;
    font-size: 14px;
    padding: 0 .2rem;
    :hover {
        cursor: pointer;
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.6);
    }
`;
export const LikesIcon = Styled.i`
    color: green;
    padding: .5rem; 
`;
export const VetInfoName = Styled.div`
    font-family: impact,fantasy;
	font-size: 30px;
	letter-spacing: 2px;
	line-height: 40px;
	color: #1280a5;
`;
export const PostedBy = Styled.span`
    font-family: impact,fantasy;
	font-size: 16px;
	letter-spacing: 1.5px;
	color: #1280a5;
`;
export const DatePosted = Styled.span`
    color: rgb(128,128,128,0.9);
	padding-left: 5px;
	font-family: impact,fantasy;
`;
export const RSmCont = Styled.div`
    box-shadow: 0 0 5px 2px white;
    border-top: 40px solid #1280a5;
    padding: .5rem;
    margin: 2rem;
    flex: 1 1 60%;
   
`;
export const Rsummary = Styled.div`
    padding: .5rem 1rem;
    margin: 1rem;
    width: 70%;
    border-top: 4px solid lightblue;
    box-shadow: 0 0 .1px 2px rgb(255,255,255, 0.03);
`;
export const RsummaryCoords = Styled.div`
    ${baseLayout};
    justify-content: space-between;
`;
export const LocSetup = Styled(SubmitReview)``;
export const RsmProcBtn = Styled(Logout)`
width: 30%;
`;
export const CustomLocationSetup = Styled.div`
    color: black;
    
    width: 300px;
    box-shadow: 0 0 .1px 2px rgb(255,255,255, 0.03);
    border-radius: 5px;
    background-color: white;
    padding: .5rem;
     ${(props) =>
				props.absolute
					? css`
							position: absolute;
							right: 3px;
							bottom: 3px;
							box-shadow: 0 0 5px 2px rgb(198, 198, 198, 0.9);
					  `
					: null}
    
`;
export const ContactsDetail = Styled.div`
    color:white;
    padding: .5rem;
    margin: 2rem;
    width: 60%;
    box-shadow: 0 0 5px 2px white;
    border-top: 40px solid #1280a5;
`;
export const TelInput = Styled(RInput)`
    padding-left: 45px;
`;
export const Code254 = Styled.span`
    position: relative;
    top: -34px;
    left: 1px;
    background-color: green;
    padding: 3px 3px;
`;
export const SendCode = Styled(SubmitReview)`
   margin: 30px 0;
`;
export const ProcwtReq = Styled(SendCode)``;
export const SetNumber = Styled(SendCode)`
   margin-left: 2rem;
`;
export const ContDescription = Styled.p`
   width: 70%;
`;
export const ContForm = Styled.form` 
   width: 70%;
`;

export const SpeciesTypes = Styled.div`
   padding: .5rem;
   color: white;
   display: flex;
   flex-wrap: wrap;
  @media ${device.mobileS} {
      box-shadow: 0 0 2px 2px white;
      font-size: 12px;
      width: 92%;
      margin: 0;
  }
  @media ${device.laptop} {
      box-shadow: 0 0 5px 2px white;
      font-size: 14px;
      position: absolute;
      right: 5%;
      width: 40%;
      top: 20px;

  }

`;
export const SpeciesTypeExample = Styled.span`
   padding: .2rem 1rem;
`;

export const SpeciesTypesHeader = Styled.div`
    width: 100%;
	padding: 5px 0px;
	border-bottom: 2px solid;
`;
export const RequestStatus = Styled.span`
    font-family: impact,fantasy;
    color: green;
    font-size: 14px;
    padding: 0 .2rem;
`;

export const PairStruct = Styled.div`
	width: 100%;
	border-top: 40px solid #1280a5;
	box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.01);
	margin: 5%;
`;
export const ViewTask = Styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.05);
	margin: 1rem;
`;

export const RequestedView = Styled.section`
	display: flex;
	flex-direction: column;
    @media ${device.mobileS} {
        width: 100%;
        padding: 2px;
    }
    @media ${device.tablet} {
        width: 30%;
        border-right: 2px solid rgba(0, 0, 0, 0.05);
        padding: .5rem 4rem .5rem .5rem;
    }
`;
export const AssignedView = Styled.section`
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;
	
    @media ${device.mobileS} {
    }
    @media ${device.tablet} {
        padding: .5rem 4rem .5rem 1rem;
    }
	
`;
