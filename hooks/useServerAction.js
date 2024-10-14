"use client";

import { useState, useEffect, useCallback } from "react";

export function useServerAction(actionName, ...params) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const executeServerAction = useCallback(async () => {
    setError(null);
    try {
      const response = await actionName(...params);
      if (response.data) setData(response.data);
      else setError(response.message);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [actionName, ...params]);

  useEffect(() => {
    executeServerAction();
  }, [executeServerAction]);

  return { isLoading, data, error, refetch: executeServerAction };
}
