"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { FormInput } from "@/components/form/form-input";
import { registerSchema } from "../schema";
import { Spinner } from "@/components/ui/spinner";
import { useRegister } from "../hooks/use-register";
import { useState } from "react";

export function RegisterForm({ className, ...props }) {
  const mutation = useRegister();
  const [errors, setErrors] = useState({});
  const [registerPayload, setRegisterPayload] = useState({
    email: "",
    password: "",
    fullname: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = registerSchema.safeParse(registerPayload);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    const { confirmPassword, ...dataToSubmit } = registerPayload;
    mutation.mutate(dataToSubmit);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <FieldGroup className="gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Buat Akun Anda</h1>
                <p className="text-muted-foreground text-balance">
                  Lengkapi data dibawah ini untuk membuat akun
                </p>
              </div>
              <FormInput
                label="Email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={registerPayload.email}
                onChange={(e) =>
                  setRegisterPayload((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                error={errors?.email?.[0]}
              />
              <FormInput
                label="Full Name"
                name="fullname"
                type="text"
                placeholder="John Doe"
                required
                value={registerPayload.fullname}
                onChange={(e) =>
                  setRegisterPayload((prev) => ({
                    ...prev,
                    fullname: e.target.value,
                  }))
                }
                error={errors?.fullname?.[0]}
              />

              <FormInput
                label="Password"
                name="password"
                type="password"
                required
                value={registerPayload.password}
                onChange={(e) =>
                  setRegisterPayload((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                error={errors?.password?.[0]}
              />

              {/* Confirm Password - Baru */}
              <FormInput
                label="Konfirmasi Password"
                name="confirmPassword"
                type="password"
                required
                value={registerPayload.confirmPassword}
                onChange={(e) =>
                  setRegisterPayload((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                error={errors?.confirmPassword?.[0]}
              />

              <Field>
                <Button disabled={mutation.isPending} type="submit">
                  {mutation.isPending ? <Spinner /> : "Register"}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Sudah Memiliki Akun? <a href="/login">Masuk</a>
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
