"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { FormInput } from "@/components/form/form-input";
import Image from "next/image";
import { useState } from "react";
import { loginSchema } from "../schema";
import { Spinner } from "@/components/ui/spinner";
import { useLogin } from "../hooks/use-login";

export function LoginForm({ className, ...props }) {
  const mutation = useLogin();
  const [errors, setErrors] = useState({});
  const [loginPayload, setLoginPayload] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse(loginPayload);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    mutation.mutate(loginPayload);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <FieldGroup className="gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Selamat Datang Kembali</h1>
                <p className="text-muted-foreground text-balance">
                  Masukkan email dan password untuk masuk ke akun Anda
                </p>
              </div>
              <FormInput
                label="Email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={loginPayload.email}
                onChange={(e) =>
                  setLoginPayload((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                error={errors?.email?.[0]}
              />

              <FormInput
                label="Password"
                name="password"
                type="password"
                required
                value={loginPayload.password}
                onChange={(e) =>
                  setLoginPayload((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                error={errors?.password?.[0]}
              />

              <Field>
                <Button disabled={mutation.isPending} type="submit">
                  {mutation.isPending ? <Spinner /> : "Login"}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Belum memiliki akun? <a href="/register">Daftar</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="../images/food-hero.jpeg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover "
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
