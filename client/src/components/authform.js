import Styled, { css, keyframes } from 'styled-components';
import Image from '../images/vt1.jpg';
import { device } from './device';
import ArrowDown from '../images/svg/dropdown.svg';
const baseInputStyles = css`
	padding: 5px;
	margin: 10px 0;
	border: 0;
	border-bottom: 2px solid #eee;
	@media ${device.mobileS} {
		width: 100%;
	}
	@media ${device.laptop} {
		width: 80%;
	}
`;
const AuthbaseInputStyles = css`
	position: absolute;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`;
const fadeIn = keyframes`
    from {top: -10px;opacity:0}
    to {top: 30px; opacity: 1}
`;
const selectStyles = css`
	cursor: pointer;
	background: url(${ArrowDown}) 99% / 3% no-repeat;
`;
export const Img = Styled.img`
    height: auto;
    width: 100%;
`;
export const Container = Styled.div`
    width:100%;
    background: url(${Image}) no-repeat center;
    background-size: cover;
    @media ${device.mobileS} {
        height: 560px;
    }
    @media ${device.mobileM} {
        height: 655px;
    }
`;
export const Form = Styled.form`
    position: absolute;
	top: 20px;
    border:1px solid;
	border-radius: 5px;
    background-color:white;
    @media ${device.mobileS} {
        left: 3%;
        width: 94%;
    }
    @media ${device.laptop} {
        left: 10%;
        width: 40%;
    }
`;
export const Header = Styled.div`
    height: 30px;
    margin-left: 30px;
    padding-top:1.5rem;
    font-weight:bold;
`;
export const Card = Styled.div`
    margin: 0rem 1rem;
    padding: .4rem;
`;
export const P = Styled.p`
    margin-left: 30px;
    font-weight:bold;
`;
export const Input = Styled.input`
    ${baseInputStyles}
`;
export const Select = Styled.select`
    ${baseInputStyles};
    ${selectStyles};
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    
`;
export const Button = Styled.button`
    height:40px;
    width: 30%;
    margin: .5rem 2rem;
    border: 1px solid;
    border-radius: 5px;
    cursor: pointer;
`;
export const Speciality = Styled.div`
    ${baseInputStyles};
    ${selectStyles};
`;
export const TodisplayTypes = Styled.div`
    position:absolute;
    top: 10px;
    left: 60%;
`;
export const Popup = Styled.div`
    position: absolute;
    top: 30px;
    border:1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px; 
    box-shadow: 12px 12px 2px  1px rgba(0, 0, 0, 0.15);
    background-color: rgba(0, 0, 0, 0.9);
    color: rgba(255, 255, 255, 0.658);
    animation: .5s ${fadeIn} ease-out;
    @media ${device.mobileS} {
        left: 3%;
        right: 3%;
        font-size: .7rem;
    }
    @media ${device.mobileM} {
        font: 1.1rem bold;
    }
    @media ${device.laptop} {
        left:60%;
        right:10%;
        font: 1.2rem bold;
    }
    
    
`;

export const CancelButton = Styled.span`
    font-weight: bolder;
    cursor: pointer;
    margin-left: 20px;
    font-size: 2.0rem;
    text-align: center;
    :hover {
        background-color: red;
        border-radius: 2px;
    }
`;

export const AuthH1 = Styled.h1`
    text-align: center;
	font-family: Proxima Nova, Arial, 'sans-serif';
	color: #353851;
	line-height: 44px;
	margin-bottom: 24px;
    @media ${device.mobileS}{
        font: 1.5rem bold;
    }
    @media ${device.laptop} {
        font-weight: 300;
	    font-size: 36px;
    }
`;
export const Applogin = Styled.div`
    ${AuthbaseInputStyles}
    @media ${device.mobileS}{
        top: 15vh;
        left: 5%;
        width: 90%;
        
    }
    @media${device.laptop} {
        top: 20vh;
	    left: 35%;
        width: 25%;
    }

`;
export const AppSignup = Styled.div`
    ${AuthbaseInputStyles}
    @media ${device.mobileS}{
        top: 15vh;
        left: 2%;
        width: 95%;
    }
    @media${device.laptop} {
        top: 120px;
	    left: 25vw;
        width: 50vw;
        flex-wrap: nowrap;
    }
`;
export const Formdiv = Styled.div`
    @media ${device.mobileS}{
        order:1;
        width: 100%;
        padding-left:7%;
        margin-bottom:60px;
    }
    @media${device.laptop} {
        order:0;
        width: 60%;
        padding:0;
        margin:0;
    }
`;
export const Divaside = Styled.div`
    @media ${device.mobileS}{
        width: 100%;
        background-color: rgba(128, 128, 128, 0.01);
        margin:10px;
        border-radius: 5px;
    }
    @media ${device.laptop}{
        width: 40%;
        border-left: 1px solid;
	    border-radius: 2px;
        background-color: #ffffff;
    }
`;
export const Asidecontent = Styled.div`
    @media ${device.mobileS}{
        padding-bottom: 20px;
        margin-left: 15%;
    }
    @media ${device.laptop}{
        margin: 0 0 30px 25%;
	    padding-bottom: 20px;
    }
    
`;
export const Notfound = Styled.div`
     width: 100%;
     height: 40px;
     text-align:center;
     font-family: Proxima Nova, Arial, 'sans-serif';
	 color: #353851;
	 line-height: 44px;
`;

export const Passreset = Styled.form`
    margin : .5rem;
    padding: 2px;
    box-shadow: 2px 1.5px 2px 2px rgba(198, 198, 198, 0.5);
   
    @media ${device.mobileS} {
         width: 95%;
    }
    @media ${device.laptop} {
         width: 50%;
    }
`;
export const Pass = Styled(Input)`
    
`;
