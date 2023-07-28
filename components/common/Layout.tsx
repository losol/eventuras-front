import { Box, Grid } from '@chakra-ui/react';
import { Header } from 'components';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <Grid
      templateRows='auto 1fr'
      h='100vh'
    >
      <Header />
      <Box overflowY='auto'>
        {children}
      </Box>
    </Grid>
  );
};

export default Layout;
