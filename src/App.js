import "./App.css";
import routes from "./routes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
   return (
      <div className="App">
         <Header />
         {routes}
         <Footer />
      </div>
   );
}

export default App;
