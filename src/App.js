import Header from "./components/Header";
import Calendar from "./components/Calendar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Calendar />
      <Footer />
    </div>
  );
}

export default App;
