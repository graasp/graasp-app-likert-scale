import { LikertItem } from '@/interfaces/likertItem';

export enum LabelPosition {
  Top = 'top',
  Left = 'left',
  Right = 'right',
  Bottom = 'bottom',
  Ends = 'ends',
}

export type LevelsSettings = {
  levels: number;
  labels: Map<number, string>;
};

export type LikertItemSettings = {
  item: LikertItem;
  labelPosition?: LabelPosition;
};

export type GeneralSettings = {
  required: boolean;
};
