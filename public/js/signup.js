document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', function (event) {
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        if (!username || !email || !password) {
            alert('Please fill in all fields.');
            event.preventDefault(); 
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            event.preventDefault();
            return;
        }

        if (password.length < 6) {
            alert('Password should be at least 6 characters long.');
            event.preventDefault();
            return;
        }
    });
});

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}
