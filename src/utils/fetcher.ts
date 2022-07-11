export type TFetcherOptions = {
  url: string;
  payload?: Record<string, unknown>;
};

const fetcher = async <T>({ url, payload }: TFetcherOptions): Promise<T> => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: payload ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
    },
    ...(payload && { body: JSON.stringify(payload) }),
  });

  return (await data.json()) as T;
};

export default fetcher;
