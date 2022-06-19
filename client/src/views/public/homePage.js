import React, { Component } from "react";
import "../styling/css/home.css";

import { SignUp, Login } from "../public";

import { paths } from "../../utils";

export const routes = [
  {
    path: paths.rootLogin,
    component: Login,
    isPrivate: false,
    pass: "",
  },
  {
    path: paths.vetLogin,
    component: Login,
    isPrivate: false,
    pass: "",
  },
  {
    path: paths.rootSignup,
    component: SignUp,
    isPrivate: false,
    pass: "",
  },
];

const Header = (
  <header>
    <div class="container">
      <div id="branding">
        <a href="/">
          <h1>
            <span class="highlight">Mifugo</span>Care
          </h1>
        </a>
      </div>
      <nav>
        <ul>
          <li>
            <a href={paths.signUp}>Join Platform</a>
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
      <h1>MifugoCare, the world's best vet network</h1>
      <p>
        The perks of having pets and domestic animals are beyond measure.
        Typically, Pets are a great source of companionship, happiness, and
        wellness. Additionally, these pets are grateful, loyal, and true in
        their affections. Accordingly, the Kenyan Pet Products Association
        reveals in its survey that 27% of Kenyan households or approximately 7
        million families have pets in their homes in a 2020-2021 National Pet
        Owners Survey. Consequently, different articles indicate that pets are
        wonderful means to alleviate stress, anxiety, improve immunity, helps
        fight depression, and have many more benefits.
      </p>
      <p> Domestic Animals are also a good source of milk, meat and income. </p>
      <p>
        Therefore, animals, whether domestic or wild, need care and attention.
        Thanks to the existence of veterinarians who diagnose, treat, and
        research medical conditions of pets’ diseases, livestock, or other
        animals
      </p>
    </div>
  </section>
);

const NewsLetter = (
  <section id="newsletter">
    <div class="container">
      <h1>Subcribe to our newsletter</h1>
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
        <h3>
          Client,Post Your ill animal And get it treated. Give your review
          according to serviced offered.
        </h3>
      </div>
      <div class="box">
        <img src="./img/‪+254 703 956617‬ 20170518_215438.jpg" alt="" />
        <h3>
          Vet, Manage your treatement schedule. Get jobs at the confort of your
          home. Leverage your reputation to get the best jobs{" "}
        </h3>
      </div>
      <div class="box">
        <img src="./img/‪+254 703 956617‬ 20171114_000425.jpg" alt="" />
        <h3>
          Experience fast, flowless service provision on MifugoCare platform.
        </h3>
      </div>
    </div>
  </section>
);
const Footer = (
  <footer>
    <p>MifugoCare Ltd &copy; 2021</p>
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
