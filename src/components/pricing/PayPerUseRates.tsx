
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";

interface PayPerUseRate {
  id: string;
  name: string;
  description: string;
  rate: number;
  type: string;
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
    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {groupedRates?.voice && (
        <Card className="p-6 rounded-xl bg-black/50 border border-green-500/20">
          <h3 className="text-lg font-semibold mb-2">Voice Customization</h3>
          <p className="text-gray-400 mb-4">Enhance your audio with premium voices</p>
          <ul className="text-sm text-gray-300">
            {groupedRates.voice.map((rate) => (
              <li key={rate.id}>{rate.name}: ${rate.rate}</li>
            ))}
          </ul>
        </Card>
      )}
      {groupedRates?.storage && (
        <Card className="p-6 rounded-xl bg-black/50 border border-green-500/20">
          <h3 className="text-lg font-semibold mb-2">Storage & Downloads</h3>
          <p className="text-gray-400 mb-4">Additional storage space</p>
          <ul className="text-sm text-gray-300">
            {groupedRates.storage.map((rate) => (
              <li key={rate.id}>${rate.rate} per 1GB</li>
            ))}
            <li>Beyond free plan limit</li>
          </ul>
        </Card>
      )}
      <Card className="p-6 rounded-xl bg-black/50 border border-green-500/20">
        <h3 className="text-lg font-semibold mb-2">Bulk Discounts</h3>
        <p className="text-gray-400 mb-4">Save more with volume</p>
        <ul className="text-sm text-gray-300">
          <li>Contact sales for</li>
          <li>custom pricing</li>
        </ul>
      </Card>
    </div>
  );
};

export default PayPerUseRates;
