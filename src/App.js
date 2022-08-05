import Header from "./components/Header";
import Calendar from "./components/Calendar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Calendar />
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
