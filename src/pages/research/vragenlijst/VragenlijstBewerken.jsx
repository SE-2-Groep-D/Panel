import {useEffect, useState} from "react";
import {Button, InputField, OptionSelector, Modal, LoadingDiv} from "@components";
import '@pagestyles/research/vragenlijstBewerken.scss';
import {useNavigate, useParams} from "react-router-dom";
import {fetchApi, fetchData} from "@api";
import {faAdd, faEdit, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function VragenlijstBewerken() {

    const [error, setError] = useState('');
    const {vragenlijstId} = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);

    const [newQuestion, setNewQuestion] = useState(
        {
            description: '',
            type: '',
            possibleAnswers: []
        });
    const [questionnaire, setQuestionnaire] = useState({
        title: '',
        description: '',
        questions: []
    });

    function naarHomePage() {
        navigate("/");
    }


    useEffect(() => {
        async function fetchVragenlijst() {
            try {
                const data = await fetchData(`/Vragenlijst/${vragenlijstId}`);
                setQuestionnaire(data); // Set the fetched data
                setLoading(false);
            } catch (error) {
                console.error('Error fetching vragenlijst:', error);
                setLoading(false);
            }
        }

        if (vragenlijstId) {
            fetchVragenlijst();
        }
    }, [vragenlijstId]);

    useEffect(() => {
        console.log(questionnaire);
    }, [questionnaire]);


    const updateVragenlijst = async () => {
        console.log(questionnaire)
        try {
            const response = await fetchApi(`/Vragenlijst/${vragenlijstId}`, 'PUT', questionnaire)
            console.log(response)
        } catch (error) {
            console.error('Error updating vragenlijst:', error);
            // Handle errors
        }
    };

    const verwijderdVraag = (questionIndex) => {
        // het filter de vragen uit de index
        const updatedQuestions = questionnaire.questions.filter((_, index) => index !== questionIndex);
        setQuestionnaire({...questionnaire, questions: updatedQuestions});
    };


    const handleSaveNewQuestion = () => {
        if (!newQuestion.description.trim() || newQuestion.possibleAnswers.some(answer => !answer.value.trim())) {
            setError("Vul alle velden in!");
            return;
        }
        if (newQuestion.type === 'Open' && newQuestion.possibleAnswers.length > 0) {
            setError("Open vragen mogen geen mogelijke antwoorden hebben.");
            return;
        }

        // Check for minimum answers for 'EnkeleKeus' and 'MultipleAnswer'
        if ((newQuestion.type === 'OneAnwer' || newQuestion.type === 'MultipleAnswer') && newQuestion.possibleAnswers.length < 3) {
            setError("EnkeleKeus en MultipleAnswer vragen vereisen minimaal 3 antwoorden.");
            return;
        }

        let updatedQuestions = [...questionnaire.questions];

        if (currentQuestionIndex === questionnaire.questions.length) {

            updatedQuestions.push({
                ...newQuestion,
                possibleAnswers: newQuestion.possibleAnswers.map(answer => ({...answer}))
            });
        } else {
            // Updating an existing question
            updatedQuestions[currentQuestionIndex] = {...newQuestion};
        }
        setError('');
        setQuestionnaire({...questionnaire, questions: updatedQuestions});
        closeModal();
    };

    function handleChangeQuestionnaire({element, value, id}) {
        setQuestionnaire({...questionnaire, [id ? id : element.id]: value});
    }

    function handleChangeQuestion({element, value, id}) {
        setNewQuestion({...newQuestion, [id ? id : element.id]: value});
        setError('');
    }

    const handleChangeAnswer = (event, answerIndex) => {
        const updatedAnswers = currentQuestionIndex === questionnaire.questions.length ?
            newQuestion.possibleAnswers.map((answer, index) =>
                index === answerIndex ? {...answer, value: event.value} : answer
            ) :
            questionnaire.questions[currentQuestionIndex].possibleAnswers.map((answer, index) =>
                index === answerIndex ? {...answer, value: event.value} : answer
            );

        if (currentQuestionIndex === questionnaire.questions.length) {
            setNewQuestion({...newQuestion, possibleAnswers: updatedAnswers});
        } else {
            let updatedQuestions = [...questionnaire.questions];
            updatedQuestions[currentQuestionIndex] = {
                ...updatedQuestions[currentQuestionIndex],
                possibleAnswers: updatedAnswers
            };
            setQuestionnaire({...questionnaire, questions: updatedQuestions});
        }
    };


    const openModal = (index) => {
        if (index < questionnaire.questions.length) {
            setCurrentQuestionIndex(index);
            setNewQuestion({...questionnaire.questions[index]});
            setShowModal(true);
        } else {
            // Reset newQuestion for adding a new question
            setNewQuestion({description: '', type: '', possibleAnswers: []});
            setCurrentQuestionIndex(questionnaire.questions.length);
            setShowModal(true);
        }
    };


    const closeModal = () => {
        setShowModal(false);
    };



    const handleChangeAnswerModal = (event, answerIndex) => {
        const updatedAnswers = newQuestion.possibleAnswers.map((answer, index) =>
            index === answerIndex ? {...answer, value: event.value} : answer
        );
        setNewQuestion({...newQuestion, possibleAnswers: updatedAnswers});
    };


    const handleAddAnswerModal = () => {
        setNewQuestion({...newQuestion, possibleAnswers: [...newQuestion.possibleAnswers, {value: ''}]});
    };


    const handleRemoveAnswerModal = (answerIndex) => {
        const updatedAnswers = newQuestion.possibleAnswers.filter((_, index) => index !== answerIndex);
        setNewQuestion({...newQuestion, possibleAnswers: updatedAnswers});
    };


    if (loading) {
        return <LoadingDiv loading={true}/>;
    }

    return (
        <>
            <main className={`gray`}>
                <div className="onderzoek-tabel">
                    <div className="onderzoek-info">
                        <div className="titel">
                            <h1 className="content-titel-bewerken heading-1">Vragenlijst Bewerken</h1>
                        </div>
                        < div className="vragenlijst-info-bewerken">
                            <InputField
                                id="title"
                                label="Vraag Titel"
                                value={questionnaire.title}
                                onChange={handleChangeQuestionnaire}
                                placeholder="Vragenlisjt Naam"
                            >Vragenlisjt Naam</InputField>
                            <InputField
                                id="description"
                                label="Vragenlisjt Beschrijving"
                                value={questionnaire.description}
                                onChange={handleChangeQuestionnaire}
                                placeholder="Vragenlisjt Beschrijving">
                                Beschrijving
                            </InputField>
                        </div>
                    </div>
                    <div className="vraaglijst-items">
                        {questionnaire.questions.map((question, index) => (
                            <div className="vraaglijst-item" key={question.id}>
                                <div className="vraagitem">
                                    <div className="heading-3">{`Vraag ${index + 1}`}</div>
                                    <div className="text">{question.description}</div>
                                </div>
                                <div className="content-right-bewerken">
                                    <p id="tpye" className="text-small">Vraag Type: {question.type}</p>
                                    <div className="action-button-vragen">
                                        <Button label='Klik op deze knop om vraag te verwijderen.' className="antworden-delete"
                                                onClick={() => verwijderdVraag(index)}><FontAwesomeIcon
                                            icon={faTrash}/></Button>
                                        <Button label='Klik op deze knop om vraag te wijzigen.' color='secondary'
                                                onClick={() => openModal(index)}> <FontAwesomeIcon
                                            icon={faEdit}/></Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="button-div">
                            <Button className="vraag-maken" onClick={() => openModal(questionnaire.questions.length)}>
                                Voeg een vraag toe
                            </Button>
                        </div>
                        <div className="vragenlist-savebutton">
                            <Button className="" onClick={() => updateVragenlijst()}>
                                Sla Bewerkte Vragenlijst Op
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            {showModal && (
                <Modal
                    open={showModal}
                    onClose={closeModal}
                    animation="bottom"
                    className="large-modal"
                >
                    <div className="modal-content">
                        {currentQuestionIndex !== null && currentQuestionIndex < questionnaire.questions.length ? (
                            <>
                                <h3>Bewerkt Vraag {currentQuestionIndex + 1}</h3>
                                <InputField
                                    label="Question Description"
                                    value={newQuestion.description}
                                    onChange={(e) => setNewQuestion({...newQuestion, description: e.value})}
                                >Vraag</InputField>
                                <OptionSelector
                                    onChange={(e) => setNewQuestion({...newQuestion, type: e.value})}
                                    options={['Open', 'OneAnwer', 'MultipleAnswer']}
                                    value={newQuestion.type}
                                >
                                    Question Type
                                </OptionSelector>

                                {newQuestion.possibleAnswers.map((answer, answerIndex) => (
                                    <div key={answerIndex} className="antworden-div">
                                        <InputField
                                            value={answer.value}
                                            onChange={(e) => handleChangeAnswerModal(e, answerIndex)}
                                        />
                                        <Button className="antworden-delete"
                                                onClick={() => handleRemoveAnswerModal(answerIndex)}> <FontAwesomeIcon
                                            icon={faTrash}/></Button>
                                    </div>
                                ))}
                                {error && <div className="error-message">{error}</div>}
                                <Button onClick={handleAddAnswerModal}
                                        label='Klik op deze knop om een nieuw antworden toe te voegen.'
                                        color='secondary'>Antwoord Toevoegen <FontAwesomeIcon icon={faAdd}/></Button>
                                <Button onClick={handleSaveNewQuestion}
                                        label='Klik op deze knop om een wijzingen opslaan.' color='tertiary'>Sla
                                    wijzingen op <FontAwesomeIcon icon={faSave}/></Button>
                            </>
                        ) : (
                            <>
                                <h3 className="heading-3">Nieuwe vraag toevoegen</h3>

                                <InputField
                                    id="description"
                                    label="Vraag Titel"
                                    value={newQuestion.description}
                                    onChange={handleChangeQuestion}
                                    placeholder="Vraag"
                                    required
                                />
                                <OptionSelector
                                    id="type"
                                    value={newQuestion.type}
                                    onChange={handleChangeQuestion}
                                    options={['Open', 'OneAnwer', 'MultipleAnswer']}
                                    required
                                />
                                {newQuestion.possibleAnswers.map((answer, answerIndex) => (
                                    <div key={answerIndex} className="antworden-div">
                                        <InputField
                                            key={answerIndex}
                                            value={answer.value || ''}
                                            onChange={(e) => handleChangeAnswer(e, answerIndex)}

                                        />
                                        <Button className="antworden-delete"
                                                onClick={() => handleRemoveAnswerModal(answerIndex)}> <FontAwesomeIcon
                                            icon={faTrash}/></Button>
                                    </div>
                                ))}


                                {error && <div className="error-message">{error}</div>}
                                <div className="vragenlijst-button-div">
                                    {(newQuestion.type === 'OneAnwer' || newQuestion.type === 'MultipleAnswer') && (
                                        <Button label='Klik op deze knop om een nieuw antworden toe te voegen.'
                                                color='secondary' onClick={() => setNewQuestion(prev => ({
                                            ...prev,
                                            possibleAnswers: [...prev.possibleAnswers, {value: ''}]
                                        }))}>
                                            Voeg antwoord toe <FontAwesomeIcon icon={faAdd}/>
                                        </Button>
                                    )}
                                    <Button label='Klik op deze knop om vraag aan te maken.' color='tertiary'
                                            onClick={handleSaveNewQuestion}>Opslaan <FontAwesomeIcon
                                        icon={faSave}/></Button>
                                </div>
                            </>
                        )}

                    </div>
                </Modal>
            )}

        </>
    );
}

export default VragenlijstBewerken;
