import HeroesList from "../heroesList/HeroesList";
import HeroesNewItem from "../heroesNewItem/HeroesNewItem";
import HeroesFilter from "../heroesFilter/HeroesFilter";
import './app.scss';

const App = () => {
    return (
        <div className="app">
            <div className="content">
                <HeroesList/>
                <div className='content__interactive'>
                    <HeroesNewItem/>
                    <HeroesFilter/>
                </div>
            </div>
        </div>
    )
}


export default App;