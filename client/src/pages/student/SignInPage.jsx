import LoginForm from "@/components/LoginForm";
import LoginHeader from "@/components/LoginHeader";
export default function StudentLoginPage() {
  const handleSubmit = async () => {
    console.log("Submitted!");
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#EE0050] to-[#00A6CB]">
      <LoginHeader />
      <LoginForm description="Login as a student" onSubmit={handleSubmit} />
    </div>
  );
}
