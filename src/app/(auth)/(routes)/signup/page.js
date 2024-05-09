
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sign from "../../_component/Signup";
import Login from "../../_component/Login";


const Signup = () => {
  return (
    <div className="h-[100vh] w-[100%] flex items-center justify-center">
     
       <div className="mt-[15px] shadow-lg flex items-center justify-center h-[400px] w-[500px]">
        <Tabs defaultValue="Signup">
          <TabsList className="bg-cyan-500">
            <TabsTrigger className="text-white" value="Signup">Signup</TabsTrigger>
            <TabsTrigger  className="text-white" value="Signin">Signin</TabsTrigger>
          </TabsList>
          <TabsContent className="mt-[15px]" value="Signup">
            Here is a registration form.
            <Sign />
          </TabsContent>
          <TabsContent  className="mt-[15px]" value="Signin">Here is a Login form.
          <Login />
          </TabsContent>
        </Tabs>
        </div>
      
    </div>
  );
};

export default Signup;
