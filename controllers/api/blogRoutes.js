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

// get blog by id
router.get("/:id", async (req, res) =>{
    try {
        const blogData = await Blog.findByPk(req.params.id);

        const blog = blogData.get({ plain: true });

        res.status(200).json(blog);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

// post new blog post
router.post('/', async (req, res) => {
    try {
        const user_id = req.session.user_id;
        const { name, description, date_created, blog_data } = req.body
        const newBlog = await Blog.create({
            name,
            description,
            date_created,
            blog_data,
            user_id: user_id,
        });
        console.log(user_id);
        // if there's an error, catch it and send it back

        res.status(200).json(newBlog);
    }   catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// delete a blog by its 'id' value

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
