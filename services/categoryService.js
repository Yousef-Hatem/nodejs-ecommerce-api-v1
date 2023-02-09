const CategoryModel = require("../models/categoryModel");
const slugify = require('slugify');

exports.getCategories = (req, res) => {
    // const name = req.body.name;
    // console.log(req.body);
    res.send();
}

exports.createCategory = (req, res) => {
    const name = req.body.name;
    CategoryModel.create({name, slug: });
    // const newCategory = new CategoryModel({ name })
    // newCategory.save()
    // .then(doc => {
    //     res.json(doc);
    // })
    // .catch(err => {
    //     res.json(err);
    // });
}