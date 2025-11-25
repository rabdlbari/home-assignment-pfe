import { SignIn } from "@clerk/nextjs";

export default async function LoginPage() {
  return (
    <main className="flex justify-center items-center h-full">
      <SignIn />
    </main>
  );
}
