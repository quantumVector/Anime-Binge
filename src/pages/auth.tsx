import { NextPage } from 'next';
import { MainLayout } from '@/widgets/layouts/main-layout';
import { AuthForm } from '@/features/form';

interface AuthProps {
}

const MainPage: NextPage<AuthProps> = () => (
    <MainLayout>
        <AuthForm />
    </MainLayout>
);

export const getServerSideProps = async () => {
    try {
        return {
            props: {
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
};

export default MainPage;
