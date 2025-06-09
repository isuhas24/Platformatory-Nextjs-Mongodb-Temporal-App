const { Worker } = require('@temporalio/worker');
const path = require('path');

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities: require('./activities'),
    taskQueue: 'user-updates',
  });

  console.log('👷 Temporal Worker started...');
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
