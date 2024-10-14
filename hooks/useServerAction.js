"use client";

import { useState, useEffect } from "react";

export function useServerAction(actionName, params) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function executeServerAction() {
    setError(null);
    try {
      const response = await actionName(...params);
      setData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    executeServerAction();
  }, [actionName, JSON.stringify(params)]);

  return { isLoading, data, error };
}
