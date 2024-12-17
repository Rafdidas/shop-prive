import { Fragment } from "react/jsx-runtime";
import Header from "../header/header.component";
import Footer from "../../components/footer/footer.component";

import { Outlet } from "react-router-dom";

const Home = () => {
    return (
        <Fragment>
            <Header />
            <Outlet />
            <Footer />
        </Fragment>
    );
}

export default Home;