const router =require('express').Router();
const { Blog } =require('../../models');

// get all blogs
router.get("/", async (req, res) =>{
    try {
        const blogs = await Blog.findAll({});

        res.status(200).json(blogs);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

// post new blog post
router.post('/', async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        // if there's an error, catch it and send it back

        res.status(200).json(newBlog);
    }   catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// update a blog by its 'id' value

router.delete('/:id', async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                // user_id: req.session.user_id,
            },
        });

        // if there's no blog with that id, return an error

        if (!blogData) {
            res.status(404).json({ message: 'No blog found with this id!'});
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
