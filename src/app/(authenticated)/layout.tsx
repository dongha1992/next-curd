import { getAuthOrRedirect } from '@/features/auth/quries/get-auth-or-redirect';

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getAuthOrRedirect();

  return (
    <>
      {children}
      <div>asd</div>
    </>
  );
}
