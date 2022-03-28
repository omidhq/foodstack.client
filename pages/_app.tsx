import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {

  const [helloWorld, setHelloWorld] = useState<String>("");

  useEffect( () => {
    fetch("https://localhost:7255/api/HelloWorld", {mode: 'cors'})
    .then(response => response.json())
    .then((data:String) => setHelloWorld(data));
  }, []);

  return <><h1>{helloWorld}</h1><Component {...pageProps} /></>
}

export default MyApp
