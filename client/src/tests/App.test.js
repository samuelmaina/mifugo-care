import {
	render,
	screen,
	fireEvent,
	getByTestId,
	getByPlaceholderText,
} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter as Router } from 'react-router-dom';
import { Aside } from '../views/public/signup';
import { routePass } from '../context';
import { App } from '../app';
import {
	AssertAndValidateLogin,
	AssertAndValidateSignup,
} from '../utils/validate';
import { VetForm } from '../views/private';
const credentials = {
	email_valid: 'romanReigns@gmail.com',
	email_invalid: 'Romangmail.com',
	password_valid: 'ro9_Re5@rr',
	password_invalid: 'romanrei2',
};
let container = document.createElement('div');

const Render = component => render(component, container);
describe.only('Login', () => {
	it('submit button greens on hover', () => {
		renderWithRouter(<App />, { route: '/login' });
		expect(screen.getByText(/Login/i)).toBeInTheDocument();
		expect(getByTestId(document.documentElement, 'submit-button')).toHaveStyle(
			'color:black'
		);
	});

	it('handles empty logins', async () => {
		renderWithRouter(<App />, { route: '/login' });
		handleInputChange({ field: 'Email', value: '' });
		handleInputChange({ field: 'password', value: '' });
		await handleExpectations({ text: 'null fields' });
	});

	it('Mock handles server exceptions', async () => {
		renderWithRouter(<App />, { route: '/login' });
		handleMockChange();
		await handleExpectations({ text: 'Internal Server Error' });
		expect(window.localStorage.getItem('currentUser')).toBeNull();
	});

	it('Mock Allows vet to sign in successfully and Redirect', async () => {
		await handleRedirection({
			auth: routePass.vet,
		});
		await screen.findByText(/vet/i);
		expect(JSON.parse(localStorage.getItem('currentUser')).vp_P_A).toEqual(
			routePass.vet
		);
	});
	it('Mock Allows client to sign in successfully and Redirect', async () => {
		await handleRedirection({
			auth: routePass.client,
		});
		await screen.findByText(/client homepage/i);
		expect(JSON.parse(localStorage.getItem('currentUser')).vp_P_A).toEqual(
			routePass.client
		);
	});
	it('Mock Routes vet  to sign in successfully and Redirect to update profile', async () => {
		await handleRedirection({
			auth: routePass.vetUpdate,
		});
		await screen.findByText(/linkedIn/i);
		expect(JSON.parse(localStorage.getItem('currentUser')).vp_P_A).toEqual(
			routePass.vetUpdate
		);
	});

	afterAll(() => resetServer_env());

	const handleMockChange = () => {
		handleInputChange({ field: 'Email', value: credentials.email_valid });
		handleInputChange({ field: 'password', value: credentials.password_valid });
	};

	const handleRedirection = async ({ auth }) => {
		const fakeUserResponse = { id: 'fake_user_token', vp_P_A: auth };

		mockSuccessfulrequest(fakeUserResponse);
		renderWithRouter(<App />);
		handleMockChange();
		fireEvent.click(getByTestId(document.documentElement, 'submit-button'));
	};
});

describe.skip('Signup', () => {
	it('H1 Network keyword present', () => {
		renderWithRouter(<App />);
		expect(screen.getByText(/Remember/i)).toBeInTheDocument();
	});

	it('handles empty Signups', async () => {
		renderWithRouter(<App />, { route: '/signup' });
		handleChange('', '', '', '');
		await handleExpectations({ text: 'key in all the fields' });
	});

	it('Mock handles server exceptions', async () => {
		localStorage.removeItem('currentUser');
		renderWithRouter(<App />, { route: '/signup' });
		handleChange(
			'roman Reigns',
			credentials.email_valid,
			credentials.password_valid,
			credentials.password_valid
		);
		await handleExpectations({ text: 'Internal Server Error' });
		expect(window.localStorage.getItem('currentUser')).toBeNull();
	});

	it('Mock allows user to sign up successfully And Redirect', async () => {
		const fakeUserResponse = { token: 'fake_user_token', auth: 'signed' };

		mockSuccessfulrequest(fakeUserResponse);
		renderWithRouter(<App />, { route: '/signup' });
		handleChange(
			'roman Reigns',
			credentials.email_valid,
			credentials.password_valid,
			credentials.password_valid
		);
		fireEvent.click(getByTestId(document.documentElement, 'submit-button'));
		await screen.findByText(/Remember/i);
	});
	afterAll(() => resetServer_env());

	const handleChange = (fullname, Email, password, confirm_password) => {
		handleInputChange({ field: 'fullname', value: fullname });
		handleInputChange({ field: 'Email', value: Email });
		handleInputChange({ field: 'password', value: password });
		handleInputChange({ field: 'confirm password', value: confirm_password });
	};
});

describe('Aside', () => {
	it('displays services offered', () => {
		Render(<Aside />);
		expect(container.getElementsByClassName('div-aside')).not.toBeNull();
	});
});

describe('Login validator', () => {
	const data = {
		email: credentials.email_valid,
		password: credentials.password_valid,
	};
	it('resolves valid password and Email entry', () => {
		testforLoginValidator('valid');
	});

	it('rejects null credentials on first try', () => {
		data.email = '';
		data.password = '';
		testforLoginValidator('null fields');
	});

	it('rejects invalid email field', () => {
		data.email = credentials.email_invalid;
		data.password = credentials.password_valid;
		testforLoginValidator('invalid email');
	});

	it('rejects invalid password field', () => {
		data.email = credentials.email_valid;
		data.password = credentials.password_invalid;
		testforLoginValidator('invalid password');
	});
	const testforLoginValidator = text => {
		Render(AssertAndValidateLogin(data));
		expect(document.querySelector('div').textContent).toMatch(text);
	};
});

describe('signup Validator', () => {
	const full_name = 'Roman Reigns';
	const data = {
		groupLevel: 'group1',
		fullName: '',
		email: '',
		password: '',
	};

	it('Resolves valid sign up credentials', () => {
		data.fullName = full_name;
		data.email = credentials.password_valid;
		data.password = credentials.password_valid;
		testForSignupValidator('valid');
	});

	it('rejects password not matching', async () => {
		renderWithRouter(<App />, { route: '/signup' });
		handleInputChange({ field: 'password', value: credentials.password_valid });
		handleInputChange({
			field: 'confirm password',
			value: credentials.password_invalid,
		});
		await handleExpectations({ text: 'Password Match Error' });
	});

	it('Rejects any null field present', () => {
		data.fullName = '';
		data.email = credentials.email_valid;
		data.password = credentials.password_valid;
		testForSignupValidator('key in all the fields');
	});

	it('rejects invalid password field', () => {
		data.fullName = full_name;
		data.email = credentials.email_valid;
		data.password = credentials.password_invalid;
		testForSignupValidator('invalid password');
	});

	it('rejects invalid email field', () => {
		data.fullName = full_name;
		data.email = credentials.email_invalid;
		data.password = credentials.password_valid;
		testForSignupValidator('invalid email');
	});
	const testForSignupValidator = text => {
		Render(AssertAndValidateSignup(data));
		expect(document.querySelector('div').textContent).toMatch(text);
	};
});

describe('vetform', () => {
	it('returns a valid component', () => {
		Render(<VetForm />);
		expect(container.textContent).not.toBeNull();
	});
});
const server = setupServer(
	rest.post('/auth', (req, res, ctx) => {
		return res(ctx.status(500), ctx.json({ error: 'Internal Server Error' }));
	})
);

const mockSuccessfulrequest = (path, fakeUserResponse) => {
	server.use(
		rest.post(path, (req, res, ctx) => {
			return res(ctx.json(fakeUserResponse));
		})
	);
};
beforeAll(() => server.listen());
afterAll(() => server.close());

const handleInputChange = ({ field, value }) => {
	fireEvent.change(getByPlaceholderText(document.documentElement, field), {
		target: { value: value },
	});
};

const handleExpectations = async ({ text }) => {
	fireEvent.click(getByTestId(document.documentElement, 'submit-button'));
	const alert = await screen.findByRole('alert');
	expect(alert).toHaveTextContent(text);
};

const resetServer_env = () => {
	server.resetHandlers();
	window.localStorage.removeItem('token');
};

const renderWithRouter = (ui, { route = '/' } = {}) => {
	window.history.pushState({}, 'Test Page', route);
	return render(ui, { wrapper: Router });
};
