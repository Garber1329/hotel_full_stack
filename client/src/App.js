import './App.css';
import Navbar from "./components/Navbar";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Bokingscreen from "./screens/Bokingscreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from "./screens/Loginscreen";
import Profilescreen from "./screens/Profilescreen";
import Adminscreen from "./screens/Adminscreen";
import Landingscreen from "./screens/Landingscreen";
import Contact from "./components/Contact";

function App() {
    return (
        <div className="App">
            <Navbar/>
            <BrowserRouter>
                <Routes>
                    <Route path="/home" exact element={<Homescreen />} />
                    <Route path="/book/:roomid/:fromDate/:toDate" exact element={<Bokingscreen />}/>
                    <Route path="/register" exact element={<Registerscreen />} />
                    <Route path="/login" exact element={<Loginscreen />} />
                    <Route path="/profile" exact element={<Profilescreen />} />
                    <Route path="/admin" exact element={<Adminscreen />} />
                    <Route path='/' exact element={<Landingscreen />} />
                    <Route path="/contact" exact element={<Contact />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
