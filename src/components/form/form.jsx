import {Button, LoadingDiv} from "@components";
import PropTypes from 'prop-types';
import {useState} from "react";

const Form = ({title, message, children, buttonText, onSubmit, className}) => {
    const [loading, setLoading] = useState(false);

    async function submitForm(event) {
        event.preventDefault();
        if(onSubmit === undefined || onSubmit === null) return;

        const form = event.target;
        const content = form.childNodes[1].childNodes[0];
        const button = form.querySelector('button.form-button');

        const data = {
            button: button,
        }

        content.childNodes.forEach((item, index) => {
            const id = (item.getAttribute('id') === null || item.getAttribute('id') === undefined) ? index : item.getAttribute('id');
            data.values = {...data.values, [id] : item.getAttribute('value')}
        })

        setLoading(true);
        await onSubmit(data);
        setLoading(false)
    }

    const finalClassName = (className) ? 'form ' + className : 'form';

    return (
            <form id={title + "-form"} className={finalClassName} onSubmit={submitForm}>
                <div className='form-header'>
                    <h1 className='form-title heading-1'>{title}</h1>
                    <p className='form-message'>{message}</p>
                </div>

                <LoadingDiv loading={loading}>
                    <div className='form-content'>
                        {children}
                    </div>

                    <div className='form-footer'>
                        <Button type='submit' className='form-button'>{buttonText}</Button>
                    </div>
                </LoadingDiv>
            </form>

    );
}

export default Form;

Form.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string,
    children: PropTypes.any,
    buttonText: PropTypes.string,
    onSubmit: PropTypes.func,
    className: PropTypes.string,
  };
  