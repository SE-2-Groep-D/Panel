import {useForm} from "@pages/research/create/data/useForm.jsx";
import { useState} from "react";
import {Button, InputField, OptionSelector, Modal, LoadingDiv} from "@components";
import '@pagestyles/research/vragenlijstBewerken.scss';

import {VragenlijstAanmaken} from "@pages/research/create/request/VragenlijstAanmaken.jsx";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faEdit, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import DynamicModal from "@pages/research/componenten/DynamicModal.jsx";

function OnderzoekStapDrie() {
    const {state} = useForm();
    const [error, setError] = useState('');
    const [move, setMove] = useState("moveIn");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const onderzoekId = state.onderzoek.id;
    const onderzoekNaam = state.onderzoek.titel;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
    const [newQuestion, setNewQuestion] = useState(
        {
            description: '',
            type: '',
            possibleAnswers: []});
    const [questionnaire, setQuestionnaire] = useState({
        title: '',
        description: '',
        questions: [],
        onderzoekId: onderzoekId
    });


    function naarHomePage() {
        navigate("/");
    }

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
    }
        function handleChangeQuestionnaire({element, value, id}) {
        setQuestionnaire({...questionnaire, [id ? id : element.id]: value});
    }

    function handleChangeQuestion({element, value, id}) {
        setNewQuestion({...newQuestion, [id ? id : element.id]: value});
        setError('');
    }

    function vragenLijstOpslaan(){
         VragenlijstAanmaken(questionnaire);
        showSuccessModal('Vragenlijst is succesvol Aangemakt')
        //naarHomePage();
    }

    const redirectToHome = () => {
        navigate('/');
    };


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



    const showSuccessModal = (message) => {
        setModalMessage(message);
        setIsModalOpen(true);
    };





    return (
        <>
                <div className="vargenlijst-tabel">
                    <div className="Vragenlisjt-info">
                        <div className="titel">
                            <h1 className="content-titel-bewerken heading-1">{onderzoekNaam}</h1>
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
                                        <Button label='Klik op deze knop om vraag te verwijderen.' className="antworden-buttons"
                                                onClick={() => verwijderdVraag(index)}><FontAwesomeIcon icon={faTrash} style={{ color: 'black' }}/></Button>
                                        <Button label='Klik op deze knop om vraag te wijzigen.' className="antworden-buttons"
                                                onClick={() => openModal(index)}> <FontAwesomeIcon
                                            icon={faEdit} style={{ color: 'black' }}/></Button>
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
                            <Button className="" onClick={() => vragenLijstOpslaan()}>
                                Opslaan
                            </Button>
                        </div>
                    </div>
                </div>

            <div className="vragelijst-modal">
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
                                    <div className="vragenlijst-informatie-bewerken">
                                        <InputField
                                            label="Question Description"
                                            value={newQuestion.description}
                                            onChange={(e) => setNewQuestion({...newQuestion, description: e.value})}
                                        >{currentQuestionIndex + 1}. Vraag</InputField>
                                        <OptionSelector
                                            onChange={(e) => setNewQuestion({...newQuestion, type: e.value})}
                                            options={['Open', 'OneAnwer', 'MultipleAnswer']}
                                            value={newQuestion.type}
                                        >
                                            Vraag Type
                                        </OptionSelector>
                                    </div>
                                    <h3>Antworden:</h3>
                                    {newQuestion.possibleAnswers.map((answer, answerIndex) => (
                                        <div key={answerIndex} className="antworden-div">
                                            <InputField
                                                value={answer.value}
                                                onChange={(e) => handleChangeAnswerModal(e, answerIndex)}
                                            >{answerIndex + 1}</InputField>
                                            <Button className="antworden-delete"
                                                    onClick={() => handleRemoveAnswerModal(answerIndex)}>
                                                <FontAwesomeIcon style={{color: 'black'}}
                                                                 icon={faTrash}/></Button>
                                        </div>
                                    ))}
                                    {error && <div className="error-message">{error}</div>}
                                    <Button onClick={handleAddAnswerModal} className="antwoord-add"
                                            label='Klik op deze knop om een nieuw antworden toe te voegen.'
                                    >Antwoord Toevoegen <FontAwesomeIcon icon={faAdd}/></Button>
                                    <Button onClick={handleSaveNewQuestion} color='secondary'
                                            label='Klik op deze knop om een wijzingen opslaan.'>Opslaan <FontAwesomeIcon icon={faSave}/></Button>
                                </>
                            ) : (
                                <>

                                    <div className="vragenlijst-informatie-bewerken">
                                        <InputField
                                            id="description"
                                            label="Vraag Titel"
                                            value={newQuestion.description}
                                            onChange={handleChangeQuestion}
                                            placeholder="Vraag"
                                            required
                                        >Vraag</InputField>
                                        <OptionSelector
                                            id="type"
                                            value={newQuestion.type}
                                            onChange={handleChangeQuestion}
                                            options={['Open', 'OneAnwer', 'MultipleAnswer']}
                                            required
                                        >Vraag Type</OptionSelector>
                                    </div>
                                    <h3>Antworden:</h3>
                                    {newQuestion.possibleAnswers.map((answer, answerIndex) => (
                                        <div key={answerIndex}className="antworden-div" >
                                            <InputField
                                                key={answerIndex}
                                                value={answer.value || ''}
                                                onChange={(e) => handleChangeAnswer(e, answerIndex)}

                                            >{answerIndex+1}</InputField>
                                            <Button className="antworden-delete"
                                                    onClick={() => handleRemoveAnswerModal(answerIndex)}>
                                                <FontAwesomeIcon style={{color: 'black'}}
                                                                 icon={faTrash}/></Button>
                                        </div>
                                    ))}
                                    {error && <div className="error-message">{error}</div>}
                                    <div className="vragenlijst-button-div">

                                        <Button label='Klik op deze knop om een nieuw antworden toe te voegen.'
                                                className="antwoord-add" onClick={() => setNewQuestion(prev => ({
                                            ...prev,
                                            possibleAnswers: [...prev.possibleAnswers, {value: ''}]
                                        }))}>
                                            Voeg antwoord toe <FontAwesomeIcon icon={faAdd}/>
                                        </Button>

                                        <Button label='Klik op deze knop om het op te slaan.' color='secondary'
                                                onClick={handleSaveNewQuestion}>Opslaan <FontAwesomeIcon
                                            icon={faSave}/></Button>
                                    </div>
                                </>
                            )}

                        </div>
                    </Modal>

                )}
            </div>
            <DynamicModal
                isOpen={isModalOpen}
                message={modalMessage}
                onRedirect={redirectToHome}
                onClose={() => setIsModalOpen(false)}
                redirectLabel="Ga naar Home"
            />

        </>
    );
    }

export default OnderzoekStapDrie;
