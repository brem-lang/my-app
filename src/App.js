import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import ProtectedRoute from "./component/ProtectedRoute";
import { AuthProvider } from "./context/UserAuthContext";
import Home from "./pages/Home";
import List from "./pages/List";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UpdateProfile from "./pages/UpdateProfile";
import Form from "./pages/Form";
import ViewForm from "./pages/ViewForm";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>

    <AuthProvider>
      <Routes>
        <Route
          path="/home"
          element={
          <ProtectedRoute>
            <Home />
           </ProtectedRoute>}
          />
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/updateProfile" element={<UpdateProfile/>}/>
          <Route path="/list" element={<List/>}/>
          <Route path="/form" element={<Form/>}/>
          <Route path="/view-form" element={<ViewForm/>}/>
        </Routes>
    </AuthProvider>
    </Router>
  );
}

export default App;
