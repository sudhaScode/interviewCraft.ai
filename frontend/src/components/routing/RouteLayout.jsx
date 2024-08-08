import { Outlet } from "react-router-dom";
import NavBar from "./RouteNavBar";
import '../../App.css';

function RouteLayout(){

    return(
        <div className="App">
            <NavBar/>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}

export default RouteLayout;