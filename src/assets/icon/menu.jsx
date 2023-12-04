export default function Menu({fill, size}) {
    fill = (fill === undefined || fill === null) ? '#111329' : fill; 

  return (
    <svg width={size} height={size} viewBox={"0 0 24 24"} fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z" fill={fill}/>
    </svg>
  )
}
