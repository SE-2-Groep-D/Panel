import {useForm} from "@pages/research/create/data/useForm.jsx";
import {useEffect, useState} from "react";
import {Button, Form, InputField, LoadingDiv, OptionSelector} from "@components";
import '@pagestyles/research/OnderzoekStapDrie.scss';
import Modal from 'react-modal';

function OnderzoekStapDrie() {
    const {state, nextStep} = useForm();
    const [move, setMove] = useState("moveIn");
    const onderzoekId = state.onderzoek.id;
    const onderzoekNaam = state.onderzoek.titel;
    const [showModal, setShowModal] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
    const [questionnaire, setQuestionnaire] = useState({
        title: 'Voorbeeld Titel',
        description: 'Voorbeeld beschrijving van het onderzoek.',
        questions: [
            {
                title: 'Wat is uw leeftijd?',
                type: 'openvraag',
                possibleAnswers: []
            },
            {
                title: 'Wat is uw favoriete kleur?',
                type: 'enkelekeus',
                possibleAnswers: [{answertext: 'Rood'}, {answertext: 'Groen'}, {answertext: 'Blauw'}]
            }
        ],
        onderzoekId: '12345' // Replace with the actual onderzoekId from your state or backend
    });


    /* const [questionnaire, setQuestionnaire] = useState({
         title: '',
         description: '',
         questions: [],
         onderzoekId: '' // This should be set based on the specific investigation ID
     });*/

    // Function to handle changes to the questionnaire title and description
    const handleQuestionnaireChange = (name, value) => {
        setQuestionnaire(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Function to handle adding a new question
    const handleAddQuestion = () => {
        const newQuestion = {
            title: '',
            type: '',
            possibleAnswers: []
        };
        setQuestionnaire(prev => ({
            ...prev,
            questions: [...prev.questions, newQuestion]
        }));
    };

    // Function to handle changes to the questions array, including title, type, and possibleAnswers
    const handleQuestionChange = (index, name, value) => {
        setQuestionnaire(prev => {
            const updatedQuestions = prev.questions.map((question, i) => {
                if (i === index) {
                    return {...question, [name]: value};
                }
                return question;
            });
            return {...prev, questions: updatedQuestions};
        });
    };

    const openModal = (index) => {
        setCurrentQuestionIndex(index);
        setShowModal(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
        setCurrentQuestionIndex(null);
    };

    // Function to add a possible answer to a specific question
    const handleAddPossibleAnswer = (questionIndex) => {
        setQuestionnaire(prev => {
            const updatedQuestions = prev.questions.map((question, i) => {
                if (i === questionIndex) {
                    return {
                        ...question,
                        possibleAnswers: [...question.possibleAnswers, {answertext: ''}]
                    };
                }
                return question;
            });
            return {...prev, questions: updatedQuestions};
        });
    };
    useEffect(() => {
        Modal.setAppElement('#root'); // Assuming your root element has an id of 'root'
    }, []);

    // Function to handle changes to the possible answers for a specific question
    const handlePossibleAnswerChange = (questionIndex, answerIndex, value) => {
        setQuestionnaire(prev => {
            const updatedQuestions = prev.questions.map((question, i) => {
                if (i === questionIndex) {
                    const updatedAnswers = question.possibleAnswers.map((answer, j) => {
                        if (j === answerIndex) {
                            return {...answer, answertext: value};
                        }
                        return answer;
                    });

                    return {...question, possibleAnswers: updatedAnswers};
                }
                return question;
            });
            return {...prev, questions: updatedQuestions};
        });
    };

    return (
        <>
            <div className={`gray`}>
                <div className="onderzoek-tabel">
                    <div className="onderzoek-info">
                        <div className="titel">
                            <div className="content-titel heading-1">{onderzoekNaam}</div>
                        </div>
                    </div>
                    <div className="vraaglijst-items">
                        {questionnaire.questions.map((question, index) => (
                            <div className="vraaglijst-item" key={index}>
                                <div className="vraagitem">
                                    <div className="heading-3">{`Vraag ${index + 1}`}</div>
                                    <div className="text">{question.title}</div>
                                </div>
                                {question.type === 'enkelekeus' &&
                                    (
                                        <div className="content-right">
                                            <OptionSelector
                                                id="type"
                                                value={question.type}
                                                onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                                                options={['openvraag', 'enkelekeus', 'meerkeuze']}
                                                required
                                            />
                                            <div className="button-div">
                                                <Button onClick={() => openModal(index)}>Voeg antwoord toe</Button>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        ))}
                        <div className="button-div">
                            <Button onClick={() => openModal(questionnaire.questions.length)}>
                                Voeg een vraag toe
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <Modal
                    isOpen={showModal}
                    onRequestClose={closeModal}
                    // ... other modal properties like style or contentLabel
                >
                    <div className="modal-content">
                        {currentQuestionIndex !== null && currentQuestionIndex < questionnaire.questions.length ? (
                            <>
                                <h3>Antwoord vraag {currentQuestionIndex + 1}</h3>
                                <InputField
                                    label="Vraag"
                                    value={questionnaire.questions[currentQuestionIndex].title}
                                    onChange={(e) => handleQuestionChange(currentQuestionIndex, 'title', e.target.value)}
                                />
                                {questionnaire.questions[currentQuestionIndex].possibleAnswers.map((answer, answerIndex) => (
                                    <InputField
                                        key={answerIndex}
                                        label={`Antwoord ${answerIndex + 1}`}
                                        value={answer.answertext}
                                        onChange={(e) => handlePossibleAnswerChange(currentQuestionIndex, answerIndex, e.target.value)}
                                    />
                                ))}
                                <Button onClick={() => handleAddPossibleAnswer(currentQuestionIndex)}>
                                    Voeg antwoord toe
                                </Button>
                            </>
                        ) : (
                            <>
                                <h3>Nieuwe vraag toevoegen</h3>
                                {/* Input fields for adding a new question */}
                            </>
                        )}
                        <div className="button-div">
                            <Button onClick={closeModal}>Sluit</Button>
                            <Button onClick={() => {/* logic to handle save */
                            }}>
                                Opslaan
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}

        </>
    );
}

export default OnderzoekStapDrie;
