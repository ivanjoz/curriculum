// @refresh reload
import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, createEffect } from "solid-js";
import "./app.css";

/*           
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ZBPJ4G8EN7"></script>
<script>{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments) }
  gtag('js', new Date());

  gtag('config', 'G-ZBPJ4G8EN7');
`}
</script>          
*/

export default function App() {

  if(typeof window !== 'undefined'){
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag(){ window.dataLayer.push(arguments) }
    window.gtag('js', new Date())
    window.gtag('config', 'G-ZBPJ4G8EN7')
    const script1 = document.createElement('script')
    script1.setAttribute('async', '')
    script1.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=G-ZBPJ4G8EN7')
    document.head.appendChild(script1)
  }

  return (
    <Router root={(props) => (
        <MetaProvider>
          <Title>Ivan J. Angulo Reyna - Software Developer</Title>
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
