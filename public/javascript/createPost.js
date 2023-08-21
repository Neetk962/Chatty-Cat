const postFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#post-title').value.trim();
    const description = document.querySelector('#description').value.trim();
    const date_created = document.querySelector('#date_created').value.trim();
    const blogBody = document.querySelector('#post-body').value;

    if (name && description && date_created) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({ name, description, date_created }),
            headers: { 'Content-Type': 'application/json' },
        })
        console.log(name, description, date_created);

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to upload post.');
        }
    }
};

document.querySelector('.createPostForm').addEventListener('submit', postFormHandler);