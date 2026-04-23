import { MemberShell } from "@/components/layout/MemberShell";

export const metadata = {
  title: "Member dashboard",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <MemberShell>{children}</MemberShell>;
}
