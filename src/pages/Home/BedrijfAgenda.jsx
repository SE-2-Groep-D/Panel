import React from 'react'

export default function BedrijfAgenda({data}) {
  return (
    <table className='page-results'>
                <thead>
                    <tr>
                        <th className='heading-3'>Bedrijf</th>
                        <th className='heading-3'>Scroll percentage</th>
                        <th className='heading-3'>Tijd tot actie</th>
                    </tr>
                </thead>

                <tbody>

                {/* {data.map((results, i) =>{
                     return (
                      <tr key={i}>
                            <td data-label="Pagina" className='text'>{results.page}</td>
                            <td data-label="Scroll percentage" className='text'>{results.scrollPercentage}</td>
                            <td data-label="Tijd tot actie" className='text'>{results.timeToAction}</td>
                      </tr>
                     )
               })} */}

                </tbody>
             </table>
  )
}
