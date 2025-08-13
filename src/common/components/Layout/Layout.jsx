import { Outlet } from 'react-router-dom';
import FloatingNav from '../FloatingNav/FloatingNav';
import Footer from '../Footer/Footer';

export const Layout = () => {
  return (
    <>
      <Outlet />
      <FloatingNav />
      <Footer />
    </>
  );
};

export default Layout;
