import { CancelablePromise } from '@losol/eventuras';
import { DependencyList, useEffect, useState } from 'react';

import { apiWrapper } from '@/utils/api/EventurasApi';

const createHook = <T>(
  fetchFunction: () => CancelablePromise<T>,
  dependencies?: DependencyList | undefined
) => {
  const [result, setResult] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const execute = async () => {
      const result = await apiWrapper(fetchFunction);
      setLoading(false);
      if (result.ok) {
        setResult(result.value);
        return;
      }
      setResult(null);
    };
    execute();
  }, dependencies ?? []);
  return { loading, result };
};

export default createHook;
