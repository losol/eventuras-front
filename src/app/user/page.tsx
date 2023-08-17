import { OpenAPI, UsersService } from '@losol/eventuras';

import { Heading } from '@/components/content';
import { Container, Layout } from '@/components/layout';

import UserProfileCard from './(components)/UserProfile';

const UserProfilePage = async () => {
  OpenAPI.BASE = `${process.env.NEXTAUTH_URL}/api/eventuras`;
  const userInfo = await UsersService.getV3UsersMe();
  console.log(userInfo);

  return (
    <Layout>
      <Heading>User profile</Heading>
      <Container>
        <UserProfileCard />
        {/* <UserRegistrations /> */}
      </Container>
    </Layout>
  );
};

export default UserProfilePage;
