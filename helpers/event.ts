type MetaType = string | null;
export function formatMetas(...metas: MetaType[]): string[] {
  return metas.filter((meta): meta is string => meta !== null);
};
