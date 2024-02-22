import { NextPage } from 'next';
import { MainLayout } from '@/widgets/layouts/main-layout';
import { Storage } from '@/features/storage';

interface StorageProps {
}

const StoragePage: NextPage<StorageProps> = () => (
    <MainLayout>
       <Storage type='page-1' />
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

export default StoragePage;
