import { useQuery } from "@tanstack/react-query";

export const checkOpenAIStatus = async () => {
  // Mock API check - replace with real API call later
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: "active" });
    }, 1000);
  });
};

export const useOpenAIStatus = () => {
  return useQuery({
    queryKey: ["openai-status"],
    queryFn: checkOpenAIStatus,
  });
};