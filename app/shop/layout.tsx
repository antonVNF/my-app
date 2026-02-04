import BreadCrumbs from '@/shared/components/shared/BreadCrumbs';
import Container from '@/shared/components/shared/Сontainer';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Container className="">
        <BreadCrumbs className="my-10"></BreadCrumbs>
        {children}
      </Container>
    </>
  );
}
