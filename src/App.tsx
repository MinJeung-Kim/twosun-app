import { Outlet } from "react-router-dom";
import Footer from './components/Footer/Footer';
import { PostProvider } from './context/PostContext';
import styles from "./App.module.css";

function App() {

  return (
    <PostProvider>
      <main className={styles.main}>
        <Outlet />
        <Footer />
      </main>
    </PostProvider>
  )
}

export default App
