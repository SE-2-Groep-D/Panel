export default function Close({fill, size}) {
    fill = (fill === undefined || fill === null) ? '#111329' : fill; 

  return (
    <svg width={size} height={size} viewBox={"0 0 24 24"} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.4274 18.7219L11.7143 13.5383L6.5369 19.2583L4.63252 17.5304L9.80992 11.8104L4.0968 6.62672L5.8226 4.72004L11.5357 9.90371L16.7131 4.18367L18.6175 5.91156L13.4401 11.6316L19.1532 16.8153L17.4274 18.7219Z" fill={fill}/>
</svg>

  )
}

