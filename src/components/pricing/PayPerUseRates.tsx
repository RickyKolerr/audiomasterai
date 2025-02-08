
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PayPerUseRate {
  id: string;
  name: string;
  type: string;
  base_rate: number;
  bulk_discount_rate: number | null;
  bulk_discount_threshold: number | null;
}

const PayPerUseRates = () => {
  const { data: rates, isLoading } = useQuery({
    queryKey: ['pay-per-use-rates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pay_per_use_rates')
        .select('*')
        .order('base_rate');
      
      if (error) throw error;
      return data as PayPerUseRate[];
    },
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-gray-800/50 rounded-lg" />
        ))}
      </div>
    );
  }

  const groupedRates = rates?.reduce((acc, rate) => {
    const type = rate.type as keyof typeof acc;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(rate);
    return acc;
  }, {} as Record<string, PayPerUseRate[]>);

  return (
    <div className="space-y-8">
      {Object.entries(groupedRates || {}).map(([type, typeRates]) => (
        <div key={type} className="space-y-4">
          <h3 className="text-xl font-semibold capitalize">
            {type} Conversion Rates
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {typeRates.map((rate) => (
              <Card key={rate.id} className="p-6 bg-black/50 border-green-500/20">
                <h4 className="text-lg font-medium mb-2">{rate.name}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Base Rate</span>
                    <span className="font-semibold">${rate.base_rate}/unit</span>
                  </div>
                  {rate.bulk_discount_rate && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-gray-400 mr-1">Bulk Rate</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Applied when converting {rate.bulk_discount_threshold}+ units</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <span className="font-semibold text-green-500">
                        ${rate.bulk_discount_rate}/unit
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
          <Separator className="bg-gray-800" />
        </div>
      ))}
    </div>
  );
};

export default PayPerUseRates;
