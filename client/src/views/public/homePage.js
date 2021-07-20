import React, { Component } from 'react';
import '../styling/css/home.css';

import { SignUp, Login } from '../public';

import { paths } from '../../utils';

export const routes = [
	{
		path: paths.rootLogin,
		component: Login,
		isPrivate: false,
		pass: '',
	},
	{
		path: paths.vetLogin,
		component: Login,
		isPrivate: false,
		pass: '',
	},
	{
		path: paths.rootSignup,
		component: SignUp,
		isPrivate: false,
		pass: '',
	},
];

const Header = (
	<header>
		<div class="container">
			<div id="branding">
				<h1>
					<span class="highlight">Vet</span>Health
				</h1>
			</div>
			<nav>
				<ul>
					<li class="current">
						<a href="/home">Home</a>
					</li>
					<li>
						<a href="/about">About</a>
					</li>
					<li>
						<a href={paths.signUp}>Any Sign Up</a>
					</li>
					<li>
						<a href={paths.rootLogin}>Client Login</a>
					</li>
					<li>
						<a href={paths.vetLogin}>Vet Login</a>
					</li>
				</ul>
			</nav>
		</div>
	</header>
);
const ShowCase = (
	<section id="showcase">
		<div class="container">
			<h1>The Site where diseases and management are totally managed.</h1>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum,
				excepturi deleniti. Ad optio dolor ducimus ipsam consequuntur, tempore
				unde quam corrupti numquam amet ullam consequatur vitae quia
				reprehenderit quod beatae.
			</p>
		</div>
	</section>
);

const NewsLetter = (
	<section id="newsletter">
		<div class="container">
			<h1>subcribe to our newsletter</h1>
			<form action="">
				<input type="email" placeholder="Enter your email address" />
				<input type="submit" class="button_1" value="Subscribe" />
			</form>
		</div>
	</section>
);

const Services = (
	<section id="boxes">
		<div class="container">
			<div class="box">
				<img src="./img/Ann_Bahati_Gals 20170517_193140.jpg" alt="" />
				<h3> Client,Post Your ill animal</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed hic quis
					esse repudiandae possimus suscipit veniam cumque autem culpa sequi
					voluptas ratione, temporibus mollitia dicta animi cum magnam molestiae
					soluta!
				</p>
			</div>
			<div class="box">
				<img src="./img/‪+254 703 956617‬ 20170518_215438.jpg" alt="" />
				<h3>Vet, Manage your treatement schedule</h3>
				<p>
					{' '}
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed hic quis
					esse repudiandae possimus suscipit veniam cumque autem culpa sequi
					voluptas ratione, temporibus mollitia dicta animi cum magnam molestiae
					soluta!
				</p>
			</div>
			<div class="box">
				<img src="./img/‪+254 703 956617‬ 20171114_000425.jpg" alt="" />
				<h3>Client, be able to rate and write reviews for a vet</h3>
				<p>
					{' '}
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed hic quis
					esse repudiandae possimus suscipit veniam cumque autem culpa sequi
					voluptas ratione, temporibus mollitia dicta animi cum magnam molestiae
					soluta!
				</p>
			</div>
		</div>
	</section>
);
const Footer = (
	<footer>
		<p>Samuel Maina &copy; 2020</p>
	</footer>
);
export class HomePage extends Component {
	render() {
		return (
			<div>
				{Header} {ShowCase}
				{NewsLetter}
				{Services}
				{Footer}
			</div>
		);
	}
}
