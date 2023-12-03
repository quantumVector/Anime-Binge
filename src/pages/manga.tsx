import { MainLayout } from "@/widgets/layouts/main-layout";

interface MangaProps { }

export default function Manga({ }: MangaProps) {
    return (
        <MainLayout>
            Manga page
        </MainLayout>
    );
}

export const getStaticProps = async () => {
    return {
        props: {
        },
    };
};
