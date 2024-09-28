interface Routes {
  home: string;
  signIn: string;
  signUp: string;
  addMember: string;
  addChurch: string;
  addPresentationForm: string;
}

export const routes: Routes = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  addMember: '/member/add',
  addChurch: '/church/add',
  addPresentationForm: '/presentation-form/add',
};
