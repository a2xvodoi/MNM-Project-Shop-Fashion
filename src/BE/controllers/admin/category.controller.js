const getSlug = require('speakingurl');

const Category = require('../../models/category');
const {multiToObj} = require('../../util/mongooes');
const {toObj} = require('../../util/mongooes');

// get /admim/category
module.exports.index = (req, res, next)=>{
    Category.find({})
    .then(categories =>{
        res.render('admin/category/indexCategory',{
            title: 'Bảo trì danh mục',
            layout: 'mainAd.hbs',
            categories: multiToObj(categories),
            session: req.session,
        })
    })
    .catch(next);
};
// post admin/category/create
module.exports.postCreateCategry = (req, res, next) =>{
    const category = new Category(req.body);
    category.save()
    .then(() => res.redirect('back'))
    .catch(next);
};

//put admin/category/edit/:slug
module.exports.putEditCategory = (req, res, next) =>{
    req.body.slug = getSlug(req.body.tenDm);
    Category.findOneAndUpdate({slug: req.params.slug},req.body)
    .then(() => res.redirect('back'))
    .catch(next);
};

// delete /admin/category/delete/:slug
module.exports.deleteCategory = (req, res, next)=>{
    //res.json(req.params.slug);
    Category.deleteOne({slug: req.params.slug})
    .then(() => res.redirect('back'))
    .catch(next);
};
