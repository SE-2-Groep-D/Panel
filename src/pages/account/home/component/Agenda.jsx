import PropTypes from 'prop-types';
import {formatDate, sortObjectByDate} from "@utils";
import {useNavigate} from "react-router-dom";

export default function Agenda({data}) {
    const navigate = useNavigate();
    data = sortObjectByDate(data);

    function goToInfoPage(id) {
        navigate(`/onderzoek/${id}`);
    }

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
            <tr     key={i}
                    id={task.id}
                    className='clickable'
                    onClick={() => goToInfoPage(task.id)}
                    onKeyDown={(e) => e.key === 'Enter' && goToInfoPage(task.id)}
                    tabIndex={0}
                    role="button"
            >
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
