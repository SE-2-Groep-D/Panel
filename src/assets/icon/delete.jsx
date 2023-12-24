export default function Delete({fill, size}) {
    fill = (fill === undefined || fill === null) ? '#111329' : fill; 
  
  return (
    <svg width={size} height={size} viewBox={"0 0 24 24"} fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M8.625 2V3.125H3V5.375H4.125V20C4.125 20.5967 4.36205 21.169 4.78401 21.591C5.20597 22.0129 5.77826 22.25 6.375 22.25H17.625C18.2217 22.25 18.794 22.0129 19.216 21.591C19.6379 21.169 19.875 20.5967 19.875 20V5.375H21V3.125H15.375V2H8.625ZM8.625 7.625H10.875V17.75H8.625V7.625ZM13.125 7.625H15.375V17.75H13.125V7.625Z" fill={fill}/>
    </svg>
  )
  }
  