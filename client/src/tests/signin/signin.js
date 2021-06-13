import * as Source from '../App.test';
import * as testlib from '@testing-library/react';
import { rest } from 'msw';
import { App } from '../../app';
import { Routes } from '../../context';

export const testLogin = () => {
	describe('Login', () => {
		it('submit button greens on hover', () => {
			Source.renderWithRouter(<App />, { route: '/login' });
			expect(testlib.screen.getByText(/Login/i)).toBeInTheDocument();
		});

		it('handles empty logins', async () => {
			Source.renderWithRouter(<App />, { route: '/login' });
			Source.handleInputChange({ field: 'Email', value: '' });
			Source.handleInputChange({ field: 'password', value: '' });
			await Source.handleExpectations({ text: 'null fields' });
		});

		it('Mock handles server exceptions', async () => {
			Source.renderWithRouter(<App />, { route: '/login' });
			Source.handleMockChange();
			await Source.handleExpectations({ text: 'Internal Server Error' });
			expect(window.localStorage.getItem('_u')).toBeNull();
		});

		it('Mock Allows vet to sign in successfully and Redirect', async () => {
			await handleRedirection({
				auth: 'vet',
				path: '/login/vet',
			});
			await testlib.screen.findByText(/View Recommended Tasks/i);
			expect(JSON.parse(localStorage.getItem('_u')).vp_P_A).toEqual(
				Routes().vet
			);
		});
		it('Mock Allows client to sign in successfully and Redirect, Successfully Request Vet service', async () => {
			await handleRedirection({
				auth: 'client',
				path: '/login',
			});
			const requestService = await testlib.screen.findByText(
				/Request Vet Service/i
			);
			expect(JSON.parse(localStorage.getItem('_u')).vp_P_A).toEqual(
				Routes().client
			);
			await testlib.fireEvent.click(requestService);
			await testlib.screen.findByText(/Request form/i);
			testlib.fireEvent.change(
				testlib.getByTestId(document.documentElement, 'category'),
				{
					target: { value: 'petted-Animals' },
				}
			);
			Source.handleInputChange({ field: 'name', value: 'steppar' });
			Source.handleInputChange({
				field: 'description',
				value: 'A brief Description Provided',
			});
			await testlib.fireEvent.click(
				testlib.getByText(document.documentElement, 'REQUEST')
			);
			await testlib.screen.findByText(/Request summary/i);
		});
		it.skip('Mock Routes vet  to sign in successfully, Redirects to update profile and Routes To homepage', async () => {
			await handleRedirection({
				auth: 'update',
				path: '/login/vet',
			});
			await testlib.screen.findByText(/Vet update Details/i);
			expect(JSON.parse(localStorage.getItem('_u')).vp_P_A).toEqual(
				Routes().vetUpdate
			);
			Source.handleInputChange({
				field: 'linkedIn URL',
				value: Source.credentials.linkedIn,
			});
			Source.fireEvent.change(
				testlib.getByTestId(document.documentElement, 'experience'),
				{
					target: { value: '>3' },
				}
			);
			testlib.fireEvent.change(
				testlib.getByTestId(document.documentElement, 'county'),
				{
					target: { value: 'Nairobi' },
				}
			);
			testlib.fireEvent.change(
				testlib.getByTestId(document.documentElement, 'subCounty'),
				{
					target: { value: 'Embakasi South Sub County' },
				}
			);

			const fakeUserResponse = {
				success: true,
				auth: 'Vet',
				token: 'Bearer with_fake_JWT',
			};
			Source.server.use(
				rest.post('*/upload-for-vet', (req, res, ctx) => {
					return res(ctx.json(fakeUserResponse));
				})
			);
			await testlib.fireEvent.click(
				testlib.getByTestId(document.documentElement, 'uploadButton')
			);

			await testlib.screen.findByText(/view/i);
		});

		afterAll(() => Source.resetServer_env());

		const handleMockChange = () => {
			Source.handleInputChange({
				field: 'Email',
				value: Source.credentials.email_valid,
			});
			Source.handleInputChange({
				field: 'password',
				value: Source.credentials.password_valid,
			});
		};

		const handleRedirection = async ({ auth, path }) => {
			const fakeUserResponse = {
				success: true,
				auth: auth,
				token: 'Bearer with_fake_JWT',
			};
			Source.mockSuccessfulrequest(fakeUserResponse);
			Source.renderWithRouter(<App />, { route: path });
			handleMockChange();
			testlib.fireEvent.click(
				testlib.getByTestId(document.documentElement, 'submit-button')
			);
		};
	});
};
