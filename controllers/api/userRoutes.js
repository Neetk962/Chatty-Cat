const router = require('express').Router();
const { User } =require('../../models');

// GET all users

router.get("/", async (req, res) =>{
    try {
        const users = await User.findAll({});

        res.status(200).json(users);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

// get user by id
router.get("/:id", async (req, res) =>{
    try {
        const userData = await User.findByPk(req.params.id);

        const user = userData.get({ plain: true });

        res.status(200).json(user);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

// create new user

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            // Send user data back to the client as confirmation and save the session

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// POST /api/users/login

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ 
            where: { email: req.body.email } });

            // If the email is not found, send an error message

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // If the email is found, verify the password

        const validPassword = await userData.checkPassword(req.body.password);

        // If the password is invalid, send an error message

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // If the password is valid, save the session and send a confirmation message

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// POST /api/users/logout

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }

    // If the user is logged in, end the session
    
});

module.exports = router;