import { makeGETrequest } from '../../context';

export const geocoder = async (address, dispatch) => {
	//Physical Address Geocoding to Geometric transformations

	//use opencageData Googlemaps Api requesting Billing address
	const base_uri = 'https://api.opencagedata.com/geocode/v1/json';

	const api_key = '4ec9ea9cd6c54deeae8354978233f5e2';
	const uri = `${base_uri}?q=${address}&key=${api_key}`;

	return await makeGETrequest(uri, dispatch, true);
};

export async function reverseGeocode(dispatch, coords) {
	dispatch({ type: 'REQUEST_API' });

	var query = coords[0] + ',' + coords[1];
	var api_url = 'https://api.opencagedata.com/geocode/v1/json';
	var apikey = '4ec9ea9cd6c54deeae8354978233f5e2';

	var request_url =
		api_url +
		'?' +
		'key=' +
		apikey +
		'&q=' +
		encodeURIComponent(query) +
		'&pretty=1';

	return await makeGETrequest(request_url, dispatch, false);
}
