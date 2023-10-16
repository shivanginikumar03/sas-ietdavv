import SideLogin from "./components/Authentication/SideLogin";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SideSignup from "./components/Authentication/SideSignup";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import { ConfigProvider } from 'react-avatar';
import Loading from "./components/Loading";
import { useSelector } from 'react-redux';
import Alert from "./components/Alert";
import {useState, useEffect} from "react"
import AOS from "aos";
import "aos/dist/aos.css";

function App() {

  const [show, setShow] = useState(false);
  const loading = useSelector(state => state.loading.loading.loading)
  const loadingMsg = useSelector(state => state.loading.loading.msg)
  const notification = useSelector(state => state.notification.notification)

  useEffect(() => {
    AOS.init({
      offset: 0,
    });
    AOS.refresh();
  }, []);
  
  useEffect(() => {
    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 3000);
  }, [notification]);

  return (
    <ConfigProvider colors={['yellow', 'green', 'blue']}>
      <BrowserRouter>
        <div className="App">
          {loading? <Loading msg={loadingMsg}/>: null} 
          {show? <Alert message={notification.message} type={notification.type}/>:null}

          {/* Routes */}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signup" element={<SideSignup />} />
            <Route exact path="/login" element={<SideLogin type="student" />} />
            <Route exact path="/faculty" element={<SideLogin type="faculty" />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Routes>

        </div>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
