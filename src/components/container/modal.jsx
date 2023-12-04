import {useEffect, useRef} from 'react';

export default function Modal({ open, onClose, children, animation}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if(!open) return;
      dialogRef.current.showModal();
      
      if(animation === undefined || animation === null) return;
      switch(animation) {
        case 'top':
          dialogRef.current.classList.add(animation);
          break;
        case 'right':
          dialogRef.current.classList.add(animation);
          break;
        case 'bottom':
          dialogRef.current.classList.add(animation);
          break;
        case 'left':
            dialogRef.current.classList.add(animation);
            break;
      }
  }, [open, animation]);

  function handleClose(e) {
    dialogRef.current.close();
    if(onClose !== undefined && onClose !== null) onClose(e);
  }

  return (
    <dialog className='modal' ref={dialogRef}>
      <button className='close' onClick={handleClose}>

      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.6569 12.7574L18.4143 17L22.6569 21.2426L21.2427 22.6569L17.0001 18.4142L12.7574 22.6569L11.3432 21.2426L15.5859 17L11.3432 12.7574L12.7574 11.3431L17.0001 15.5858L21.2427 11.3431L22.6569 12.7574Z" fill="#111329"/>
      </svg>


      </button>
      <section className='modal-content'>
          {children}
      </section>
    </dialog>
  );
}