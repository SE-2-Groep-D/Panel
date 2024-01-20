import  {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {Button, LoadingDiv} from "@components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import '@pagestyles/research/vragenlijst.scss';
import {SendVragenlijst} from "@pages/research/vragenlijst/response/SendVragenlijst.jsx";
import {fetchData} from "@api";
import DynamicModal from "@pages/research/componenten/DynamicModal.jsx";

function VragenLijst() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const {vragenlijstId} = useParams();
    const [vragenlijst, setVragenlijst] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleModalClose = () => {
        navigate('/');
    };

    useEffect(() => {
        async function fetchVragenlijst() {
            try {
                const data = await fetchData(`/Vragenlijst/${vragenlijstId}`);
                setVragenlijst(data);
            } catch (error) {
                console.error('Error fetching vragenlijst:', error);
            }
            setLoading(false);
        }

        if (vragenlijstId) {
            fetchVragenlijst();
        }
    }, [vragenlijstId]);

    const handleInputChange = (questionId, value, isMultiple) => {
        setAnswers(prevAnswers => {

            const existingAnswer = prevAnswers.find(answer => answer.questionId === questionId);

            if (isMultiple && existingAnswer) {

                const isValueSelected = existingAnswer.value.includes(value);

                return prevAnswers.map(answer => {
                    if (answer.questionId === questionId) {
                        if (isValueSelected) {

                            return {
                                ...answer,
                                value: answer.value.filter(item => item !== value)
                            };
                        } else {

                            return {
                                ...answer,
                                value: [...answer.value, value]
                            };
                        }
                    }
                    return answer;
                });
            } else {

                return [
                    ...prevAnswers.filter(answer => answer.questionId !== questionId),
                    {questionId, value: isMultiple ? [value] : value}
                ];
            }
        });
    };


    const handleSaveAnswers = () => {
        const allAnswered = vragenlijst.questions.every(question =>
            answers.some(answer => answer.questionId === question.id && answer.value)
        );

        if (!allAnswered) {
            setErrorMessage("Vul alle vragen in voordat u opslaat.");
            return;
        }
        const vragenlijstId = vragenlijst.id

        const data = {
            answers: answers.map(answer => ({
                questionId: answer.questionId,
                value: Array.isArray(answer.value) ? answer.value.join(', ') : answer.value

            }))
        };
        SendVragenlijst(vragenlijstId, data)
        setShowModal(true);
    };

    // Deze functie zet een index om in een letter (A, B, C, ...)
    const indexToLetter = (index) => {
        return String.fromCharCode(65 + index);
    };

// Deze functie zet een index om in een nummer (1, 2, 3, ...)
    const indexToNumber = (index) => {
        return index + 1;
    };

    return (
        <main className="vragenlist-invullen">
            <LoadingDiv loading={loading}>
                <div className="container-vragenlijst">
                    {vragenlijst && (
                        <>
                            <div className="vragenlijst-content">
                                <div className='navigation'>
                                    <a href={`/onderzoek/`} className='back'>
                                        <FontAwesomeIcon icon={faChevronLeft}/>
                                        Terug
                                    </a>
                                </div>
                                <div className="vragenlijst-div">
                                    <div className="vragenlijst">
                                        <div className="vragenlijst-titel">
                                            <h1 className="heading-1">{vragenlijst.title}</h1>
                                        </div>
                                        <div className="vragenlijst-description">
                                            <h3 className="heading-3">{vragenlijst.description}</h3>
                                        </div>
                                        {vragenlijst.questions && vragenlijst.questions.map((question, qIndex) => (
                                            <div key={question.id} className="vragenlijst-vragen">
                                                {/* Gebruik indexToNumber om de vraagnummer weer te geven */}
                                                <p className="text-big"><span
                                                    className="vraag-nummer"> {indexToNumber(qIndex)}. </span>{question.description}
                                                </p>

                                                <div className="antwordenlijst">
                                                    {question.type === "Open" && (
                                                        <input
                                                            type="text"
                                                            placeholder="Type hier je antwoord in "
                                                            onChange={(e) => handleInputChange(question.id, e.target.value)}
                                                        />
                                                    )}
                                                    {question.possibleAnswers && question.possibleAnswers.map((answer, aIndex) => (
                                                        <div key={answer.id} className="vragenlijst-answer">
                                                            {/* Gebruik indexToLetter voor de antwoordletter */}
                                                            <label
                                                                htmlFor={`question_${question.id}_answer_${answer.id}`}
                                                                className="text-small">
                                                                {question.type === "OneAnwer" ? (
                                                                    <>
                                                                        <input
                                                                            type="radio"
                                                                            id={`question_${question.id}_answer_${answer.id}`}
                                                                            name={`question_${question.id}`}
                                                                            value={answer.value}
                                                                            onChange={(e) => handleInputChange(question.id, answer.value, false)}
                                                                        />
                                                                        {indexToLetter(aIndex)}. {answer.value}
                                                                    </>
                                                                ) : question.type === "MultipleAnswer" ? (
                                                                    <>
                                                                        <input
                                                                            type="checkbox"
                                                                            id={`question_${question.id}_answer_${answer.id}`}
                                                                            name={`answer_${answer.id}`}
                                                                            value={answer.value}
                                                                            onChange={(e) => handleInputChange(question.id, answer.value, true)}
                                                                        />
                                                                        {indexToLetter(aIndex)}. {answer.value}

                                                                    </>
                                                                ) : null}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                        <p className="text error-message">{errorMessage}</p>
                                        <div className="opslaan-knop">
                                            {/* ... (Other JSX elements) */}
                                            <Button onClick={handleSaveAnswers}>Opslaan</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </LoadingDiv>
            <DynamicModal
                isOpen={showModal}
                message="U heeft de vragenlijst succesvol beantwoord."
                onClose={handleModalClose}
                onRedirect={handleModalClose}
                redirectLabel="Ga naar Home"
            />
        </main>
    );
}

export default VragenLijst;
