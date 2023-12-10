import { NextPage } from 'next';
import { MainLayout } from '@/widgets/layouts/main-layout';
import { Form } from '@/entities/form';

interface AuthProps {
}

const MainPage: NextPage<AuthProps> = () => (
    <MainLayout>
        <Form />
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
