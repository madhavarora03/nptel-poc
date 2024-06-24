import PendingRequest from "@/components/PendingRequest";

export default function HomePage() {
  return (
    <div className="h-full w-full">
      <h1 className="text-4xl py-2">Pending Validation Requests</h1>
      <PendingRequest />
    </div>
  );
}
