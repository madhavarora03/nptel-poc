import PendingRequest from "@/components/PendingRequest";

export default function HomePage() {
  return (
    <div className="h-full w-full">
      <h1>Pending Validation Requests</h1>
      <PendingRequest />
    </div>
  );
}
