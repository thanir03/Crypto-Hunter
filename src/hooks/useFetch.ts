import { AxiosError } from "axios";
import React, { useState, useCallback } from "react";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const handleError = useCallback((error: AxiosError) => {
    setError(error);
    setLoading(false);
  }, []);
  const handleLoading = useCallback(() => {
    setLoading(true);
    setError(null);
  }, []);

  const handleSuccess = useCallback(() => {
    setLoading(false);
    setError(null);
  }, []);

  return {
    loading,
    error,
    handleLoading,
    handleSuccess,
    handleError,
  };
};

export { useFetch };
