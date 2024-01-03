export default function Delete({fill, size}) {
  fill = (fill === undefined || fill === null) ? '#111329' : fill; 

return (
  <svg width={size} height={size} viewBox={"0 0 24 24"} fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M17.77 3.77L16 2L6 12L16 22L17.77 20.23L9.54 12L17.77 3.77Z"  fill={fill}/>
  </svg>
)
}