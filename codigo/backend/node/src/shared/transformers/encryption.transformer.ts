import { EncryptionTransformer } from 'typeorm-encrypted';
import * as dotenv from 'dotenv';

import configuration from 'src/configuration/configuration';

dotenv.config();

const config = configuration();

export const encryptionTransformer = new EncryptionTransformer({
  key: config.encryption.key,
  iv: config.encryption.iv,
  algorithm: 'aes-256-cbc',
  ivLength: 16,
});
