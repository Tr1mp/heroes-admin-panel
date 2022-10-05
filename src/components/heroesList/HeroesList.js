import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';

import './heroesList.scss';

const HeroesList = () => {
    const [deleteHero] = useDeleteHeroMutation();
    const activeFilter = useSelector(state => state.filters.activeFilter);
    
    const {
        data: heroes = [],
        isLoading,
        isError
    } = useGetHeroesQuery();
    
    const onDelete = useCallback((id) => { 
        deleteHero(id);
        // eslint-disable-next-line
    }, []);

    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice();

        if (activeFilter === 'all') {
            window.pageYOffset = 0;
            return filteredHeroes;
        } else {
            return filteredHeroes.filter(item => item.element === activeFilter);
        }
    }, [heroes, activeFilter]);


    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
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