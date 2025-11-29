import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for fetching data from API
 * @param {string} url - API endpoint URL
 * @param {object} options - Fetch options
 * @returns {object} - { data, loading, error, refetch }
 */
const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    method = 'GET',
    body = null,
    headers = {},
    dependencies = [],
    skip = false,
    onSuccess = null,
    onError = null
  } = options;

  const fetchData = useCallback(async () => {
    if (skip) return;

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const defaultHeaders = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...headers
      };

      const fetchOptions = {
        method,
        headers: defaultHeaders,
        ...(body && { body: JSON.stringify(body) })
      };

      const response = await fetch(url, fetchOptions);
      const result = await response.json();

      if (response.ok) {
        setData(result);
        if (onSuccess) onSuccess(result);
      } else {
        const errorMessage = result.message || 'An error occurred';
        setError(errorMessage);
        if (onError) onError(errorMessage);
      }
    } catch (err) {
      const errorMessage = err.message || 'Network error occurred';
      setError(errorMessage);
      if (onError) onError(errorMessage);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [url, method, body, headers, skip, onSuccess, onError]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

/**
 * Hook for GET requests
 */
export const useGet = (url, dependencies = []) => {
  return useFetch(url, { method: 'GET', dependencies });
};

/**
 * Hook for POST requests
 */
export const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const post = useCallback(async (url, body, customHeaders = {}) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...customHeaders
      };

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        const errorMessage = data.message || 'Request failed';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage = err.message || 'Network error';
      setError(errorMessage);
      console.error('POST error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return { post, loading, error };
};

/**
 * Hook for PUT requests
 */
export const usePut = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const put = useCallback(async (url, body, customHeaders = {}) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...customHeaders
      };

      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        const errorMessage = data.message || 'Request failed';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage = err.message || 'Network error';
      setError(errorMessage);
      console.error('PUT error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return { put, loading, error };
};

/**
 * Hook for DELETE requests
 */
export const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const del = useCallback(async (url, customHeaders = {}) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...customHeaders
      };

      const response = await fetch(url, {
        method: 'DELETE',
        headers
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        const errorMessage = data.message || 'Delete failed';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage = err.message || 'Network error';
      setError(errorMessage);
      console.error('DELETE error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return { delete: del, loading, error };
};

/**
 * Hook for handling form submissions
 */
export const useFormSubmit = (url, options = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submit = useCallback(async (formData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      };

      const response = await fetch(url, {
        method: options.method || 'POST',
        headers,
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        if (options.onSuccess) options.onSuccess(data);
        return { success: true, data };
      } else {
        const errorMessage = data.message || 'Submission failed';
        setError(errorMessage);
        if (options.onError) options.onError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage = err.message || 'Network error';
      setError(errorMessage);
      if (options.onError) options.onError(errorMessage);
      console.error('Form submission error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return { submit, loading, error, success, reset };
};

/**
 * Hook for infinite scroll/pagination
 */
export const usePagination = (url, limit = 10) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      };

      const response = await fetch(`${url}?page=${page}&limit=${limit}`, {
        headers
      });

      const result = await response.json();

      if (response.ok) {
        setData(prev => [...prev, ...result.data]);
        setHasMore(result.hasMore);
        setPage(prev => prev + 1);
      } else {
        setError(result.message || 'Failed to load data');
      }
    } catch (err) {
      setError(err.message || 'Network error');
      console.error('Pagination error:', err);
    } finally {
      setLoading(false);
    }
  }, [url, page, limit, loading, hasMore]);

  const reset = useCallback(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, []);

  return { data, loading, hasMore, error, loadMore, reset };
};

export default useFetch;