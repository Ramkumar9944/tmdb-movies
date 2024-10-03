import '../styles/globals.css';
import { MovieProvider } from '../context/MovieContext';

function MyApp({ Component, pageProps }) {
  return (
    <MovieProvider>
      <Component {...pageProps} />
    </MovieProvider>
  );
}

export default MyApp;
