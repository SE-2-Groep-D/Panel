export default function Close({fill, size}) {
    fill = (fill === undefined || fill === null) ? '#111329' : fill; 

  return (
    <svg width={size} height={size} viewBox={"0 0 24 24"} fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_298_219)">
          <path d="M18.3086 19.3574L12.7011 14.2696L7.61939 19.8839L5.75021 18.1879L10.8319 12.5736L5.22438 7.48576L6.91829 5.61432L12.5258 10.7022L17.6075 5.08786L19.4767 6.78382L14.395 12.3981L20.0025 17.486L18.3086 19.3574Z" fill={fill}/>
        </g>
        <defs>
          <clipPath id="clip0_298_219">
          <rect width="24" height="24" fill="white"/>
          </clipPath>
          </defs>
    </svg>
  )
}
