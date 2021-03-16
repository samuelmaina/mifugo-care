import { SignUp, Login } from '../views/public';
import { vet, VetForm, client } from '../views/private';
import { routePass } from '../context';

const routes = [
	{
		path: '/login',
		component: Login,
		isPrivate: false,
		pass: '',
	},
	{
		path: '/signup',
		component: SignUp,
		isPrivate: false,
		pass: '',
	},
	{
		path: '/client/homepage',
		component: client,
		isPrivate: true,
		pass: routePass.client,
	},
	{
		path: '/vet/homepage',
		component: vet,
		isPrivate: true,
		pass: routePass.vet,
	},
	{
		path: '/vet/completeRegistration',
		component: VetForm,
		isPrivate: true,
		pass: routePass.vetUpdate,
	},
];
export { routes, Login };
