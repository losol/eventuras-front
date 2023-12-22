/* eslint no-process-env: 0 */

import dotenv from 'dotenv';

import Logger from '@/utils/Logger';

dotenv.config();
export const fetchLoginCode = async (userEmail: string) => {
  Logger.info({ namespace: 'tests.utils' }, `Fetching login code for user ${userEmail}`);
  const splitEmail: string[] = userEmail.split('@')[0].split('.');
  const APIKEY = process.env.TEST_EMAIL_APP_API_KEY;
  const NAMESPACE = splitEmail[0];
  const TAG = splitEmail[1];
  const result = await fetch(
    `${
      process.env.TEST_EMAIL_APP_API_URL
    }/api/json?apikey=${APIKEY}&namespace=${NAMESPACE}&tag=${TAG}&limit=1&livequery=true&timestamp_from=${Date.now()}`
  ).then(r => r.json());
  if (result.emails.length === 0) {
    throw new Error(`No emails received for user ${userEmail}`);
  }
  let loginCode: string | null = null;
  try {
    loginCode = result.emails[0].text.split('Your verification code is: ')[1].split('\n')[0];
  } catch (e: any) {
    throw new Error('No login code found in email');
  }
  Logger.info(
    { namespace: 'tests.utils', developerOnly: true },
    `Code fetched succesfully: ${loginCode}`
  );
  return loginCode;
};
