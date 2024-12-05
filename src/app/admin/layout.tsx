import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { RenderMounted } from '@/components/render-mounted';
import { ADMIN } from '@/constants/constants';
import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

const RootLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (authData?.user) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (error || !data || data.type !== ADMIN) {
      console.log('error', error, data?.type);
      return redirect('/');
    }
  }
  return (
    <RenderMounted>
      <Header />
      <main className='min-h-[calc(100vh-128px)] py-3'>{children}</main>
      <Footer />
    </RenderMounted>
  );
};

export default RootLayout;
