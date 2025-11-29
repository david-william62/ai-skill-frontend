import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook to debounce a value
 * @param {any} value - Value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {any} - Debounced value
 */
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook to debounce a callback function
 * @param {function} callback - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {function} - Debounced callback
 */
export const useDebouncedCallback = (callback, delay = 500) => {
  const timeoutRef = useRef(null);

  const debouncedCallback = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};

/**
 * Hook for debounced search
 * @param {string} initialValue - Initial search value
 * @param {function} onSearch - Search callback
 * @param {number} delay - Delay in milliseconds
 */
export const useDebouncedSearch = (initialValue = '', onSearch, delay = 500) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  useEffect(() => {
    if (debouncedSearchTerm !== initialValue) {
      setIsSearching(true);
      onSearch(debouncedSearchTerm);
      setIsSearching(false);
    }
  }, [debouncedSearchTerm, onSearch, initialValue]);

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    isSearching
  };
};

/**
 * Hook for debounced input with instant feedback
 */
export const useDebouncedInput = (initialValue = '', delay = 500) => {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    setIsDebouncing(true);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return {
    value,
    setValue,
    debouncedValue,
    isDebouncing
  };
};

/**
 * Hook for throttle (limit frequency of function calls)
 * @param {function} callback - Function to throttle
 * @param {number} delay - Minimum delay between calls
 */
export const useThrottle = (callback, delay = 500) => {
  const lastRun = useRef(Date.now());

  const throttledCallback = useCallback((...args) => {
    const timeElapsed = Date.now() - lastRun.current;

    if (timeElapsed >= delay) {
      callback(...args);
      lastRun.current = Date.now();
    }
  }, [callback, delay]);

  return throttledCallback;
};

/**
 * Hook for debounced API call
 */
export const useDebouncedApi = (apiCall, delay = 500) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);

  const debouncedCall = useCallback(async (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setLoading(true);

    timeoutRef.current = setTimeout(async () => {
      try {
        setError(null);
        const result = await apiCall(...args);
        setData(result);
      } catch (err) {
        setError(err.message || 'API call failed');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    }, delay);
  }, [apiCall, delay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { debouncedCall, loading, data, error };
};

/**
 * Hook for window resize with debounce
 */
export const useDebouncedWindowSize = (delay = 250) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    let timeoutId;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }, delay);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return windowSize;
};

/**
 * Hook for scroll with debounce
 */
export const useDebouncedScroll = (callback, delay = 250) => {
  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback({
          scrollY: window.scrollY,
          scrollX: window.scrollX
        });
      }, delay);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [callback, delay]);
};

export default useDebounce;