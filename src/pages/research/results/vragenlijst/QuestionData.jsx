import PropTypes from 'prop-types';
import {Button} from "@components";
import Chart from 'chart.js/auto';
import {useEffect, useRef} from "react";

function QuestionData({data, id, setQuestion}) {
    if(id === undefined || id === null || id === '') return;
    const questionNumber = data.findIndex((item) => item.id === id);
    const question = data[questionNumber];

    const nextQuestion = () => setQuestion(data[questionNumber + 1]?.id);
    const prevQuestion = () => setQuestion(data[questionNumber - 1]?.id);

    const nextButton = <Button onClick={nextQuestion} color="secondary" varient="text">Volgende vraag</Button>;
    const prevButton = <Button onClick={prevQuestion} color="secondary" varient="text">Vorige vraag</Button>;

    return <section className='question-info'>
        <h2 className='heading-2'>Vraag {questionNumber + 1}</h2>
        <h3 className='question heading-3'>{question.onderwerp}</h3>

        <div className='awnser-box'>
            <h3 className='heading-3'>Antwoorden</h3>
            <QuestionAnswers type={question.type} answers={question.antwoorden}/>
        </div>

        <div className='button-box'>
            {questionNumber !== 0 && prevButton}
            {questionNumber !== data.length - 1 && nextButton}
        </div>
    </section>
}

function QuestionAnswers({type, answers}) {
    if(type === 'multiple_choice' || type === 'one_choice') {
        return <ChoiceAwnsers data={answers}/>
    }

    return <OpenQuestion data={answers}/>
}

function ChoiceAwnsers({data}) {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        if (chartRef.current && data.length > 0) {
            const counts = data.reduce((acc, entry) => {
                acc[entry.tekst] = (acc[entry.tekst] || 0) + 1;
                return acc;
            }, {});

            const labels = Object.keys(counts);
            const values = Object.values(counts);
            const ctx = chartRef.current.getContext('2d');

            chartInstanceRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Antwoorden',
                        data: values,
                        backgroundColor: ["#2B50EC", "#108670", "#CD4D00", "#131B56"],
                        borderColor: 'transparent',
                        borderWidth: 1,
                    }],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }

        // Cleanup function: destroy the chart when the component is unmounted
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [data]);

    // Function to generate a random color
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div>
            <canvas ref={chartRef} width="400" height="200"></canvas>
        </div>
    );
}


function OpenQuestion({data}) {
    let finalAnswers =  <li className='awnser'> Geen antwoorden</li>

    if(data !== undefined && data.length >= 0) {
        finalAnswers = data.map((item, index) => {
            return <li className="awnser" id={item.id} key={index}>
                <span>{index + 1}.</span>
                {item.tekst}
            </li>
        });
    }

    return (
        <ul className='awnsers'>
            {finalAnswers}
        </ul>
    );
}

export default QuestionData;


QuestionData.propTypes = {
    data: PropTypes.array.isRequired,
    id: PropTypes.string,
    setQuestion: PropTypes.func
};

QuestionAnswers.propTypes = {
    answers: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
};

OpenQuestion.propTypes = {
    data: PropTypes.array.isRequired,
};

ChoiceAwnsers.propTypes = {
    data: PropTypes.array.isRequired,
};