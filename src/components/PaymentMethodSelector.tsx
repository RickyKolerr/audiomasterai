import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, DollarSign } from "lucide-react";
import { APIStatusBadge } from "./APIStatusBadge";
import { useOpenAIStatus } from "@/services/openai";
import { useElevenLabsStatus } from "@/services/elevenlabs";
import { Card } from "./ui/card";

interface PaymentMethodSelectorProps {
  onSelect: (method: string) => void;
  selectedMethod: string;
}

export const PaymentMethodSelector = ({
  onSelect,
  selectedMethod,
}: PaymentMethodSelectorProps) => {
  const { isLoading: isLoadingOpenAI, isError: isErrorOpenAI } = useOpenAIStatus();
  const { isLoading: isLoadingElevenLabs, isError: isErrorElevenLabs } = useElevenLabsStatus();

  const paymentMethods = [
    {
      id: "card",
      name: "Credit Card",
      description: "Pay securely with your credit card",
      icon: CreditCard,
    },
    {
      id: "paypal",
      name: "PayPal",
      description: "Pay with your PayPal account",
      icon: DollarSign,
    },
  ];

  return (
    <Card className="p-6 bg-black/50 border-green-500/20">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <APIStatusBadge 
            name="OpenAI" 
            isLoading={isLoadingOpenAI}
            isError={isErrorOpenAI}
          />
          <APIStatusBadge 
            name="ElevenLabs" 
            isLoading={isLoadingElevenLabs}
            isError={isErrorElevenLabs}
          />
        </div>

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
                      <method.icon className="h-5 w-5" />
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
      </div>
    </Card>
  );
};