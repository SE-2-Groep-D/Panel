import React, {useEffect} from 'react'
import PropTypes from "prop-types";
import Agenda from "@pages/account/home/component/Agenda.jsx";
import {formatDate} from "@services";

export default function CompanyAgenda({data}) {
    data.sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
      <table>
          <thead>
          <tr>
              <th className='heading-3'>Wat</th>
              <th className='heading-3'>Status</th>
              <th className='heading-3'>Datum</th>
              <th className='heading-3'>Aantal particpanten</th>
          </tr>
          </thead>

          <tbody>
          {data.map((task, i) =>{
              return (
                  <tr key={i}>
                      <td data-label='Wat' className='text'>{task.title}</td>
                      <td data-label='Status' className='text'>{task.status}</td>
                      <td data-label='Datum' className='text'>{formatDate(task.date)}</td>
                      <td data-label='Aantal particpanten' className='text'>{task.participants}</td>
                  </tr>
              )})
          }

          </tbody>
      </table>
  )
}

CompanyAgenda.propTypes = {
    data: PropTypes.array.isRequired
};
