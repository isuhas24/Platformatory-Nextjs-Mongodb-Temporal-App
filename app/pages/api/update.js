// import { getDb } from '../../lib/mongo';
import { getDb } from '@/lib/mongo';
import { Connection, WorkflowClient } from '@temporalio/client';
import clientPromise from '@/lib/mongo';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { uid, name, email, phone } = req.body;
  const dbs = ['userDB1', 'userDB2', 'userDB3'];

  try {
    const dbClient = await clientPromise;

    await Promise.all(
      dbs.map(async (dbName) => {
        const db = dbClient.db(dbName);
        const result = await db.collection('users').updateOne(
          { uid },
          { $set: { name, email, phone } }
        );

        if (result.matchedCount === 0) {
          console.warn(`No document found with uid: ${uid} in ${dbName}`);
        } else {
          console.log(`Updated user in ${dbName}`);
        }
      })
    );

    // Connecting to Temporal server and create client
    const connection = await Connection.connect();
    const client = new WorkflowClient({ connection });

    // Starting workflow to orchestrate/update user
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
