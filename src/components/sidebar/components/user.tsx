import { FC } from 'react';

import { useSession } from 'next-auth/react';

import { getAvatarFallback } from '@/components/perfil-menu/perfil-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

export const SidebarUser: FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  const { data } = useSession();

  if (!data)
    return (
      <div className="flex h-[52px] items-center justify-center gap-2 px-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="mr-auto h-3 w-24 rounded-full" />
      </div>
    );

  return (
    <div className="flex h-[52px] items-center justify-center gap-2 px-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={data.photo} />
        <AvatarFallback>{getAvatarFallback(data.name)}</AvatarFallback>
      </Avatar>
      {!isCollapsed && <span className="mr-auto truncate">{data.name}</span>}
    </div>
  );
};
