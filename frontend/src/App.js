import './App.css';
import { Provider } from "./Context";
import Form from "./components/crud/Form";
import AllProducts from "./components/crud/ProductList";
import { Actions } from "./components/crud/Actions";


function App() {
  const data = Actions();
  return (
    <Provider value={data}>
      <div className="appContainer">
        <h1 className="appTitle">IkonSoft Crud</h1>
        <div className="appForm">
            <Form />
        </div>
        <div className="appTable">
            <AllProducts/>
        </div>
      </div>
    </Provider>
  );
}

export default App;