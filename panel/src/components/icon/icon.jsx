import {lazy, Suspense} from 'react';

const Icons = {
    add: lazy(() => import('@icons/add.jsx')),
    delete: lazy(() => import('@icons/delete.jsx')),
    back: lazy(() => import('@icons/back.jsx')),
    calender: lazy(() => import('@icons/calender.jsx')),
    chat: lazy(() => import('@icons/chat.jsx')),
    close: lazy(() => import('@icons/close.jsx')),
    edit: lazy(() => import('@icons/edit.jsx')),
    group: lazy(() => import('@icons/group.jsx')),
    menu: lazy(() => import('@icons/menu.jsx')),
    photo: lazy(() => import('@icons/photo.jsx')),
    profile: lazy(() => import('@icons/profile.jsx')),
    settings: lazy(() => import('@icons/settings.jsx')),
    home: lazy(() => import('@icons/home.jsx')),
    logout: lazy(() => import('@icons/logout.jsx')),
  };

export default function Icon({color, type, size, onClick}) {
    const Component = Icons[type];

    const defaultComponent = <svg onClick={onClick} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#111329"/>
    </svg>
  
    if (!Component) {
        return defaultComponent;
    }

    if(color === null || color === undefined) color = '#111329';
  

    return <Suspense fallback={defaultComponent}>
      <Component onClick={onClick} size={size} fill={color} />
    </Suspense>
}


