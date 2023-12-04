export default function Calender({fill, size}) {
    fill = (fill === undefined || fill === null) ? '#111329' : fill; 

  return (
    <svg width={size} height={size} viewBox={"0 0 24 24"} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.5 3H17.25V2.25C17.25 2.05109 17.171 1.86032 17.0303 1.71967C16.8897 1.57902 16.6989 1.5 16.5 1.5C16.3011 1.5 16.1103 1.57902 15.9697 1.71967C15.829 1.86032 15.75 2.05109 15.75 2.25V3H8.25V2.25C8.25 2.05109 8.17098 1.86032 8.03033 1.71967C7.88968 1.57902 7.69891 1.5 7.5 1.5C7.30109 1.5 7.11032 1.57902 6.96967 1.71967C6.82902 1.86032 6.75 2.05109 6.75 2.25V3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5V4.5C21 4.10218 20.842 3.72064 20.5607 3.43934C20.2794 3.15804 19.8978 3 19.5 3ZM10.5 17.25C10.5 17.4489 10.421 17.6397 10.2803 17.7803C10.1397 17.921 9.94891 18 9.75 18C9.55109 18 9.36032 17.921 9.21967 17.7803C9.07902 17.6397 9 17.4489 9 17.25V12.4631L8.58563 12.6713C8.4076 12.7603 8.2015 12.7749 8.01268 12.712C7.82385 12.649 7.66776 12.5137 7.57875 12.3356C7.48974 12.1576 7.47509 11.9515 7.53803 11.7627C7.60097 11.5739 7.73635 11.4178 7.91437 11.3287L9.41437 10.5787C9.52876 10.5215 9.65589 10.4945 9.78367 10.5002C9.91145 10.506 10.0356 10.5443 10.1444 10.6116C10.2532 10.6788 10.343 10.7728 10.4052 10.8845C10.4675 10.9963 10.5001 11.1221 10.5 11.25V17.25ZM15.75 16.5C15.9489 16.5 16.1397 16.579 16.2803 16.7197C16.421 16.8603 16.5 17.0511 16.5 17.25C16.5 17.4489 16.421 17.6397 16.2803 17.7803C16.1397 17.921 15.9489 18 15.75 18H12.75C12.6107 18 12.4742 17.9612 12.3557 17.888C12.2372 17.8148 12.1415 17.71 12.0792 17.5854C12.0169 17.4608 11.9905 17.3214 12.003 17.1826C12.0155 17.0439 12.0664 16.9114 12.15 16.8L14.8481 13.2028C14.9095 13.1211 14.9535 13.0277 14.9775 12.9284C15.0015 12.8291 15.0049 12.7259 14.9876 12.6252C14.9703 12.5245 14.9325 12.4284 14.8767 12.3428C14.8209 12.2572 14.7482 12.1839 14.6631 12.1274C14.5779 12.0709 14.4821 12.0324 14.3816 12.0143C14.281 11.9961 14.1778 11.9987 14.0783 12.0219C13.9788 12.0451 13.885 12.0884 13.8028 12.1491C13.7206 12.2098 13.6517 12.2867 13.6003 12.375C13.5525 12.463 13.4876 12.5406 13.4093 12.6031C13.3311 12.6656 13.2411 12.7118 13.1447 12.739C13.0483 12.7661 12.9474 12.7737 12.8481 12.7613C12.7487 12.7489 12.6528 12.7166 12.5661 12.6665C12.4794 12.6165 12.4035 12.5495 12.3431 12.4696C12.2827 12.3898 12.2389 12.2986 12.2142 12.2015C12.1896 12.1044 12.1847 12.0034 12.1997 11.9044C12.2148 11.8054 12.2495 11.7104 12.3019 11.625C12.5496 11.1963 12.9319 10.8612 13.3894 10.6718C13.8469 10.4824 14.3541 10.4493 14.8324 10.5774C15.3107 10.7056 15.7333 10.988 16.0348 11.3808C16.3363 11.7736 16.4998 12.2548 16.5 12.75C16.5016 13.2391 16.3421 13.7152 16.0463 14.1047L14.25 16.5H15.75ZM4.5 7.5V4.5H6.75V5.25C6.75 5.44891 6.82902 5.63968 6.96967 5.78033C7.11032 5.92098 7.30109 6 7.5 6C7.69891 6 7.88968 5.92098 8.03033 5.78033C8.17098 5.63968 8.25 5.44891 8.25 5.25V4.5H15.75V5.25C15.75 5.44891 15.829 5.63968 15.9697 5.78033C16.1103 5.92098 16.3011 6 16.5 6C16.6989 6 16.8897 5.92098 17.0303 5.78033C17.171 5.63968 17.25 5.44891 17.25 5.25V4.5H19.5V7.5H4.5Z" 
        fill={fill}
        />

    </svg>
  )
}
