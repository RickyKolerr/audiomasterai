import { useQuery } from "@tanstack/react-query";

export const checkElevenLabsStatus = async () => {
  // Mock API check - replace with real API call later
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: "active" });
    }, 1000);
  });
};

export const useElevenLabsStatus = () => {
  return useQuery({
    queryKey: ["elevenlabs-status"],
    queryFn: checkElevenLabsStatus,
  });
};