const Category = require("../models/CategorySchema");

module.exports.getAllCategory = async (req, res) => {
    try {
        const category = await Category.findAll();

        if (!category)
            return res.json({ message: 'No Category available!' });

        return res.json({ category });
    } catch (error) {
        return res.json({ message: error.message });
    }
}

module.exports.getCategory = async (req, res) => {
    const id = req.params.id;
    console.log(id)

    try {
        const category = await Category.findByPk(id);

        if (!category)
            return res.status(404).json({ message: 'no category found!' });

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}