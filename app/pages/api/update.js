// import { getDb } from '../../lib/mongo';
import { getDb } from '@/lib/mongo';
import { Connection, WorkflowClient } from '@temporalio/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { uid, name, email, phone } = req.body;

  try {
    const dbs = ['userDB1', 'userDB2', 'userDB3'];

    for (const dbName of dbs) {
      const db = await getDb(dbName);
      const result = await db.collection('users').updateOne({ uid }, { $set: { name, email, phone } });
      if (result.matchedCount === 0) {
        console.warn(`No document found with uid: ${uid} in ${dbName}`);
      } else {
        console.log(`Updated user in ${dbName}`);
      }
    }

    // Connect to Temporal server and create client
    const connection = await Connection.connect();
    const client = new WorkflowClient({ connection });

    // Start workflow to orchestrate/update user
    await client.start('updateUserWorkflow', {
      taskQueue: 'user-updates',
      workflowId: `update-${uid}-${Date.now()}`,
      args: [{ uid, name, email, phone }],
    });

    res.status(200).json({ message: 'User updated and workflow triggered' });
  } catch (err) {
    console.error('Update or workflow failed:', err);
    res.status(500).json({ error: 'Update or workflow failed' });
  }
}
