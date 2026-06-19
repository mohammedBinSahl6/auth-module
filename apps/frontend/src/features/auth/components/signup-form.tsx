import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupInput } from "../schemas/auth-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../api/auth-api";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

export const SignupForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      login(data.user);
      navigate("/app");
    },
    onError: (error: unknown) => {
      const axiosError = error as { response?: { data?: { message?: string } } };
      setErrorMessage(axiosError.response?.data?.message || "An error occurred during signup");
    },
  });

  const onSubmit = (data: SignupInput) => {
    setErrorMessage(null);
    mutate(data);
  };

  return (
    <Card className="glass border-white/10 shadow-2xl w-[400px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight text-white">Create Account</CardTitle>
        <CardDescription className="text-zinc-400">
          Get started with your new account today.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-zinc-300">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              className="bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-600 focus:ring-primary/50"
              {...register("name")}
            />
            {errors.name && (
              <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-rose-500">
                {errors.name.message}
              </motion.p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-300">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-600 focus:ring-primary/50"
              {...register("email")}
            />
            {errors.email && (
              <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-rose-500">
                {errors.email.message}
              </motion.p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" title="Password" className="text-zinc-300">Password</Label>
            <Input
              id="password"
              type="password"
              className="bg-zinc-900/50 border-white/10 text-white focus:ring-primary/50"
              {...register("password")}
            />
            {errors.password && (
              <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-rose-500">
                {errors.password.message}
              </motion.p>
            )}
          </div>
          {errorMessage && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-medium text-rose-500 text-center">
              {errorMessage}
            </motion.p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-white transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]" 
            disabled={isPending}
          >
            {isPending ? "Creating account..." : "Sign Up"}
          </Button>
          <p className="text-xs text-center text-zinc-500">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
};
