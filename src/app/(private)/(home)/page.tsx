import { FC } from 'react';

import { NextPage } from 'next';
import Link from 'next/link';

import { Icon, IconProps } from '@/components/icon/icon';
import { Button } from '@/components/ui/button';
import { routes } from '@/utils/constants/routes';
import { awaiter } from '@/utils/functions/awaiter';

import type { UrlObject } from 'url';

const Item: FC<{
  icon: IconProps['icon'];
  link: string | UrlObject;
  title: string;
}> = ({ icon, link, title }) => (
  <Button
    className="flex h-32 w-32 flex-col items-center gap-1 text-wrap"
    variant="outline"
    asChild
  >
    <Link href={link}>
      <Icon icon={icon} size={48} />
      <span className="text-center font-medium">{title}</span>
    </Link>
  </Button>
);

const HomePage: NextPage = async () => {
  await awaiter();

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold">Bem vindo ao sistema!</h1>
      <div className="flex flex-wrap gap-4">
        <Item
          icon="add_notes"
          link={routes.addPresentationForm}
          title="Adicionar ficha de apresentação"
        />
        <Item
          icon="person_add"
          link={routes.addMember}
          title="Adicionar membro"
        />
        <Item
          icon="add_home_work"
          link={routes.addChurch}
          title="Adicionar igreja"
        />
      </div>
    </main>
  );
};

export default HomePage;
