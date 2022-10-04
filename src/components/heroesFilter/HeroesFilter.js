import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useEffect } from 'react';

import { filterChange, fetchFilters, selectAll } from './filterSlice';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './heroesFilter.scss';

const HeroesFilter = () => {
    const filtersList = useSelector(selectAll);
    const {activeFilter, filtersLoadingStatus} = useSelector(store => store.filters)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line
    }, [])
    
    if (filtersLoadingStatus === 'loading') {
        return <Spinner/>;
    } else if (filtersLoadingStatus === 'error') {
        return <ErrorMessage cusomStyle={{"height": "120px"}}/>;
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5>no filter</h5>
        }
        
        return arr.map(({element, label, color}) => {
            const btnClass = classNames("heroes__filter-btn",
                    {'active': activeFilter === element})
            const btnStyle = {
                backgroundColor: color,
            }
            return (
                <button 
                    key={element} 
                    id={element}
                    onClick={() => dispatch(filterChange(element))} 
                    className={btnClass} 
                    style={btnStyle}>
                        {label} 
                </button>
            )
        })
    }
    
    const elements = renderFilters(filtersList);
    return (
        <div className="heroes__filter">
            <h5>Filter the heroes by elements</h5>
            <div className="heroes__filter-buttons-group">
                {elements}
            </div>
        </div>
    )
}

export default HeroesFilter;