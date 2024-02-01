import { MAX_NUMBER_OF_LEVELS } from '@/config/constants';

export const validateNumberOfLevels = (levels: number): boolean => {
  if (levels > 1 && Number.isInteger(levels) && levels < MAX_NUMBER_OF_LEVELS) {
    return true;
  }
  return false;
};
