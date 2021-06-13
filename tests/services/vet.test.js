const { vet } = require('../../services');
const { ensureIdsAreEqual, ensureEqual } = require('../testUtil');
const {
	generateRandomMongooseId,
	createJob,
	createVetDetails,
	includeSetUpAndTearDown,
	createReview,
	clearDb,
} = require('../utils');

const start = { latitude: 40.689604, longitude: -74.04455 };
const end = { latitude: 38.890298, longitude: -77.035238 };

const testSpeciality = 'dog';
const jobLocation = {
	latitude: 1,
	longitude: 1,
};

describe('Vet Services', () => {
	includeSetUpAndTearDown();
	afterEach(async () => {
		await clearDb();
	});

	it('should be able to calculate distance', () => {
		ensureEqual(vet.calculateDistance(start, end), 324.503521805324);
	});
	it('should be able to calculate average rating', () => {
		const avg = vet.calculateTheAverageRating([
			{ rating: 3.4 },
			{ rating: 4.2 },
			{ rating: 4.4 },
		]);
		expect(avg).toBe(4.0);
	});
	describe('Assignment of jobs to vets', () => {
		const { bestMatch, farAway, nonSpecializing, lowRated } = vetTypes();
		it('should accept the bestMatch', async () => {
			await setUp(bestMatch);
			const assigned = await vet.findSuitableVet(
				[jobLocation.latitude, jobLocation.longitude],
				testSpeciality
			);
			console.log(assigned);
			ensureIdsAreEqual(assigned, bestMatch.id);
		});
		it('should reject the farAway', async () => {
			await setUp(farAway);
			const assigned = await vet.findSuitableVet(
				[jobLocation.latitude, jobLocation.longitude],
				testSpeciality
			);
			expect(assigned).toBeNull();
		});
		it('should reject the nonSpecializing', async () => {
			await setUp(nonSpecializing);

			const assigned = await vet.findSuitableVet(
				[jobLocation.latitude, jobLocation.longitude],
				testSpeciality
			);
			expect(assigned).toBeNull();
		});
		it('should reject the low rated', async () => {
			await setUp(lowRated);
			await setUp(bestMatch);
			const suitable = await vet.findSuitableVet(
				[jobLocation.latitude, jobLocation.longitude],
				testSpeciality
			);
			ensureIdsAreEqual(suitable, bestMatch.id);
		});
	});
});

function vetTypes() {
	return {
		farAway: {
			id: generateRandomMongooseId(),
			location: [50, 50],
			reviews: [4, 4, 4],
			speciality: [testSpeciality, 'sheep', 'goat'],
		},
		nonSpecializing: {
			id: generateRandomMongooseId(),
			location: [1.0005, 1.00007],
			reviews: [4, 4, 4],
			speciality: ['cat', 'sheep', 'goat'],
		},
		lowRated: {
			id: generateRandomMongooseId(),
			location: [1.0005, 1.0005],
			reviews: [1, 1, 1],
			speciality: [testSpeciality, 'sheep', 'goat'],
		},
		bestMatch: {
			id: generateRandomMongooseId(),
			location: [1.005, 1.005],
			reviews: [4, 4, 4],
			speciality: [testSpeciality, 'sheep', 'goat'],
		},
	};
}

async function setUp(type) {
	const vet = await createVetWithSpeciality(type);
	const jobs = await createJobsForVet(vet);
	const reviews = type.reviews;
	for (let i = 0; i < reviews.length; i++)
		createReviewForJobIdWithRating(jobs[i].id, reviews[i]);
}
async function createVetWithSpeciality(vet) {
	return await createVetDetails(vet.id, vet.location, vet.speciality);
}
async function createJobsForVet(vet) {
	const jobs = [];
	for (const speciality of vet.speciality) {
		jobs.push(
			await createJob(
				vet.personal_details_id,
				generateRandomMongooseId(),
				jobLocation,
				speciality
			)
		);
	}
	return jobs;
}

async function createReviewForJobIdWithRating(jobId, rating) {
	return await createReview(jobId, rating);
}
