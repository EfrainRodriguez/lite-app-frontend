import { useCustomSelector } from '@/redux/store';

const useIsAdmin = () => {
  const { user } = useCustomSelector((state) => state.auth);

  const isAdmin = (user as any)?.is_staff;

  return { isAdmin };
};

export default useIsAdmin;
