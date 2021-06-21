import "./App.css";
import routes from "./routes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
   return (
      <div className="App">
         <div className="page">
            <Header />
            {routes}
         </div>
         <div className="footer">
            <Footer />
         </div>
      </div>
   );
}

export default App;
