const loginFormHandler = async (event) => {
    event.preventDefault();
    
    const email = document.querySelector('#email-login').trim();
    const password = document.querySelector('#password-login').trim();

    if (email && password) {
        const response = await fetch ('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/');
        }
    }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
    
