How to run the application 

=> overview
This app allows users to sign in with Google using Firebase Auth. On first login, the user is inserted into MongoDB. The dashboard displays that user’s info (editable), and updates are propagated to three databases (userDB1, userDB2, userDB3). Updates are also orchestrated through a Temporal workflow.

=> Prerequisites
1. Node.js v18+
2. MongoDB Atlas Cluster
3. Databases: userDB1, userDB2, userDB3
4. Collection inside each: users
5. Firebase Project
6. Enable Google Sign-In
7. Get your Web app's config keys
8. Temporal CLI Installed
9. Install Temporal CLI (for local dev)

=> Install Dependencies
npm i

=> Run Temporal Server
Start Temporal server (in a separate terminal window): temporal server start-dev
This starts the Temporal server on localhost:7233. Temporal Web UI is available at http://localhost:8233.

=> Start Temporal Worker
In another terminal window, from the root of your project: npm run start:worker

=> Start the Next.js App
In another terminal: npm run dev
Runs the app at http://localhost:3000