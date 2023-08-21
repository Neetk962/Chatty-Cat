const postFormHandler = async (event) => {
    event.preventDefault();

    const blogTitle = document.querySelector('#post-title').value.trim;
    const blogDescription = document.querySelector('#description').value.trim;
    const blogDate = document.querySelector('#date_created').value.trim;
    const blogBody = document.querySelector('#post-body').value.trim;

    if (blogTitle && blogDescription && blogDate && blogBody) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({ blogTitle, blogDescription, blogDate, blogBody }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            console.log(error);
            alert('Failed to upload post.');
        }
    }
};

document.querySelector('.createPostForm').addEventListener('submit', postFormHandler);