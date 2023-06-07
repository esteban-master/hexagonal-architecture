import { registerAs } from '@nestjs/config';

export default registerAs('GCPEnv', () => ({
  PROJECT_ID: process.env.PROJECT_ID,
  BUCKET_NAME: process.env.BUCKET_NAME,
}));
