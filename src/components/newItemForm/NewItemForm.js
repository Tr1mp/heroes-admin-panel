import { Formik, Form, Field } from 'formik';


import './newItemForm.scss';

const NewItemForm = () => {
    return (
        <Formik
            initialValues={{ name: '', desription: '', element: ''}}
            onSubmit={() => console.log("gg")}
        >
            <div className='border p-4 shadow-lg rounded'>
                <Form>
                    <Field
                        name="name"
                        id="name"
                        type="text"
                        placeholder="What is my name?"
                    />
                    <Field
                        name="desription"
                        id="desription"
                        type="text"
                        placeholder="What can i do?"
                        as="textarea"
                    />
                    <Field
                        name="element"
                        id="element"
                        type="text"
                        placeholder="What can i do?"
                        as="select"
                    >
                        <option value="">I own the element</option>
                        <option value="fire">FIRE</option>
                        <option value="water">water</option>
                        <option value="wind">wind</option>
                        <option value="earth">earth</option>
                    </Field>
                </Form>
            </div>
        </Formik>
    )
}

export default NewItemForm;