export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export abstract class DefaultModel {
  createdAt: Date;
  createdBy: string | null;
  updatedAt: Date | null;
  updatedBy: string | null;
  deletedAt: Date | null;
  deletedBy: string | null;
}
