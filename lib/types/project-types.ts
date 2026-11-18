// lib/project-types.ts
export const projectTypeItems = [
  { value: "installation", label: "Drywall Installation" },
  { value: "taping", label: "Taping & Finishing" },
  { value: "repair", label: "Repairs & Patching" },
  { value: "other", label: "Other" },
];

export function getProjectTypeLabel(value: string) {
  return projectTypeItems.find((item) => item.value === value)?.label ?? null;
}