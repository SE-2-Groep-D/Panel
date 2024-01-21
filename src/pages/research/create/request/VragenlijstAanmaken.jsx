import {fetchApi} from '@api';

async function VragenlijstAanmaken(questionnaire) {



    const formattedData = {
        title: questionnaire.title,
        description: questionnaire.description,
        onderzoekId: questionnaire.onderzoekId,
        questions: questionnaire.questions.map(question => ({
            type: questionTypeToInt(question.type),
            description: question.description,
            possibleAnswers: question.possibleAnswers.map(answer => ({
                value: answer.value
            }))
        }))
    };
    console.log(formattedData);
    try {
        const response = await fetchApi("/Vragenlijst", "POST", formattedData );
        return response;
    } catch (error) {
        return false;
    }
}

function questionTypeToInt(type) {
    switch(type) {
        case 'Open': return 0;
        case 'OneAnwer': return 1;
        case 'MultipleAnswer': return 2;
        default: return -1;
    }
}

export  {VragenlijstAanmaken};