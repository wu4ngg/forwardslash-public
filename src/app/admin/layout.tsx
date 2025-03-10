"use client";

import SideHeader from "@/components/side_header";
import Button from "@/widgets/button";
import { Lock, Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/footer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User } from "firebase/auth";
import { logIn, logOut } from "@/firebase/auth/authentication";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import Loader from "@/widgets/loader";
import { useToast } from "@/components/toast";
import { useUser } from "@/components/user";
import Sidebar from "@/components/sidebar";
type LoginCardProps = {
  onLogin: (user: User) => void;
};
function LoginCard(props: LoginCardProps) {
  const { toast } = useToast();
  const formSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email(),
    password: z.string({ required_error: "Password is required" }).min(8),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  async function submit(data: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const user = await logIn(data.email, data.password);
      toast("Login successful", "You have successfully logged in", "success");
      props.onLogin(user);
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof FirebaseError) {
        if (error.code === "auth/invalid-credential") {
          form.setError("password", { message: "Invalid password" });
        } else if (error.code === "auth/user-not-found") {
          form.setError("email", { message: "User not found" });
        } else if (error.code === "auth/wrong-password") {
          form.setError("password", { message: "Wrong password" });
        } else {
          form.setError("email", { message: "Something went wrong" });
        }
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <motion.div
      className="w-full flex flex-col justify-center items-center"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ type: "spring", bounce: 0.25, velocity: 2, delay: 0.1 }}
    >
      <motion.div
        layout
        transition={{ type: "spring", bounce: 0.25, velocity: 2, delay: 0.2 }}
      >
        <Shield width={48} height={48} />
      </motion.div>
      <motion.h2
        layout
        transition={{ type: "spring", bounce: 0.25, velocity: 2, delay: 0.15 }}
      >
        Login
      </motion.h2>
      <motion.div
        className="border-4 border-foreground flex flex-col gap-2 p-4 w-1/2"
        layout
        transition={{ type: "spring", bounce: 0.25, velocity: 2, delay: 0.1 }}
      >
        <h3 className="text-xl">🤔 Why am I here?</h3>
        <p>
          It's a secret admin page that I use to post stuff, uhh hope there's no
          vulnerability.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="email">Email</label>
                  <FormControl>
                    <input
                      type="email"
                      id="email"
                      className="w-full"
                      placeholder="abc@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="password">Password</label>
                  <FormControl>
                    <input
                      type="password"
                      id="password"
                      className="w-full"
                      placeholder="some password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="outlined" className="justify-center" type="submit">
              {isLoading ? <Loader /> : "Login"}
            </Button>
          </form>
        </Form>
      </motion.div>
    </motion.div>
  );
}

export default function AdminHome({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useUser();
  return (
    <>
      <div className="px-8 pb-8 flex">
        <SideHeader text="Admin" />
        <AnimatePresence>
          {user && <Sidebar />}
        </AnimatePresence>
        <AnimatePresence>
          {user ? children : <LoginCard onLogin={() => {}} />}
        </AnimatePresence>
      </div>
      <Footer layout="full" />
    </>
  );
}
