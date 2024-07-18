import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="p-6">
      <h1>hello there</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
