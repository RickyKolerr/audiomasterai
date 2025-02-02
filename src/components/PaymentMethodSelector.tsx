import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { Card } from "@/components/ui/card";

interface PaymentMethodSelectorProps {
  onSelect: (method: string) => void;
  selectedMethod: string;
}

export const PaymentMethodSelector = ({
  onSelect,
  selectedMethod,
}: PaymentMethodSelectorProps) => {
  const paymentMethods = [
    {
      id: "card",
      name: "Credit Card",
      description: "Pay securely with your credit card",
      icon: "creditCard",
    },
    {
      id: "paypal",
      name: "PayPal",
      description: "Pay with your PayPal account",
      icon: "paypal",
    },
  ];

  return (
    <RadioGroup
      defaultValue={selectedMethod}
      onValueChange={onSelect}
      className="grid gap-4"
    >
      {paymentMethods.map((method) => (
        <div key={method.id}>
          <RadioGroupItem
            value={method.id}
            id={method.id}
            className="peer hidden"
          />
          <Label
            htmlFor={method.id}
            className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-background p-2">
                  {Icons[method.icon as keyof typeof Icons]?.({})}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {method.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {method.description}
                  </p>
                </div>
              </div>
            </div>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};