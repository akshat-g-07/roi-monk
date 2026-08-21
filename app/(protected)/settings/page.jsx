import { auth } from "@clerk/nextjs/server";
import Currency from "@/components/settings/currency";

export default async function Page() {
  await auth.protect();

  return (
    <>
      <div className="size-full space-y-4">
        <Currency />
      </div>
    </>
  );
}
