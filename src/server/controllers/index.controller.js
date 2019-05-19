exports.index = (req, res, next) => {
    let renderParams = { title: 'Monitor Karewa' };
    res.render('index', renderParams);
};