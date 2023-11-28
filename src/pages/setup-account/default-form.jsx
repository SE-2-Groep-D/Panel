const DefaultForm = ({title, moveOut, children}) => {
    return (
        <div id="account-form" className={moveOut}>
            <h1 className='form-title'>{title}</h1>
            {children}
        </div>
    );
}

export default DefaultForm;