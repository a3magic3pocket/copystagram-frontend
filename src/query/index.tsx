"use client";

import useDefaultErrorHandler from "@/hook/useDefaultErrorHandler";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultErrorHandler = useDefaultErrorHandler();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
      },
      mutations: {
        onError: defaultErrorHandler,
      },
    },
    queryCache: new QueryCache({
      onError: defaultErrorHandler,
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
