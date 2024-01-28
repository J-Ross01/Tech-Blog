document.getElementById('postForm').addEventListener('submit', function(event) {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (!title || !content) {
        alert('Title and content are required.');
        event.preventDefault();
    }
});
