import PropTypes from 'prop-types';
import {formatDate, sortObjectByDate} from "@utils";

export default function Agenda({data}) {
    data = sortObjectByDate(data);

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
        {data.map((task, i) =>{
          return (
            <tr key={i}>
              <td data-label='Bedrijf' className='text'>{task.company}</td>
              <td data-label='Wat' className='text'>{task.title}</td>
              <td data-label='Wanneer' className='text'>{formatDate(task.date)}</td>
            </tr>
          )})
        }

      </tbody>
    </table>
  )
}

Agenda.propTypes = {
  data: PropTypes.array.isRequired
};
