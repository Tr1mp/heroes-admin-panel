import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import { heroDeleted, fetchHeroes, selectHeroesByFilter } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './heroesList.scss';


const HeroesList = () => {
    const filteredHeroes = useSelector(selectHeroesByFilter)
    const {heroesLoadingStatus} = useSelector(state => state.heroes);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);
    
    const onDelete = useCallback((id) => { 
        console.log('onDelete', id);
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(data => console.log(data, "delete"))
            .then(dispatch(heroDeleted(id)))
        // eslint-disable-next-line
    }, [request]);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <ErrorMessage/>;
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return (
            <TransitionGroup>
                {arr.map(({id, ...props}) => {
                    return (
                        <CSSTransition
                            key={id}
                            timeout={500}
                            classNames="item"
                        >
                            <HeroesListItem 
                                {...props} 
                                onDelete={() => onDelete(id)}/>
                        
                        </CSSTransition>
                    ) 
                })}
            </TransitionGroup>
            
        )
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;