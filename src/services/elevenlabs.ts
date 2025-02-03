import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Voice {
  voice_id: string;
  name: string;
  preview_url?: string;
}

export const defaultVoices: Voice[] = [
  { voice_id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah" },
  { voice_id: "TX3LPaxmHKxFdv7VOQHJ", name: "Liam" },
  { voice_id: "pFZP5JQG7iQjIQuC4Bku", name: "Lily" },
];

export const useVoices = () => {
  return useQuery({
    queryKey: ['voices'],
    queryFn: getVoices,
  });
};

export const synthesizeSpeech = async (text: string, voiceId: string = defaultVoices[0].voice_id) => {
  try {
    const { data, error } = await supabase.functions.invoke("text-to-speech", {
      body: { text, voiceId }
    });

    if (error) throw error;

    return URL.createObjectURL(
      new Blob([data], { type: 'audio/mpeg' })
    );
  } catch (error) {
    console.error("Error synthesizing speech:", error);
    throw error;
  }
};

export const getVoices = async (): Promise<Voice[]> => {
  try {
    const { data, error } = await supabase
      .from('premium_voices')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || defaultVoices;
  } catch (error) {
    console.error("Error fetching voices:", error);
    return defaultVoices;
  }
};

export const checkElevenLabsStatus = async () => {
  try {
    const { data, error } = await supabase.functions.invoke("text-to-speech", {
      body: { text: "Test", voiceId: defaultVoices[0].voice_id }
    });
    return !error;
  } catch {
    return false;
  }
};