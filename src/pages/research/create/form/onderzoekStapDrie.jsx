import {useForm} from "@pages/research/create/data/useForm.jsx";
import {useEffect, useState} from "react";
import {Button, Form, InputField, OptionSelector, Modal} from "@components";
import '@pagestyles/research/OnderzoekStapDrie.scss';


function OnderzoekStapDrie() {
    const {state} = useForm();
    const [move, setzMove] = useState("moveIn");
    const onderzoekId = state.onderzoek.id;
    const onderzoekNaam = state.onderzoek.titel;
    const [showModal, setShowModal] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
    const [newQuestion, setNewQuestion] = useState(
        {
            title: '',
            type: '',
            possibleAnswers: []});

    const [answer, setAnswer] = useState(
        {
        answerText:''

        });

    const [questionnaire, setQuestionnaire] = useState({
        title: '',
        description: '',
        questions: [],
        onderzoekId: onderzoekId
    });


    const handleSaveNewQuestion = () => {
        let updatedQuestions = questionnaire.questions.slice(); // Create a copy of the questions array

        if (currentQuestionIndex !== null && currentQuestionIndex < updatedQuestions.length) {
            // Update existing question
            updatedQuestions[currentQuestionIndex] = {...newQuestion};
        } else {
            // Add new question
            updatedQuestions.push({...newQuestion});
        }

        setQuestionnaire({...questionnaire, questions: updatedQuestions});
        setNewQuestion({ title: '', type: '', possibleAnswers: [] });
        console.log(questionnaire.questions)
        closeModal();
    };


    function handleChangeQuestionnaire({element, value, id}) {
        setQuestionnaire({...questionnaire, [id ? id : element.id]: value});
    }

    function handleChangeQuestion({element, value, id}) {
        setNewQuestion({...newQuestion, [id ? id : element.id]: value});

    }
    const handleChangeAnswer = (event, questionIndexOrAnswerIndex, answerIndex) => {
        const { value } = event.target;

        if (typeof answerIndex === 'undefined') {
            // Updating an answer in newQuestion.possibleAnswers
            const updatedAnswers = newQuestion.possibleAnswers.map((answer, index) =>
                index === questionIndexOrAnswerIndex ? { ...answer, answertext: value } : answer
            );
            setNewQuestion(prev => ({ ...prev, possibleAnswers: updatedAnswers }));
        } else {
            // Updating an answer in questionnaire.questions[currentQuestionIndex].possibleAnswers
            const updatedQuestionnaire = {...questionnaire};
            updatedQuestionnaire.questions = [...questionnaire.questions];
            updatedQuestionnaire.questions[questionIndexOrAnswerIndex].possibleAnswers =
                updatedQuestionnaire.questions[questionIndexOrAnswerIndex].possibleAnswers.map((answer, index) =>
                    index === answerIndex ? { ...answer, answertext: value } : answer
                );
            setQuestionnaire(updatedQuestionnaire);
        }
    };
    const openModal = (index) => {
        if (index < questionnaire.questions.length) {
            console.log("low")
            setCurrentQuestionIndex(index);
            setShowModal(true);
        } else {
            console.log("test")
            console.log(index)
            handleAddNewQuestion();
        }
    };


    const handleAddNewQuestion = () => {
        setCurrentQuestionIndex(questionnaire.questions.length+1);
        console.log(questionnaire.questions.length+" ozan");
        console.log(currentQuestionIndex+"can");
        setShowModal(true);
        setQuestionnaire(prev => ({
            ...prev,
            questions: [...prev.questions, {title: '', type: '', possibleAnswers: []}]
        }));
    };


    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
    //    setCurrentQuestionIndex(null);
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
                                                onChange={handleChangeQuestion}
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
                            <Button className="vraag-maken" onClick={() => openModal(questionnaire.questions.length)}>
                                Voeg een vraag toe
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <Modal
                    open={showModal}
                    onClose={closeModal}
                    animation="bottom"
                >
                    <div className="modal-content">
                        {currentQuestionIndex !== null && currentQuestionIndex < questionnaire.questions.length ? (
                            <>
                                <h3>Antwoord vraag {currentQuestionIndex + 1}</h3>
                                <InputField
                                    label="Vraag"
                                    value={questionnaire.questions[currentQuestionIndex].title}
                                    onChange={handleChangeQuestion}
                                />
                                {questionnaire.questions[currentQuestionIndex].possibleAnswers.map((answer, answerIndex) => (
                                    <input
                                        key={answerIndex}
                                        value={answer.answertext}
                                        onChange={(e) => handleChangeAnswer(e, currentQuestionIndex, answerIndex)}

                                    />
                                ))}

                                {questionnaire.questions[currentQuestionIndex].type === 'enkelekeus' || questionnaire.questions[currentQuestionIndex].type === 'meerkeuze' ? (
                                    <Button onClick={() => handleAddPossibleAnswer(currentQuestionIndex)}>
                                        Voeg antwoord toe
                                    </Button>
                                ) : null}


                            </>
                        ) : (
                            <>
                            <h3 className="heading-3">Nieuwe vraag toevoegen</h3>

                                <InputField
                                    id="title"
                                    label="Vraag Titel"
                                    value={newQuestion.title}
                                    onChange={handleChangeQuestion}
                                    placeholder="Vraag"
                                />
                                <OptionSelector
                                    id="type"
                                    value={newQuestion.type}
                                    onChange={handleChangeQuestion}
                                    options={['openvraag', 'enkelekeus', 'meerkeuze']}
                                    required
                                />
                                {newQuestion.possibleAnswers.map((answer, answerIndex) => (
                                <input
                                    key={answerIndex}
                                    id="answerText"
                                    value={answer.answertext}
                                    onChange={(e) => handleChangeAnswer(e, answerIndex)}
                                />
                            ))}

                                { (newQuestion.type === 'enkelekeus' || newQuestion.type === 'meerkeuze') && (
                                    <Button onClick={() => setNewQuestion(prev => ({
                                        ...prev,
                                        possibleAnswers: [...prev.possibleAnswers, {answertext: ''}]
                                    }))}>
                                        Voeg antwoord toe
                                    </Button>
                                )}
                                <div className="button-div">
                                    <Button onClick={closeModal}>Sluit</Button>
                                    <Button onClick={handleSaveNewQuestion}>Opslaan</Button>
                                </div>
                            </>
                        )}

                    </div>
                </Modal>
            )}

        </>
    );
}

export default OnderzoekStapDrie;
