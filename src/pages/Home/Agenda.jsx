import React from 'react'

export default function Agenda({data}) {
  return (
    <table>
                <thead>
                    <tr>
                        <th className='heading-3'>Bedrijf</th>
                        <th className='heading-3'>Wat</th>
                        <th className='heading-3'>Wanneer</th>
                    </tr>
                </thead>

                <tbody>

                {data.map((results, i) =>{
                     return (
                      <tr key={i}>
                            <td data-label="Pagina" className='text'>{results.page}</td>
                            <td data-label="Scroll percentage" className='text'>{results.scrollPercentage}</td>
                            <td data-label="Tijd tot actie" className='text'>{results.timeToAction}</td>
                      </tr>
                     )
               })}

                </tbody>
             </table>
  )
}
