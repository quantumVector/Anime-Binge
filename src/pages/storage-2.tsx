import { NextPage } from 'next';
import { MainLayout } from '@/widgets/layouts/main-layout';
import { Storage } from '@/features/storage';

interface Storage2Props {
}

const StoragePage2: NextPage<Storage2Props> = () => (
    <MainLayout>
       <Storage type='page-2' />
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

export default StoragePage2;
