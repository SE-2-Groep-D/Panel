export default function Add({fill, size}) {
    fill = (fill === undefined || fill === null) ? '#111329' : fill; 

  return (
    <svg width={size} height={size} viewBox={"0 0 24 24"} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill={fill}/>
    </svg>
  )
}
