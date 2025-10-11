export interface NavLink {
  label: string;
  href: string;
  match: "exact" | "startsWith";
  matchPath?: string;
}
