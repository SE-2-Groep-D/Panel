export default function Delete({fill, size}) {
  fill = (fill === undefined || fill === null) ? '#111329' : fill; 

return (
  <svg width={size} height={size} viewBox={"0 0 24 24"} fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M5 0V1H0V3H1V16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H13C13.5304 18 14.0391 17.7893 14.4142 17.4142C14.7893 17.0391 15 16.5304 15 16V3H16V1H11V0H5ZM3 3H13V16H3V3ZM5 5V14H7V5H5ZM9 5V14H11V5H9Z"  fill={fill}/>
  </svg>
)
}