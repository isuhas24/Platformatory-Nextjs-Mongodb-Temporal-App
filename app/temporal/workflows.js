const { proxyActivities } = require('@temporalio/workflow');
const { updateUserActivity } = proxyActivities({ startToCloseTimeout: '1 minute' });

async function updateUserWorkflow(user) {
  await updateUserActivity(user);
  return { status: 'ok', uid: user.uid };
}

exports.updateUserWorkflow = updateUserWorkflow;
