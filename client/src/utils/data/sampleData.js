const today = new Date();
const at = (hours) => today.setHours(hours, 0);
export const tasks = [
	{
		raisedAt: at(10),
		task: {
			class: 'Beasts of Burden',
			species: 'Donkey',
			name: 'Filaugh',
			symptoms: 'Susceptible foot and Mouth Infestation',
			coords: {
				lat: 59.955413,
				lng: 30.337844,
			},
			photos: [
				require('../../images/client/client1/11236.jpg'),
				require('../../images/client/client1/12236.jpg'),
			],
		},
	},
	{
		raisedAt: at(11),
		task: {
			class: 'Livestock',
			species: 'Sheep',
			name: 'Dolly',
			symptoms: 'Mastitis symptoms',
			coords: {
				lat: 59.724,
				lng: 30.08,
			},
			photos: [
				require('../../images/client/client2/11237.jpg'),
				require('../../images/client/client2/12237.jpg'),
				require('../../images/client/client2/13237.jpg'),
			],
		},
	},
	{
		raisedAt: at(12),
		task: {
			class: 'Livestock',
			species: 'Cattle',
			name: 'sachy',
			symptoms: 'Believed to be Footrot Symptoms',
			coords: {
				lat: 59.524,
				lng: 30.08,
			},
			photos: [
				require('../../images/client/client3/11234.jpg'),
				require('../../images/client/client3/12234.jpg'),
				require('../../images/client/client3/13234.jpg'),
				require('../../images/client/client3/14234.jpg'),
				require('../../images/client/client3/15234.jpg'),
			],
		},
	},
	{
		raisedAt: at(8),
		task: {
			class: 'Livestock',
			species: 'Domestic Pig',
			name: '',
			symptoms: 'Nutritional Deficiency',
			coords: {
				lat: 49.524,
				lng: 30.08,
			},
			photos: [
				require('../../images/client/client4/11235.jpg'),
				require('../../images/client/client4/12235.jpg'),
				require('../../images/client/client4/13235.jpg'),
				require('../../images/client/client4/14235.jpg'),
			],
		},
	},
];

export const recommendedTasks = [
	{
		raisedAt: at(14),
		task: {
			class: 'Poultry',
			species: 'Dove',
			name: 'pea',
			symptoms: 'Inconsistent Feeding',
			coords: {
				lat: 59.724,
				lng: 30.08,
			},
			photos: [
				require('../../images/client/client2/11237.jpg'),
				require('../../images/client/client2/12237.jpg'),
				require('../../images/client/client2/13237.jpg'),
			],
		},
	},
];
