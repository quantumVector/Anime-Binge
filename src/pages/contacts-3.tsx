import { NextPage } from 'next';
import { MainLayout } from '@/widgets/layouts/main-layout';
import { ContactForm } from '@/features/contact-form-2';

interface Form3Props {
}

const Contacts3: NextPage<Form3Props> = () => (
    <MainLayout>
        <div style={{ height: '100vh', backgroundColor: 'grey' }}>
            <ContactForm />
        </div>
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

export default Contacts3;
