import { ADMIN } from '@/constants/constants';
import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

const AuthLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (authData?.user) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (error || !data) {
      console.log('error', error);
      return;
    }

    if (data.type === ADMIN) {
      return redirect('/');
    }
  }

  return <>{children}</>;
};

export default AuthLayout;
