import Currency from "@/components/settings/currency";
import Subscription from "@/components/settings/subscription";

export default function Page() {
  return (
    <>
      <div className="size-full space-y-4">
        <Currency />
        <Subscription />
      </div>
    </>
  );
}
