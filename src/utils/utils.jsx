function formatString(string, max) {
    if (!string) return "";
    if(string.length <= max) return string;
    return string.substring(0, max) + "...";
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('nl-NL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

function sortObjectByDate(objects) {
    return objects.sort((a, b) => {
        const dateA = a.date || a.datum;
        const dateB = b.date || b.datum;
        return new Date(dateB) - new Date(dateA);
    }) || [];
}

function generateCustomId(lenght) {
    return Math.random().toString(36).substring(7);
}

export {formatDate, formatString, sortObjectByDate, generateCustomId}
