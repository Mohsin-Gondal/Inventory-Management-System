// Imports
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const moment = require('moment');
const methodOverride = require('method-override');
const DB = require('./DB');
const { memoryStorage } = require('multer');
const { connection } = DB;
// Settings
require('dotenv').config();

// Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));


// Routes
app.get('/home', async (req, res) => {
    let Data = {
        moment,
        allProducts: await DB.getAllProducts(),
        damagedProducts: await DB.getDamagedProducts(),
        expiredProducts: await DB.getExpiredProducts(),
        notifications: await DB.getAllNotifications(),
    }
    // const [result, fields] = await connection.query('SELECT * FROM notifications');
    // connection.execute('SELECT * FROM notifications', (err, result, fields) => {
    //     console.log(result);
    // });
    res.render('pages/index', Data);
});

app.get('/partial/dashboard', async (req, res) => {
    let Data = {
        moment,
        allProducts: await DB.getAllProducts(),
        damagedProducts: await DB.getDamagedProducts(),
        expiredProducts: await DB.getExpiredProducts(),
        notifications: await DB.getAllNotifications(),
        allProductsCount: (await DB.getProductsCount())[0].Total,
        damagedCount: (await DB.getDamagedCount())[0].Total,
        expiredCount: (await DB.getExpiredCount())[0].Total,
        lowCount: (await DB.getLowCount())[0].Total,
    }
    console.log("Dashboard Component Sent by Server");
    res.render('components/dashboard-partial', Data);
});
app.get('/partial/damaged', async (req, res) => {
    let Data = {
        moment,
        allProductsCount: (await DB.getProductsCount())[0].Total,
        damagedCount: (await DB.getDamagedCount())[0].Total,
        lowCount: (await DB.getLowCount())[0].Total,
        damagedProducts: await DB.getDamagedProducts(),
    };
    // console.log(Data.damagedProducts);
    console.log("Damaged Stock Component Sent by Server");
    res.render('components/damaged-partial', Data);
});
app.get('/partial/expired', async (req, res) => {
    let Data = {
        moment,
        allProducts: await DB.getAllProducts(),
        damagedProducts: await DB.getDamagedProducts(),
        expiredProducts: await DB.getExpiredProducts(),
        notifications: await DB.getAllNotifications(),
        allProductsCount: (await DB.getProductsCount())[0].Total,
        damagedCount: (await DB.getDamagedCount())[0].Total,
        expiredCount: (await DB.getExpiredCount())[0].Total,
        lowCount: (await DB.getLowCount())[0].Total,
    }
    console.log("Expired Stock Component Sent by Server");
    res.render('components/expired-partial', Data);
});
app.get('/partial/low', async (req, res) => {
    let Data = {
        moment,
        allProducts: await DB.getAllProducts(),
        damagedProducts: await DB.getDamagedProducts(),
        expiredProducts: await DB.getExpiredProducts(),
        notifications: await DB.getAllNotifications(),
        allProductsCount: (await DB.getProductsCount())[0].Total,
        damagedCount: (await DB.getDamagedCount())[0].Total,
        expiredCount: (await DB.getExpiredCount())[0].Total,
        lowCount: (await DB.getLowCount())[0].Total,
    }
    console.log("Low Stock Component Sent by Server");
    res.render('components/low-partial', Data);
});
app.get('/partial/new', (req, res) => {
    console.log("New Stock Component Sent by Server");
    res.render('components/new-partial');
});
app.get('/partial/new-damaged/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        let product = await DB.findProductById(req.params.id);
        console.log("New Stock Component Sent by Server");
        res.render('components/add-damaged-partial', { product });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
app.get('/partial/delete-product/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        let product = await DB.findProductById(req.params.id);
        console.log("Delete Product Component Sent by Server");
        res.render('components/delete-product-partial', { product });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
app.get('/partial/delete-damaged-product/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        let product = await DB.findProductById(req.params.id);
        console.log("Delete Product Component Sent by Server");
        res.render('components/delete-damaged-product-partial', { product });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
app.get('/partial/remove-from-damaged/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        let product = await DB.findProductById(req.params.id);
        console.log("Delete Product Component Sent by Server");
        res.render('components/remove-damaged-partial', { product });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
app.post('/damaged_products/:id', async (req, res) => {
    console.log("Update Damaged Request Recieved");
    try {
        let { id } = req.params;
        let { count } = req.body;
        console.log(id, count);

        DB.addDamaged(id, count);
        let Product = await DB.findProductById(id);
        if (Product.Quantity >= count) {
            DB.updateProductQuantity(id, (Product.Quantity - count));
            res.status(200).json({ success: true, message: 'Values Updated' });
        } else {
            res.status(400).json({ success: false, message: "There ain't this much products to get Damaged" });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
app.delete('/damaged_products/:id', async (req, res) => {
    console.log("DELETE Damaged Request Recieved");
    try {
        let { id } = req.params;
        let { count } = req.body;
        // count = Number(count);
        console.log(id, count);
        let product = await DB.findProductById(id);
        let D_Quan = await DB.getProductDamagedQuantity(id);
        if (D_Quan >= count) {
            DB.updateProductQuantity(id, Number(product.Quantity) + Number(count));
            DB.updateDamagedProductQuantity(id, (D_Quan - count));
            res.status(200).json({ success: true, message: 'Values Updated' });
        } else {
            res.status(400).json({ success: false, message: "There ain't this much products to get Damaged" });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
app.delete('/products/:id', async (req, res) => {
    console.log("DELETE Product Request Recieved");
    try {
        let { id } = req.params;
        let { count } = req.body;
        let { from } = req.query;
        console.log(id, count, req.query);
        if (from == "DAMAGED") {
            let D_Quan = await DB.getProductDamagedQuantity(id);
            console.log(D_Quan);
            if (D_Quan >= count) {
                await DB.updateDamagedProductQuantity(id, (D_Quan - count));
                res.status(200).json({ success: true, message: 'Products Removed' });
            } else {
                res.status(400).json({ success: false, message: "There ain't much Products in Damaged Section" })
            }

        } else {
            let Product = await DB.findProductById(id);
            if (Product.Quantity >= count) {
                DB.updateProductQuantity(id, (Product.Quantity - count));
                res.status(200).json({ success: true, message: 'Products Removed' });
            } else {
                res.status(400).json({ success: false, message: "There ain't this much products to Remove" });
            }
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
app.get('/products/:name', async (req, res) => {
    console.log("GET Product By Name Request Recieved");
    try {
        let { name } = req.params;
        let products = await DB.findProductsByName(name);
        res.status(200).render('components/search-partial', { products, moment });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
app.get('/notifications', async (req, res) => {
    let notifications = await DB.getAllNotifications();
    res.render('components/notifications-partial', { notifications, moment });
});
app.delete('/notifications/:id', (req, res) => {
    let { id } = req.params;
    DB.deleteNotificationById(id);
    res.status(200).json({ success: true, message: "Notification Deleted" });
});


//Server Listening
app.listen(port, () => { console.log('Server Listening on port', port) });