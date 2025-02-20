import { useEffect, useState } from 'react';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const isAuthenticated = useIsAuthenticated();
  const { inProgress } = useMsal();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (inProgress === 'none') {
      setIsCheckingAuth(false);

      if (!isAuthenticated) {
        router.push('/login');
      }
    }
  }, [isAuthenticated, inProgress, router]);

  return { isCheckingAuth };
};

export default useAuth;
