import { NextPage } from 'next';
import { MainLayout } from '@/widgets/layouts/main-layout';

interface AboutUsPageProps {
}

const MainPage: NextPage<AboutUsPageProps> = () => (
    <MainLayout>
        Home
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
