import { SignUp, Login, PageNotFound } from '../views/public';
import * as Private from '../views/private';
import { routePass } from '../context';
import { paths } from '../utils';

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
	{
		path: paths.clientHome,
		component: Private.Client,
		isPrivate: true,
		pass: routePass.client,
		//pass: routePass().client,
	},
	{
		path: paths.request,
		component: Private.Request,
		isPrivate: true,
		pass: routePass.client,
		//pass: routePass().client,
	},
	{
		path: paths.details,
		component: Private.Details,
		isPrivate: true,
		pass: routePass.client,
		//pass: routePass().client,
	},
	{
		path: paths.ratings,
		component: Private.Ratings,
		isPrivate: true,
		pass: routePass.client,
		//pass: routePass().client,
	},
	{
		path: paths.requestTimeline,
		component: Private.Timeline,
		isPrivate: true,
		pass: routePass.client,
		//pass: routePass().client,
	},
	{
		path: paths.historyReview,
		component: Private.HistoryReview,
		isPrivate: true,
		pass: routePass.client,
		//pass: routePass().client,
	},
	{
		path: paths.vetReset,
		component: Private.Reset,
		isPrivate: true,
		pass: routePass.vet,
		//pass: routePass().vet,
	},
	{
		path: paths.clientReset,
		component: Private.Reset,
		isPrivate: true,
		pass: routePass.client,
		//pass: routePass().client,
	},
	{
		path: paths.vetHome,
		component: Private.vet,
		isPrivate: true,
		pass: routePass.vet,
		//pass: routePass().vet,
	},
	{
		path: paths.vetsubmitDet,
		component: Private.VetForm,
		isPrivate: true,
		pass: routePass.vet,
		//pass: routePass().vet,
	},
	{
		path: paths.notFound,
		component: PageNotFound,
		isPrivate: true,
		pass: '',
	},
];
