import { MainLayout } from "@/widgets/layouts/main-layout";

interface AnimeProps { }

export default function Anime({ }: AnimeProps) {
    return (
        <MainLayout>
            Anime page
        </MainLayout>
    );
}

export const getStaticProps = async () => {
    return {
        props: {
        },
    };
};
