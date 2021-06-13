import Styled from 'styled-components';
import { Logout, SubmitReview, Code254 } from './client';
import { Input } from './authform';

export const VetView = Styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 85%;
    flex: 1 1 auto;
`;
export const VetViewHeader = Styled(VetView)`
    justify-content: space-evenly;
`;
export const H2 = Styled.h2`
    font-family: Impact, fantasy;
    color: #1280a5;
    :hover {
        border-bottom: 2px solid lightgray;
        cursor:pointer
    } 
`;
export const Li = Styled.li`
	margin: 0.5rem;
    padding: .5rem .2rem;
	border: 1px solid white;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	border-bottom: 1px solid;
	:hover {
		background-color: #e6e6e6;
		cursor: pointer;
	}
	:active {
		color: green;
	}
`;
export const Ol = Styled.ol`
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.05);
	border-top: 5px solid lightblue;
    border-radius: 5px;
`;

export const CustomButtons = Styled(Logout)`
width: 40%;
padding:.2rem;
margin:0;
:hover {
    position: relative;
    top: -2px;
    left: -2px;
    padding: .3rem;
    color:#1280a5;
    background-color: rgb(230, 154, 55);
    box-shadow: 2px 1.5px 2px 1px lightblue;
}
:active {
    color: green;
    padding: .5rem;
    top: -3px;
    left: -4px;
}
`;

export const DoReccTask = Styled(SubmitReview)`
    border-radius: 5px;
    border: 2px solid;
    :hover {
        color: green;
        cursor: pointer;
        position: relative;
        top: -2px;
        left: -2px;
    }
`;

export const ActOnRecTaskCont = Styled.div`
    margin-top: .5rem;
`;
export const PhotosTog = Styled.div`
    width:30%;
	padding: 8% 0 0 8%;
	margin: 2rem;
`;

export const TaskDone = Styled(CustomButtons)`
    width:50px;
	height: 50px;
	border-radius: 50%;
`;
export const TasksFlexer = Styled.section`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
 `;

export const Map = Styled.div`
    height: 400px;
    width: 100%;     
 `;

export const AfterMath = Styled.div`
    margin: 3.5rem 1.5rem;
    width: 500px;
    box-shadow: 0 0 .1px 2px rgb(0, 0, 0, 0.06);
    border-radius: 5px;
    background-color: white;
    padding: .5rem;
 `;
export const ConfirmAfterMath = Styled(CustomButtons)`
    padding: .9rem 0;
`;
export const DivConfirmAfterMath = Styled.div`
    width: 70%;
    text-align: center;
    padding: .5rem;
`;
export const CashInput = Styled(Input)`
    padding-left: 35px;
`;
export const Ksh254 = Styled(Code254)``;

export const SuccessCard = Styled.p`
   text-align: center;
   color: green;
   font-style: italic;
`;

export const Plainfield = Styled.div`
    font-weight: 200;
    font-size: 25px;
	font-family: Impact, fantasy;
`;

export const Loctip = Styled.div`
    border: 2px solid #065d7a;
    border-radius: 5px;
    padding: .2rem 1rem;
    position: absolute;
    top: -25px;
    left: 1rem;
`;
