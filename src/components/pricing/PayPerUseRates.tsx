
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PayPerUseRate {
  id: string;
  name: string;
  type: string;
  rate: number;
  description: string | null;
  created_at: string | null;
  updated_at: string | null;
}

const PayPerUseRates = () => {
  const { data: rates, isLoading } = useQuery({
    queryKey: ['pay-per-use-rates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pay_per_use_rates')
        .select('*')
        .order('rate');
      
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
                {rate.description && (
                  <p className="text-sm text-gray-400 mb-4">{rate.description}</p>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Rate</span>
                  <span className="font-semibold">${rate.rate}/unit</span>
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
