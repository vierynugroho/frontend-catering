"use client";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardTitle } from "@/components/ui/card";

import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useUpdateProfile } from "../hooks/use-update-profile";
import { profileSchema } from "../schema";

export function UpdateProfiles({ className, ...props }) {
  const route = useRouter();
  const { data: userData } = useCurrentUser();
  const mutation = useUpdateProfile();
  const [errors, setErrors] = useState({});
  const [profilePayload, setProfilePayload] = useState({
    email: userData?.email || "",
    fullname: userData?.fullname || "",
    phone: userData?.phone || "",
    address: userData?.address || "",
    password: "",
    confirm_password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = profileSchema.safeParse(profilePayload);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors(fieldErrors);
      return;
    }

    const payload = {
      email: profilePayload?.email,
      fullname: profilePayload?.fullname,
      phone: profilePayload?.phone,
      address: profilePayload?.address,
      ...(profilePayload.password && {
        password: profilePayload.password,
        confirm_password: profilePayload.confirm_password,
      }),
    };

    mutation.mutate(payload);
  };

  return (
    <div className={cn("max-w-2xl mx-auto", className)} {...props}>
      <h1 className="mb-4 font-semibold text-2xl">Profile</h1>
      <Card className="overflow-hidden p-6">
        <CardTitle>Edit Profile</CardTitle>
        <CardContent className="grid gap-4 p-0 grid-cols-1">
          <div className="flex items-start w-full gap-4">
            <Avatar className="h-16 w-16 rounded-lg grayscale">
              <AvatarImage
                src="/avatars/shadcn.jpg"
                alt="/avatars/shadcn.jpg"
              />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate text-base font-medium">
                {userData?.fullname}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {userData?.email || ""}
              </span>
            </div>
          </div>
          <Separator></Separator>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Email"
              name="email"
              type="email"
              placeholder="m@example.com"
              onChange={(e) =>
                setProfilePayload((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              value={profilePayload?.email}
              error={errors?.email?.[0]}
            />
            <FormInput
              label="Nama Lengkap"
              name="fullname"
              type="text"
              placeholder="John doe"
              onChange={(e) =>
                setProfilePayload((prev) => ({
                  ...prev,
                  fullname: e.target.value,
                }))
              }
              value={profilePayload?.fullname}
              error={errors?.fullname?.[0]}
            />

            <FormInput
              label="Nomor Telepon"
              name="phone"
              type="number"
              placeholder="089"
              onChange={(e) =>
                setProfilePayload((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              value={profilePayload?.phone}
              error={errors?.phone?.[0]}
            />
            <FormInput
              label="Alamat"
              name="address"
              type="text"
              placeholder="Alamat lengkap"
              onChange={(e) =>
                setProfilePayload((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              value={profilePayload?.address}
              error={errors?.address?.[0]}
            />
            <FormInput
              label="Password"
              name="password"
              type="password"
              onChange={(e) =>
                setProfilePayload((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              value={profilePayload?.password}
              error={errors?.password?.[0]}
            />
            <FormInput
              label="Konfirmasi Password"
              name="confirm_password"
              type="password"
              onChange={(e) =>
                setProfilePayload((prev) => ({
                  ...prev,
                  confirm_password: e.target.value,
                }))
              }
              value={profilePayload?.confirm_password}
              error={errors?.confirm_password?.[0]}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={() => route.push("/")}>
              Batal
            </Button>
            <Button
              disabled={mutation.isPending}
              onClick={(e) => handleSubmit(e)}
              size="sm"
            >
              {mutation.isPending ? (
                <>
                  Simpan
                  <Spinner />
                </>
              ) : (
                "Simpan"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
