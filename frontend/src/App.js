import "./App.css"
import NavBar from "./componentes/layout/NavBar";

//2 Reproveitamento de estrutura
import {Outlet} from 'react-router-dom'

// 4- nagegando entre paginas


function App() {
  return (
    <div className="App">
    <NavBar/>
    <Outlet>

    </Outlet>
    <h1>footer</h1>
    </div>
  );
}

export default App;
