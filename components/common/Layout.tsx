import { Box } from '@chakra-ui/react';
import { Header } from 'components';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <>
      <Header />
      <Box py={10}>
        {children}
      </Box>
    </>
  );
};

export default Layout;
