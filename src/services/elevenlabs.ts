import { useQuery } from "@tanstack/react-query";

const ELEVENLABS_API_ENDPOINT = "https://api.elevenlabs.io/v1";

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

export const synthesizeSpeech = async (
  text: string,
  voiceId: string = defaultVoices[0].voice_id
) => {
  try {
    const response = await fetch(
      `${ELEVENLABS_API_ENDPOINT}/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": process.env.ELEVENLABS_API_KEY || "",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to synthesize speech");
    }

    const audioBlob = await response.blob();
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error("Error synthesizing speech:", error);
    throw error;
  }
};

export const getVoices = async (): Promise<Voice[]> => {
  try {
    const response = await fetch(`${ELEVENLABS_API_ENDPOINT}/voices`, {
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY || "",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch voices");
    }

    const data = await response.json();
    return data.voices || defaultVoices;
  } catch (error) {
    console.error("Error fetching voices:", error);
    return defaultVoices;
  }
};

export const useVoices = () => {
  return useQuery({
    queryKey: ["elevenlabs-voices"],
    queryFn: getVoices,
  });
};

export const checkElevenLabsStatus = async () => {
  try {
    const response = await fetch(`${ELEVENLABS_API_ENDPOINT}/user`, {
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY || "",
      },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const useElevenLabsStatus = () => {
  return useQuery({
    queryKey: ["elevenlabs-status"],
    queryFn: checkElevenLabsStatus,
  });
};