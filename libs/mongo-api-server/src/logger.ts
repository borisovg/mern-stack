import { ecsFormat } from '@elastic/ecs-pino-format';
import { pino } from 'pino';
import { config } from './modules/config';

const opts = {
  ...config.logger.pinoOptions,
  ...ecsFormat({}),
  level: config.logger.level,
};

export const logger = pino(opts);
