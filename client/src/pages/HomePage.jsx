import PendingRequest from "@/components/PendingRequest";
import CompleteRequest from "@/components/CompletedRequest";

export default function HomePage() {
  return (
    <div className="h-full w-full">
      <h1>Pending Requests</h1>
      <PendingRequest />
      <h1>Completed Requests</h1>
      <CompleteRequest/>
    </div>
  );
}
