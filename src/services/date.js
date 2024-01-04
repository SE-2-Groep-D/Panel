function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('nl-NL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}
export {formatDate}