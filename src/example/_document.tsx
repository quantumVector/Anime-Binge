import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import Script from 'next/script';

const MyDocument = (props: { nonce: string }) => {
    const { nonce } = props;

    return (
        <Html lang="en">
            <Head nonce={nonce}>
                <script
                    defer
                    nonce={nonce}
                    dangerouslySetInnerHTML={{
                        __html: `
                          var XRAY_PROJECT = 'nyadvent'; 
                          var OAUTH_CLIENT_ID = 'b162bf06fe404bac90742d8e82daaf8f'
                        `,
                    }}
                />

                <Script
                    src="https://js.imgsmail.ru/pkgs/promokit/2.2.10/promokit.min.js"
                    strategy="beforeInteractive"
                />

                <Script
                    strategy="beforeInteractive"
                    src="https://oauth.mail.ru/sdk/v0.17.0/oauth.js"
                />

                {/* Google Tag Manager */}
                <script
                    defer
                    nonce={nonce}
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PKTLFKC8');`,
                    }}
                />
                {/* End Google Tag Manager */}
                <Script
                    strategy="beforeInteractive"
                    src="https://calendarx.imgsmail.ru/atc-button/latest/atc-button.js"
                />
            </Head>
            <body>
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-PKTLFKC8"
                        height="0"
                        width="0"
                        className="hidden"
                    />
                </noscript>
                {/* End Google Tag Manager (noscript) */}
                {/* Top.Mail.Ru counter  */}
                <script
                    defer
                    nonce={nonce}
                    type="text/javascript"
                    dangerouslySetInnerHTML={{
                        __html: `var _tmr = window._tmr || (window._tmr = []);
                  _tmr.push({id: "3422191", type: "pageView", start: (new Date()).getTime()});
                  (function (d, w, id) {
                  if (d.getElementById(id)) return;
                  var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
                  ts.src = "https://top-fwz1.mail.ru/js/code.js";
                  var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
                  if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
                })(document, window, "tmr-code");`,
                    }}
                />
                <noscript>
                    <div>
                        <img
                            src="https://top-fwz1.mail.ru/counter?id=3422191;js=na"
                            alt="Top.Mail.Ru"
                            className="outside"
                        />
                    </div>
                </noscript>
                {/* /Top.Mail.Ru counter  */}

                {/* IFNOT DisableRBCounters  */}
                {/* http://tns-counter.ru  */}
                <script
                    defer
                    nonce={nonce}
                    type="text/javascript"
                    dangerouslySetInnerHTML={{
                        __html: `
                var img = new Image(); img.src = '//www.tns-counter.ru/V13a***R>' + document.referrer.replace(/\\*/g,'%2a') + '*mail_ru/ru/UTF-8/tmsec=mail_win/' + Math.round(Math.random() * 1000000000);`,
                    }}
                />
                <noscript>
                    <img
                        src="//www.tns-counter.ru/V13a****mail_ru/ru/UTF-8/tmsec=mail_win/"
                        width="1"
                        height="1"
                        alt=""
                    />
                </noscript>
                {/* http://tns-counter.ru */}
                {/*  /IFNOT */}

                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
    const initialProps = await Document.getInitialProps(ctx);

    const { req } = ctx;

    const nonce = req?.headers['X-Request-Id'] || req?.headers['x-request-id'] || '';

    return { ...initialProps, nonce };
};

export default MyDocument;
