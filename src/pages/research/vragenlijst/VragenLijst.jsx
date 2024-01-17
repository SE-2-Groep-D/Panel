import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "@hooks";
import { Button, LoadingDiv } from "@components";
import { GetVragenlijst } from "@pages/research/vragenlijst/request/GetVragenlijst.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import '@pagestyles/research/vragenlijst.scss';

function VragenLijst() {
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { onderzoekId } = useParams();
    const [vragenlijst, setVragenlijst] = useState([]);
    const [answers, setAnswers] = useState([]);

    const goToHomePage = () => {
        navigate(`/`);
    };

    useEffect(() => {
        async function fetchVragenlijst() {
            try {
                const data = await GetVragenlijst(onderzoekId);
                setVragenlijst(data);
            } catch (error) {
                console.error('Error fetching vragenlijst:', error);
            }
            setLoading(false);
        }

        if (onderzoekId) {
            fetchVragenlijst();
        }
    }, [onderzoekId]);

    const handleInputChange = (questionId, value, isMultiple) => {
        setAnswers(prevAnswers => {
            // Find the existing answer
            const existingAnswer = prevAnswers.find(answer => answer.questionId === questionId);

            // If it's a multiple answer question and there's already an entry
            if (isMultiple && existingAnswer) {
                // Check if the value is already in the array
                const isValueSelected = existingAnswer.value.includes(value);
                // Add or remove the value from the array
                return prevAnswers.map(answer => {
                    if (answer.questionId === questionId) {
                        if (isValueSelected) {
                            // Filter out the unselected value
                            return {
                                ...answer,
                                value: answer.value.filter(item => item !== value)
                            };
                        } else {
                            // Add the selected value
                            return {
                                ...answer,
                                value: [...answer.value, value]
                            };
                        }
                    }
                    return answer;
                });
            } else {
                // For non-multiple answer questions or new entries
                return [
                    ...prevAnswers.filter(answer => answer.questionId !== questionId),
                    { questionId, value: isMultiple ? [value] : value }
                ];
            }
        });
    };


    const handleSaveAnswers = () => {
        // Here you can now use the `answers` state to send to an API or store it

        const payload = {
            answers: answers.map(answer => ({
                questionId: answer.questionId,
                value: Array.isArray(answer.value) ? answer.value.join(', ') : answer.value
                // Join array values with a separator if needed, or adjust according to your API requirements
            }))
        };

        console.log('Answers to save:', payload);

        // Example: POST to an API endpoint
        // You would replace the URL with your actual endpoint and set up the request as needed
        /*
        fetch('YOUR_API_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answers }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        */
    };

    return (
        <main>
            <LoadingDiv loading={loading}>
                <div className="container">
                    {vragenlijst && (
                        <>
                            <div className="vragenlijst-content">
                                <div className='navigation'>
                                    <a href={`/onderzoek/`} className='back'>
                                        <FontAwesomeIcon icon={faChevronLeft} />
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
                                            <div key={question.id} className="vragenlijst-question">
                                                <p className="text-big">{question.description}</p>
                                                {question.type === "Open" && (
                                                    <input
                                                        type="text"
                                                        placeholder="Jouw antwoord"
                                                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                                                    />
                                                )}
                                                {question.possibleAnswers && question.possibleAnswers.map((answer, aIndex) => (
                                                    <div key={answer.id} className="vragenlijst-answer">
                                                        {question.type === "OneAnwer" ? (
                                                            <input
                                                                type="radio"
                                                                id={`question_${question.id}_answer_${answer.id}`}
                                                                name={`question_${question.id}`}
                                                                value={answer.value}
                                                                onChange={(e) => handleInputChange(question.id, answer.value, false)} // Pass `false` for single answer type
                                                            />
                                                        ) : question.type === "MultipleAnswer" ? (
                                                            <input
                                                                type="checkbox"
                                                                id={`question_${question.id}_answer_${answer.id}`}
                                                                name={`answer_${answer.id}`}
                                                                value={answer.value}
                                                                onChange={(e) => handleInputChange(question.id, answer.value, true)} // Pass `true` for multiple answer type
                                                            />
                                                        ) : null}
                                                        <label htmlFor={`question_${question.id}_answer_${answer.id}`}
                                                               className="text-small">
                                                            {answer.value}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}

                                        <div className="container">
                                            {/* ... (Other JSX elements) */}
                                            <Button onClick={handleSaveAnswers}>Save Answers</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </LoadingDiv>
        </main>
    );
}

export default VragenLijst;
