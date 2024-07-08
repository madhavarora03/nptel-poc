import LoginForm from "@/components/LoginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuth from "@/context/AuthContext";
import { useToast } from "./ui/use-toast";
export default function TabsChange() {
  const { login } = useAuth();
  const { toast } = useToast();

  const studentLogin = async ({ email, password }) => {
    try {
      await login(email, password, "student");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  const teacherLogin = async ({ email, password }) => {
    try {
      await login(email, password, "teacher");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Tabs defaultValue="student" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2 bg-secondary-foreground/30 text-accent">
        <TabsTrigger value="student">Student</TabsTrigger>
        <TabsTrigger value="teacher">Faculty</TabsTrigger>
      </TabsList>
      <TabsContent value="student">
        <LoginForm description="Login as Student" onSubmit={studentLogin} />
      </TabsContent>
      <TabsContent value="teacher">
        <LoginForm description="Login as Faculty" onSubmit={teacherLogin} />
      </TabsContent>
    </Tabs>
  );
}
