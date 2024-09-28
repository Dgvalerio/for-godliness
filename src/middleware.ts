import { withAuth } from 'next-auth/middleware';

import { routes } from '@/utils/constants/routes';

const auth = withAuth({
  pages: { signIn: routes.signIn },
  callbacks: {
    authorized: (props) => {
      if (
        props.req.url.includes(routes.signIn) ||
        props.req.url.includes(routes.signUp) ||
        props.req.url.includes('palanqueta.jpg')
      ) {
        return true;
      }

      return !!props.token?.id;
    },
  },
});

export const middleware = auth;

export const config = {
  matcher: ['/((?!_next).*)'],
};
