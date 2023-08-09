import { Button } from 'components/inputs';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

type UserMenuProps = {
  signOut(): void;
  name?: string;
};

const UserMenu = (props: UserMenuProps) => {
  const { signOut } = props;
  const { t } = useTranslation('common');

  return (
    <>
      <Link href="/user" passHref>
        {t('header.userMenu.title')}
      </Link>
      <Link href="/admin" passHref>
        {t('header.userMenu.admin')}
      </Link>
      <Button onClick={signOut}>{t('header.auth.logout')}</Button>
    </>
  );
};

export default UserMenu;
