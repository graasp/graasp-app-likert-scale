export type LikertItemKey = string;

export interface LikertItem {
  key: LikertItemKey;
  label: string;
  secondLabel?: string;
}

export const getNewLikertItem = (answer?: Partial<LikertItem>): LikertItem => ({
  key: answer?.key ?? '0',
  label: answer?.label ?? '',
});
