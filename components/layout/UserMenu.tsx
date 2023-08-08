import { Button } from 'components/inputs';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

type UserMenuProps = {
  signOut(): void;
  name?: string;
};

const UserMenu = ({ signOut }: UserMenuProps) => {
  const { t } = useTranslation('common');

  return (
    <>
      <Link href="/user">{t('header.userMenu.title')}</Link>
      <Link href="/admin">{t('header.userMenu.admin')}</Link>
    </>
  );
};

export default UserMenu;
