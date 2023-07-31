type MetaType = string | null | undefined;

export function formatMetas(...metas: MetaType[]): string[] {
  return metas.filter((meta): meta is string => !!meta);
};
