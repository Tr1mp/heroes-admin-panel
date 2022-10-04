import { Formik, Form, Field, ErrorMessage as ErrorFormikMessage} from 'formik';
import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup';
import classNames from 'classnames';

import { selectAll } from '../heroesFilter/filterSlice';
import { heroAdd } from '../heroesList/heroesSlice';
import { useHttp } from '../../hooks/http.hook';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './heroesNewItem.scss';

const HeroesNewItem = () => {
    const filtersList = useSelector(selectAll);
    const {filtersLoadingStatus} = useSelector(store => store.filters)
    const {request} = useHttp();
    
    const dispatch = useDispatch();

    const addHero = ({name, description, element}) => {
        const hero = {
            id: uuidv4(),
            name,
            description,
            element
        }
        request("http://localhost:3001/heroes", "POST", JSON.stringify(hero))
            .then(dispatch(heroAdd(hero)))
            .catch(err => console.log(err));
    }
    
    const renderFilter = (arr) => {
        return arr.map(({element, label}) => {
            // eslint-disable-next-line
            if (element === 'all') return;
            return (
                <option key={element} value={element}>{label}</option>
            )
        })
        
    }

    const filtersElement = useMemo(() => renderFilter(filtersList), [filtersList]); 
    
    if (filtersLoadingStatus === 'loading') {
        return <Spinner/>;
    } else if (filtersLoadingStatus === 'error') {
        return <ErrorMessage cusomStyle={{"height": "120px"}}/>;
    }

    const inputClasses = (errors, touched) => classNames("form-input", {'error-outline': errors && touched})

    return (
        <Formik
            initialValues={{
                name: '', 
                description: '', 
                element: ''
            }}
            validationSchema= {Yup.object({
                name: Yup.string()
                        .required("An empty hero name is not allowed")
                        .min(3, "The hero's name is too short")
                        .max(30, "The hero's name is too long"),
                description: Yup.string()
                        .required("An empty description of the hero is not allowed")
                        .min(5, "The description of the hero is too short")
                        .max(199, "The description of the hero is too long"),
                element: Yup.string()
                        .required("You have to choose the hero element")
            })}
            onSubmit={(values, {resetForm}) => {
                addHero(values)
                resetForm();
            }}
        >
            {({errors, touched, dirty, isValid}) => (
                <Form 
                    className='form-wrapper'
                >
                <label 
                    htmlFor='name' 
                    className='form-label'>
                        The name of the new hero
                </label>
                <Field
                    name="name"
                    id="name"
                    type="text"
                    placeholder="What is my name?"
                    // className="form-input"
                    className={inputClasses(errors.name, touched.name)}
                />
                <ErrorFormikMessage 
                    className="error" 
                    name="name" 
                    component="div"
                />
                <label 
                    htmlFor='description' 
                    className='form-label'>
                        Description
                </label>
                <Field
                    name="description"
                    id="description"
                    type="text"
                    placeholder="What can i do?"
                    as="textarea"
                    className={`form-input-high ${inputClasses(errors.description, touched.description)}`}
                />
                <ErrorFormikMessage 
                    className="error" 
                    name="description" 
                    component="div"
                />
                <label 
                    htmlFor='element' 
                    className='form-label'>
                        Select a Hero element
                </label>
                <Field
                    name="element"
                    id="element"
                    type="text"
                    placeholder="What can i do?"
                    as="select"
                    className={inputClasses(errors.element, touched.element)}
                >
                    <option value="">I own the element</option>

                    {filtersElement}
                </Field>
                <ErrorFormikMessage 
                    className="error" 
                    name="element" 
                    component="div"
                />
                <button 
                    type= "submit" 
                    className='button'
                    disabled={!isValid || !dirty}>
                        Create
                </button>
            </Form>
            )}
        </Formik>
    )
}

export default HeroesNewItem;