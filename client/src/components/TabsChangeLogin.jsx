import LoginForm from "@/components/LoginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuth from "@/context/AuthContext";
export default function TabsChange() {
  const { login } = useAuth();
  const studentLogin = async ({ email, password }) => {
    const res = await login(email, password, "student");
    console.log(res);
  };

  const teacherLogin = async ({ email, password }) => {
    await login(email, password, "teacher");
  };

  return (
    <Tabs defaultValue="student" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2 bg-secondary-foreground/30 text-accent">
        <TabsTrigger value="student">Student</TabsTrigger>
        <TabsTrigger value="teacher">Teacher</TabsTrigger>
      </TabsList>
      <TabsContent value="student">
        <LoginForm description="Login as Student" onSubmit={studentLogin} />
      </TabsContent>
      <TabsContent value="teacher">
        <LoginForm description="Login as Teacher" onSubmit={teacherLogin} />
      </TabsContent>
    </Tabs>
  );
}
