import { headers } from "next/headers";
import { MainLayout } from '@/widgets/layouts/main-layout';
import Script from 'next/script';
import { CspScript } from "@/entities/csp-script/csp-script";
import { NextPage } from "next";

interface CspExamples2Props {
}

const CspExamples2: NextPage<CspExamples2Props> = ({ nonce }) => {
    console.log('nonce', nonce)
    return (
        <MainLayout>
            <style dangerouslySetInnerHTML={{ __html: `body { background: purple }` }} />
            <div>
                test
                <img src="https://sun9-55.userapi.com/impf/ii8_mj_MbUMVul45BCTqb_lYgXhrbEB0QRRCrQ/sOXI4vgUtWE.jpg?size=640x735&quality=96&sign=7cf69aad28324d006ec80865d3f91a89&type=album" alt="" />
                <img src="https://sun9-48.userapi.com/impf/c850036/v850036686/18b268/J00Iu2Ge-SY.jpg?size=720x720&quality=96&sign=d76e38abd3ee3e1f77f5e409e0aad998&type=album" alt="" />
            </div>

            {/* <CspScript nonce={nonce}/> */}

            <script
                nonce={nonce}
                id='test-script'
                dangerouslySetInnerHTML={{
                    __html: `
              console.log('hello world');
          `
                }} />
        </MainLayout>
    )
};

export const getServerSideProps = async ({ req }) => {
    console.log('req2', req.headers)

    const nonce = req.headers['x-nonce'];

    try {
        return {
            props: {
                nonce,
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
};

export default CspExamples2;