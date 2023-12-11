const UserController = require('../controllers/user.controller')

exports.routesConfig = function (app) {
    app.post('/add', [
        UserController.add
    ]);
    app.get('/user/data', [
        UserController.getAllData
    ]);
    app.get('/user/data/:id', [
        UserController.getData
    ]);
    app.put('/user/data/update/:id', [
        UserController.update
    ]);
    app.delete('/user/data/delete/:id', [
        UserController.delete
    ]);
};
