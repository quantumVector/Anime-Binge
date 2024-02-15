import { NextPage } from 'next';
import { MainLayout } from '@/widgets/layouts/main-layout';
import { ContactForm } from '@/features/contact-form-2';

interface Form2Props {
}

const Contacts2: NextPage<Form2Props> = () => (
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

export default Contacts2;
