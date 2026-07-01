export type Dictionary = Record<string, string>;
export type TFunction = (key: string, vars?: Record<string, string | number>) => string;

export function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name) =>
    name in vars ? String(vars[name]) : match
  );
}

export function makeT(dict: Dictionary): TFunction {
  return (key, vars) => interpolate(dict[key] ?? key, vars);
}
