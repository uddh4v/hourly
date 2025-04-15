/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
//

type SignupFormProps = React.ComponentProps<"form"> & {
  onSwitchToLogin: () => void;
};
export function SignupForm({
  className,
  onSwitchToLogin,
  ...props
}: SignupFormProps) {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState<string | null>(null);
  //   const navigate = useNavigate();

  //   const handleLogin = async (e: any) => {
  //     e.preventDefault();
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const response = await loginUser({ email, password });
  //       console.log(response);
  //       if (response) {
  //         localStorage.setItem("userId", response.userId);
  //         navigate("/dashboard");

  //         toast.success(response.status, {
  //           description: response.message,
  //         });
  //       }
  //     } catch (err: any) {
  //       toast.error(err?.response?.data?.status || "Login failed", {
  //         description: err?.response?.data?.message || "Login failed",
  //       });
  //       setError(err?.response?.data?.message || "Login failed");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      //   onSubmit={handleLogin}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create a Account</h1>
        <p className="text-muted-foreground text-sm whitespace-nowrap">
          <p>Let's get started</p>Fill in the details below to create your
          account.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="flex gap-4">
          <div className="w-1/2 grid gap-3">
            <Label htmlFor="firstname">Firstname</Label>
            <Input id="firstname" type="text" placeholder="John" required />
          </div>
          <div className="w-1/2 grid gap-3">
            <Label htmlFor="lastname">Lastname</Label>
            <Input id="lastname" type="text" placeholder="Doe" required />
          </div>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="role">Role</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Role</SelectLabel>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>

        <Button type="submit" className="w-full">
          Signup
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have account?
        <a
          href="#"
          className="underline underline-offset-4"
          onClick={onSwitchToLogin}
        >
          &nbsp;Log in
        </a>
      </div>
    </form>
  );
}
