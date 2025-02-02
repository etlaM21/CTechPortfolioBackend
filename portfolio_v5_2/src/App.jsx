import { Outlet } from "react-router-dom";

import "./App.css";
import RTFGeo from "./components/RTFGeo";
import Navigation from "./components/Navigation";

const App = () => {
    return (
        <>
            <RTFGeo />
            <Navigation />
            <Outlet />
        </>
    );
};

export default App;
