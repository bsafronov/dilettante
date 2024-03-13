import { Navbar } from "./_components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex p-4 gap-4">
      <Navbar />
      <main className="grow">{children}</main>
    </div>
  );
}
