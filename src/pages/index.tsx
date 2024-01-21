import { NextPage } from 'next';
import { MainLayout } from '@/widgets/layouts/main-layout';
import { Main } from '@/widgets/main';
import mocksData from '@shared/lib/mocks/main.json';
import { BlockMainType, MainPageTypes } from '@/shared/lib/types';
import { getFirebaseData } from '@/shared/api/firebase';

interface MainPageProps {
    pageData: MainPageTypes.MainPage;
}

const MainPage: NextPage<MainPageProps> = ({ pageData }) => {
    const { blocks } = pageData;

    return (
        <MainLayout>
            {blocks.map((block) => {
                switch (block.type) {
                    case BlockMainType.Notes: {
                        return <Main key={block.id} {...block} />
                    }
                    default: {
                        return null;
                    }
                }
            })}
        </MainLayout>
    )
};

export const getServerSideProps = async () => {
    try {
        // ===mocks===
        // const pageData = await mocksData;

        const blocks = await getFirebaseData('pages', 'main') as any;
        const { data } = await getFirebaseData('notes', '02rkIUrFiJm5SxSCZLf1') as any;
        const pageData = {
            ...blocks
        }

        pageData.blocks[0].data = [...data].reverse();

        return {
            props: {
                pageData,
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
};

export default MainPage;
