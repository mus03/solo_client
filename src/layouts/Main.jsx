
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const Main = () => {
    return (
        <div className='font-lato'>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-325px)] my-12'>
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;