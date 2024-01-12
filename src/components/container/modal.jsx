import {useEffect, useRef} from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

export default function Modal({ open, onClose, children, animation}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if(!open) return;
    
      dialogRef.current.showModal();
      addClickEvent(dialogRef.current);
      addAnimation(animation, dialogRef.current);
  }, [open, animation]);

  function handleClose(e) {

    if (onClose === undefined || onClose == null) return;

    const children = [...dialogRef.current.querySelector('.modal-content').childNodes];
    const values = children.map(element => ({
      innerText: element.innerText,
      value: element.value,
    }));

    const event = {
      modal: dialogRef.current,
      children: children,
      values: values
    }

    onClose(event);
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

        dialogRef.current.close();
      }
    })
  }

  return (
    <dialog className='modal' ref={dialogRef} onClose={handleClose}>
      <button className='close' onClick={() => dialogRef.current.close()} aria-label='Klik of druk op enter om de popup te sluiten.'>
        <FontAwesomeIcon icon={faXmark} />
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