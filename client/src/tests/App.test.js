import {
	render,
	screen,
	fireEvent,
	getByTestId,
	getByPlaceholderText,
	getByText,
} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter as Router } from 'react-router-dom';
import { Aside } from '../views/public/signup';
import { Routes } from '../context';
import { App } from '../app';
import {
	AssertAndValidateLogin,
	AssertAndValidateSignup,
} from '../utils/validate';
import { IdVerificationandContacts } from '../views/private/sysview1';
export const credentials = {
	email_valid: 'romanReigns@gmail.com',
	email_invalid: 'Romangmail.com',
	password_valid: 'ro9_Re5@rr',
	password_invalid: 'romanrei2',
	linkedIn: 'http://localhost:3067/@romanReigns',
};
let container = document.createElement('div');

const Render = (component) => render(component, container);

describe('Login', () => {
	it('submit button greens on hover', () => {
		renderWithRouter(<App />, { route: '/login' });
		expect(screen.getByText(/Login/i)).toBeInTheDocument();
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
		expect(window.localStorage.getItem('_u')).toBeNull();
	});

	it('Mock Allows vet to sign in successfully and Redirect', async () => {
		await handleRedirection({
			auth: 'vet',
			path: '/login/vet',
		});
		await screen.findByText(/View Recommended Tasks/i);
		expect(JSON.parse(localStorage.getItem('_u')).vp_P_A).toEqual(Routes().vet);
	});
	it('Mock Allows client to sign in successfully and Redirect, Successfully Request Vet service', async () => {
		await handleRedirection({
			auth: 'client',
			path: '/login',
		});
		const requestService = await screen.findByText(/Request Vet Service/i);
		expect(JSON.parse(localStorage.getItem('_u')).vp_P_A).toEqual(
			Routes().client
		);
		await fireEvent.click(requestService);
		await screen.findByText(/Request form/i);
		fireEvent.change(getByTestId(document.documentElement, 'category'), {
			target: { value: 'petted-Animals' },
		});
		handleInputChange({ field: 'name', value: 'steppar' });
		handleInputChange({
			field: 'description',
			value: 'A brief Description Provided',
		});
		await fireEvent.click(getByText(document.documentElement, 'REQUEST'));
		await screen.findByText(/Request summary/i);
	});
	it.skip('Mock Routes vet  to sign in successfully, Redirects to update profile and Routes To homepage', async () => {
		await handleRedirection({
			auth: 'update',
			path: '/login/vet',
		});
		await screen.findByText(/Vet update Details/i);
		expect(JSON.parse(localStorage.getItem('_u')).vp_P_A).toEqual(
			Routes().vetUpdate
		);
		handleInputChange({ field: 'linkedIn URL', value: credentials.linkedIn });
		fireEvent.change(getByTestId(document.documentElement, 'experience'), {
			target: { value: '>3' },
		});
		fireEvent.change(getByTestId(document.documentElement, 'county'), {
			target: { value: 'Nairobi' },
		});
		fireEvent.change(getByTestId(document.documentElement, 'subCounty'), {
			target: { value: 'Embakasi South Sub County' },
		});

		const fakeUserResponse = {
			success: true,
			auth: 'Vet',
			token: 'Bearer with_fake_JWT',
		};
		server.use(
			rest.post('*/upload-for-vet', (req, res, ctx) => {
				return res(ctx.json(fakeUserResponse));
			})
		);
		await fireEvent.click(
			getByTestId(document.documentElement, 'uploadButton')
		);

		await screen.findByText(/view/i);
	});

	afterAll(() => resetServer_env());

	const handleMockChange = () => {
		handleInputChange({ field: 'Email', value: credentials.email_valid });
		handleInputChange({ field: 'password', value: credentials.password_valid });
	};

	const handleRedirection = async ({ auth, path }) => {
		const fakeUserResponse = {
			success: true,
			auth: auth,
			token: 'Bearer with_fake_JWT',
		};
		mockSuccessfulrequest(fakeUserResponse);
		renderWithRouter(<App />, { route: path });
		handleMockChange();
		fireEvent.click(getByTestId(document.documentElement, 'submit-button'));
	};
});

describe('Signup', () => {
	it('H1 Network keyword present', () => {
		renderWithRouter(<App />, { route: '/signup' });
		expect(screen.getByText(/Network/i)).toBeInTheDocument();
	});

	it('handles empty Signups', async () => {
		renderWithRouter(<App />, { route: '/signup' });
		handleChange('', '', '', '');
		await handleExpectations({ text: 'key in all the fields' });
	});

	it('Mock handles server exceptions', async () => {
		server.use(
			rest.post('*/sign-up/:path', (req, res, ctx) => {
				return res(
					ctx.status(500),
					ctx.json({ error: 'Internal Server Error' })
				);
			})
		);
		renderWithRouter(<App />, { route: '/signup' });
		handleChange(
			'roman Reigns',
			credentials.email_valid,
			credentials.password_valid,
			credentials.password_valid
		);
		await handleExpectations({ text: 'Internal Server Error' });
		expect(window.localStorage.getItem('_u')).toBeNull();
	});

	it('Mock allows user to sign up successfully And Redirect', async () => {
		const fakeUserResponse = { message: 'Successfully signed up.' };

		server.use(
			rest.post('*/sign-up/:path', (req, res, ctx) => {
				return res(ctx.json(fakeUserResponse));
			})
		);
		renderWithRouter(<App />, { route: '/signup' });
		fireEvent.change(getByTestId(document.documentElement, 'selector'), {
			target: { value: 'vet' },
		});
		handleChange(
			'roman Reigns',
			credentials.email_valid,
			credentials.password_valid,
			credentials.password_valid
		);
		fireEvent.click(getByTestId(document.documentElement, 'submit-button'));
		await screen.findByText(/Remember/i);
	});
	afterEach(() => resetServer_env());

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
	const testforLoginValidator = (text) => {
		Render(AssertAndValidateLogin(data));
		expect(document.querySelector('div').textContent).toMatch(text);
	};
});

describe('signup Validator', () => {
	const full_name = 'Roman Reigns';
	const data = {
		name: '',
		email: '',
		password: '',
	};

	it('Resolves valid sign up credentials', () => {
		data.name = full_name;
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
		data.name = '';
		data.email = credentials.email_valid;
		data.password = credentials.password_valid;
		testForSignupValidator('key in all the fields');
	});

	it('rejects invalid password field', () => {
		data.name = full_name;
		data.email = credentials.email_valid;
		data.password = credentials.password_invalid;
		testForSignupValidator('invalid password');
	});

	it('rejects invalid email field', () => {
		data.name = full_name;
		data.email = credentials.email_invalid;
		data.password = credentials.password_valid;
		testForSignupValidator('invalid email');
	});
	const testForSignupValidator = (text) => {
		Render(AssertAndValidateSignup(data));
		expect(document.querySelector('div').textContent).toMatch(text);
	};
});
describe.skip('Contact verifier', () => {
	it('renders the correct message', () => {
		Render(<IdVerificationandContacts />);
		expect(screen.getByText(/Step 3 of 4 Identity/i)).toBeInTheDocument();
	});
	it('server returns contact infor for the user', () => {
		const fakeUserResponse = {
			status: { code: 200, message: 'ok' },
			results: { tel: '0787482982' },
		};

		server.use(
			rest.get('*/telephone/:path', (req, res, ctx) => {
				return res(ctx.json(fakeUserResponse));
			})
		);
	});
});
export const server = setupServer(
	rest.post('*/auth/*', (req, res, ctx) => {
		return res(ctx.status(500), ctx.json({ error: 'Internal Server Error' }));
	})
);

export const mockSuccessfulrequest = (fakeUserResponse) => {
	server.use(
		rest.post('*/auth/log-in/:type', (req, res, ctx) => {
			return res(ctx.json(fakeUserResponse));
		})
	);
};
beforeAll(() => server.listen());
afterAll(() => server.close());

export const handleInputChange = ({ field, value }) => {
	fireEvent.change(getByPlaceholderText(document.documentElement, field), {
		target: { value: value },
	});
};

export const handleExpectations = async ({ text }) => {
	fireEvent.click(getByTestId(document.documentElement, 'submit-button'));
	const alert = await screen.findByRole('alert');
	expect(alert).toHaveTextContent(text);
};

export const resetServer_env = () => {
	server.resetHandlers();
	window.localStorage.removeItem('_u');
};

export const renderWithRouter = (ui, { route = '/' } = {}) => {
	window.history.pushState({}, 'Test Page', route);
	return render(ui, { wrapper: Router });
};
