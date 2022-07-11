import { useCallback, useState } from "react";

type TUseSimulatedPromiseConfig = {
  delay: number;
  forceError?: boolean;
  resolvedMessage?: string;
  extraCallback?: () => void;
};

export const useSimulatedPromise = (config: TUseSimulatedPromiseConfig) => {
  const { delay, forceError = false, resolvedMessage, extraCallback } = config;

  const [isPending, setIsPending] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [reRenderCount, setReRenderCount] = useState(0);
  const [value, setValue] = useState("");

  const resolve = useCallback((value: string) => {
    setIsPending(false);
    setIsResolved(true);
    setIsRejected(false);
    setError(null);
    setValue(value);
  }, []);

  const reject = useCallback((error: Error) => {
    setIsPending(false);
    setIsResolved(false);
    setIsRejected(true);
    setError(error);
  }, []);

  const simulatePromise = useCallback(async () => {
    setIsPending(true);
    setIsResolved(false);
    setIsRejected(false);
    setError(null);

    try {
      const data = await new Promise((resolve, reject) => {
        if (forceError) {
          setTimeout(() => {
            reject(new Error("Simulated error"));
          }, delay);
        }

        setTimeout(() => {
          resolve(resolvedMessage || "Simulation completed!");
        }, delay);

        /*
         * NOTE: Again this is not intended to (and should NOT) be used in a real app
         * This is just a demo!
         */
      });

      resolve(data as string);

      if (extraCallback) {
        extraCallback();
      }
    } catch (err) {
      reject(err as Error);
    }

    setReRenderCount(reRenderCount + 1);
  }, [delay, extraCallback, forceError, reRenderCount, reject, resolve, resolvedMessage]);

  return {
    simulatePromise,
    reRenderCount,
    isPending,
    isResolved,
    isRejected,
    error,
    resolve,
    reject,
    value,
  };
};
