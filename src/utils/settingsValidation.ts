import { MAX_NUMBER_OF_LEVELS } from '@/config/constants';

export const validateNumberOfLevels = (levelsStr: string): boolean => {
  const levels = parseInt(levelsStr, 10);
  if (levels > 0 && Number.isInteger(levels) && levels < MAX_NUMBER_OF_LEVELS) {
    return true;
  }
  return false;
};
