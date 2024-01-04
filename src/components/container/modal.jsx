import {useEffect, useRef} from 'react';

import {Icon} from '@components';

export default function Modal({ open, onClose, children, animation}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if(!open) return;
    
      dialogRef.current.showModal();
      addClickEvent(dialogRef.current);
      addAnimation(animation, dialogRef.current);
  }, [open, animation]);

  function handleClose(e) {
    dialogRef.current.close();
    if(onClose !== undefined && onClose !== null) onClose(e);
  }

  function addClickEvent(dialog) {
    dialog.addEventListener("click", e => {
      if(e.target !== dialog) return; 

      const dialogDimensions = dialog.getBoundingClientRect()
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {

        handleClose(e);
      }
    })
  }

  return (
    <dialog className='modal' ref={dialogRef}>
      <button className='close' onClick={handleClose} aria-label='Klik of druk op enter om de popup te sluiten.'>
        <Icon type='close' size='20'/>
      </button>
      <section className='modal-content'>
          {children}
      </section>
    </dialog>
  );
}



function addAnimation(animation, dialog) {
  if(animation === undefined || animation === null) return;
  switch(animation) {
    case 'top':
      dialog.classList.add(animation);
      break;
    case 'right':
      dialog.classList.add(animation);
      break;
    case 'bottom':
      dialog.classList.add(animation);
      break;
    case 'left':
        dialog.classList.add(animation);
        break;
  }
}