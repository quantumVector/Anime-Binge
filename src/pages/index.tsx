import { NextPage } from 'next';
import { MainLayout } from '@/widgets/layouts/main-layout';
import { Main } from '@/widgets/main';
import data from '@shared/lib/mocks/main.json';
import { BlockMainType, MainPageTypes } from '@/shared/lib/types';

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
        const pageData = await data;

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
