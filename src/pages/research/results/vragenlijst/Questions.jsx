import PropTypes from "prop-types";
import {useIntersectionObserver} from "@hooks";

function Questions({data, setQuestion }) {
    const [ref, inView] = useIntersectionObserver();

    if(data === null || data === undefined || data.length == 0) {
        return <div className='questions'>
            <h2 className='heading-2'>Vragenlijst</h2>
            <p className='text'>Nog geen vragen gevonden.</p>
        </div>
    }

    function selectedQuestion(event) {
        if(event.type !== 'click' && event.type !== 'keydown') return;
        if(event.type === 'keydown') {
            if(event.key !== 'Enter' && event.keyCode !== 32 && event.keyCode !== 13) return;
        }

        const { id } = event.currentTarget;
        setQuestion(id);
    }

    return (
        <section ref={ref} className={(inView) ? 'questions moveIn bottom' : 'questions'}>
            <table >
                <thead>
                <tr>
                    <th className='heading-3'>Vraag</th>
                    <th className='heading-3'>Aantal antwoorden</th>
                </tr>
                </thead>
                <tbody>
                {data.map((question, i) => {
                    i++;
                    return (
                        <tr
                            tabIndex={0}
                            id={question.id}
                            key={i}
                            aria-label={`Klik met de muis of druk op enter om meer informatie te zien over vraag ${i}.`}
                            onClick={selectedQuestion}
                            onKeyDown={selectedQuestion}
                        >
                            <td data-label="Vraag" className='text bold'>
                                <span className='number bold'>{i}</span>
                                {question.description}
                            </td>
                            <td data-label="Aantal antwoorden" className='text bold'> {question.totalAnswers} </td>
                        </tr>

                    )
                })}
                </tbody>
            </table>
        </section>
    );
}

export default Questions;

Questions.propTypes = {
    data: PropTypes.array.isRequired,
    setQuestion: PropTypes.func.isRequired
};