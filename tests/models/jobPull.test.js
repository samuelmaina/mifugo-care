const { JobPull } = require('../../models');

const {
  includeSetUpAndTearDown,
  clearModel,
  createDocWithDataForType,
  clearDb,
  generateRandomMongooseId,
  createJobPull,
  generateNMongooseIds,
  findIdInArrayOfIds,
  ensureTwoArraysHaveTheSameIds,
  generateReviewData,
} = require('../utils');

const {
  ensureIdsAreEqual,
  ensureArraysAreEqual,
  ensureValueGreaterThanOrEqual,
  ensureValueLessThan,
} = require('../testUtil');

const TRIALS = 6;

describe('JobPull', () => {
  includeSetUpAndTearDown();
  describe('JobPull', () => {
    let data;
    afterEach(async () => {
      await clearDb();
    });
    beforeAll(async () => {
      data = generateReviewData(TRIALS);
    });
    afterAll(async () => {
      await clearDb();
    });
    it('createOne', async () => {
      const doc = await JobPull.createOne(data);
      ensureIdsAreEqual(doc.vet_id, data.vet_id);
      ensureArraysAreEqual(doc.job_ids, data.job_ids);
    });

    describe('After creation', () => {
      describe('statics', () => {
        let pools = [];
        beforeEach(async () => {
          for (let j = 0; j < 2; j++) {
            const data = generateReviewData(TRIALS);
            pools.push(data);
            await createJobPull(vet_id, job_ids);
          }
        });
        it('should find pull(s) for vet Id', async () => {
          const firstPool = pools[0];
          const lastPool = pools[pools.length - 1];
          const pool1 = await JobPull.findOneForVetId(firstPool.vet_id);
          const pool2 = await JobPull.findOneForVetId(lastPool.vet_id);
          ensureTwoArraysHaveTheSameIds(firstPool.job_ids, pool1.job_ids);
          ensureTwoArraysHaveTheSameIds(lastPool.job_ids, pool2.job_ids);
        });
      });

      describe('methods', () => {
        let doc;
        beforeEach(async () => {
          doc = await JobPull.createOne(data);
        });

        it('should add job to a pull', async () => {
          const newJobId = generateRandomMongooseId();
          await doc.addJobIdToPull(newJobId);
          const found = findIdInArrayOfIds(doc.job_ids, newJobId);
          ensureValueGreaterThanOrEqual(found, 0);
        });
        it('should remove job from a pull', async () => {
          const firstJob = job_ids[0];
          await doc.removeJobIdFromPull(firstJob);
          const found = findIdInArrayOfIds(doc.job_ids, firstJob);
          ensureValueLessThan(found, 0);
        });
      });
    });
  });
});
