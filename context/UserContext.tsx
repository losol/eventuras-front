import { useSession } from 'next-auth/react';
import { createContext, ReactNode, useEffect, useState } from 'react';
import useSWR from 'swr';
import { UserType } from 'types';

const initialUser: UserType = {
  id: null,
  email: null,
  name: null,
  accessToken: null,
};

interface UserContextValue {
  user: UserType;
  updateUser: (updated_user: UserType) => void;
}

export const UserContext = createContext<UserContextValue>({
  user: initialUser,
  updateUser: () => { },
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>(initialUser);
  const { data: session } = useSession();
  const { data: userDetails } = useSWR<UserType | undefined>(session ? '/api/getUserProfile' : '');

  const updateUser = (updated_user: UserType) => {
    setUser(updated_user);
  };

  useEffect(() => {
    if (userDetails) {
      setUser(userDetails);
    }
  }, [userDetails]);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
