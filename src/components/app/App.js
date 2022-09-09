import Heroes from "../heroesList/HeroesList";
import NewItemForm from "../newItemForm/NewItemForm";

import './app.scss';

const App = () => {
    return (
        <div className="app">
            <div className="content">
                <Heroes/>
                <NewItemForm/>
            </div>
        </div>
        
    )
}


export default App;