// Imports
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const moment = require('moment');
const session = require('express-session');
const methodOverride = require('method-override');
const DB = require('./DB');
const multer = require('multer');
const path = require('path');
const { connection } = DB;
// Settings
require('dotenv').config();

// Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use('/profiles', express.static(path.join(__dirname, 'profiles')));
app.use(session({
    secret: 'bp2592',
    resave: false,
    saveUninitialized: true,
    // cookie:{secure:false},
}));
// Self Made : ) Middlewares
function Auth(req, res, next) {
    if (!req.session.user) {
        res.redirect('/admin/login');
    } else {
        next();
    }
}

// Multer Settings
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'profiles/');
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        const fileTypes = /jpeg|jpg|png/; // Allowed file types
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only .png, .jpg, and .jpeg format allowed!'));
        }
    }
});
// Routes
app.get('/home', Auth, async (req, res) => {
    let Data = {
        moment,
        allProducts: await DB.getAllProducts(),
        damagedProducts: await DB.getDamagedProducts(),
        expiredProducts: await DB.getExpiredProducts(),
        notifications: await DB.getAllNotifications(),
        user: req.session.user,
    }
    // const [result, fields] = await connection.query('SELECT * FROM notifications');
    // connection.execute('SELECT * FROM notifications', (err, result, fields) => {
    //     console.log(result);
    // });
    res.render('pages/index', Data);
});

app.get('/partial/dashboard', Auth, async (req, res) => {
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
app.get('/partial/damaged', Auth, async (req, res) => {
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
app.get('/partial/expired', Auth, async (req, res) => {
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
app.get('/partial/low', Auth, async (req, res) => {
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
app.get('/partial/new', Auth, (req, res) => {
    console.log("New Stock Component Sent by Server");
    res.render('components/new-partial');
});
app.get('/partial/new-damaged/:id', Auth, async (req, res) => {
    console.log(req.params.id);
    try {
        let product = await DB.findProductById(req.params.id);
        console.log("New Stock Component Sent by Server");
        res.render('components/add-damaged-partial', { product });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
app.get('/partial/delete-product/:id', Auth, async (req, res) => {
    console.log(req.params.id);
    try {
        let product = await DB.findProductById(req.params.id);
        console.log("Delete Product Component Sent by Server");
        res.render('components/delete-product-partial', { product });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
app.get('/partial/delete-damaged-product/:id', Auth, async (req, res) => {
    console.log(req.params.id);
    try {
        let product = await DB.findProductById(req.params.id);
        console.log("Delete Product Component Sent by Server");
        res.render('components/delete-damaged-product-partial', { product });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
app.get('/partial/remove-from-damaged/:id', Auth, async (req, res) => {
    console.log(req.params.id);
    try {
        let product = await DB.findProductById(req.params.id);
        console.log("Delete Product Component Sent by Server");
        res.render('components/remove-damaged-partial', { product });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
app.post('/damaged_products/:id', Auth, async (req, res) => {
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
            await DB.addNotification('Damage Stock Updates', ` ${count} Units of ${Product.Name} Got Damaged (By ${req.session.user.name} : ${req.session.user.id} )`);
        } else {
            res.status(400).json({ success: false, message: "There ain't this much products to get Damaged" });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
app.delete('/damaged_products/:id', Auth, async (req, res) => {
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
            await DB.addNotification('Damage Stock Updates', ` ${count} Units of ${product.Name} Removed From Damaged (By ${req.session.user.name} : ${req.session.user.id} )`);
        } else {
            res.status(400).json({ success: false, message: "There ain't this much products to get Damaged" });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
app.delete('/products/:id', Auth, async (req, res) => {
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
                await DB.addNotification('Damage Stock Updates', ` ${count} Units of ${Product.Name} Removed From Damaged (By ${req.session.user.name} : ${req.session.user.id} )`);
            } else {
                res.status(400).json({ success: false, message: "There ain't much Products in Damaged Section" })
            }

        } else {
            let Product = await DB.findProductById(id);
            if (Product.Quantity >= count) {
                DB.updateProductQuantity(id, (Product.Quantity - count));
                await DB.addNotification('Available Stock Updates', ` ${count} Units of ${Product.Name} Removed (By ${req.session.user.name} : ${req.session.user.id} )`);
                res.status(200).json({ success: true, message: 'Products Removed' });
            } else {
                res.status(400).json({ success: false, message: "There ain't this much products to Remove" });
            }
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
app.get('/products/:name', Auth, async (req, res) => {
    console.log("GET Product By Name Request Recieved");
    try {
        let { name } = req.params;
        let products = await DB.findProductsByName(name);
        res.status(200).render('components/search-partial', { products, moment });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
app.get('/product/:id', Auth, async (req, res) => {
    console.log("GET Product By ID Request Recieved");
    try {
        let { id } = req.params;
        let products = await DB.findProductById(id);
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
app.get('/notifications', Auth, async (req, res) => {
    let notifications = await DB.getAllNotifications();
    res.render('components/notifications-partial', { notifications, moment });
});
app.post('/notifications', Auth, async (req, res) => {
    let { Title, Description, Product } = req.body;
    try {
        await DB.addNotification(Title, Description, Product);
        res.status(200).json({ success: true, message: 'Notification Added Successfully' });
    } catch (er) {
        res.status(200).json({ success: false, message: er.message });
    }
});
app.delete('/notifications/:id', Auth, (req, res) => {
    let { id } = req.params;
    DB.deleteNotificationById(id);
    res.status(200).json({ success: true, message: "Notification Deleted" });
});
app.post('/categories', async (req, res) => {
    let { name, description } = req.body;
    try {
        await DB.addCategory(name, description);
        res.status(200).json({ success: true, message: 'Category Added Successfully' });

    } catch (er) {
        res.status(400).json({ success: false, message: er.message });
    }

});
app.get('/categories', Auth, async (req, res) => {
    try {
        let categoires = await DB.getAllCategories();
        res.status(200).json(categoires);
    } catch (er) {
        res.status(400).json({ success: false, message: er.message });
    }

});
app.post('/products', Auth, async (req, res) => {
    let { name, price, expiryDate, categoryId } = req.body;
    try {
        await DB.addProduct(name, 0, price, expiryDate, categoryId);
        res.status(200).json({ success: true, message: 'Product Added Successfully' });
        await DB.addNotification('New Product Added', `${name} was Added with Initial Quantity 0`);
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }

});
app.get('/products', Auth, async (req, res) => {
    try {
        let response = await DB.getAllProducts();
        // let result = await response.json();
        res.status(200).json(response);
    } catch (er) {
        res.status(500).json({ success: false, message: er.message });
    }
});
app.get('/suppliers', Auth, async (req, res) => {
    try {
        let suppliers = await DB.getAllSuplliers();
        res.status(200).json(suppliers);
    } catch (er) {
        res.status(400).json({ message: er.message });
    }
});
app.post('/stock', Auth, async (req, res) => {
    console.log("POST Request Recieved for Stock");
    try {

        let total_Quantity = 0;
        let { supplier, products } = req.body;
        let lastStockID = await DB.getLastStockId();
        lastStockID++;
        console.log(lastStockID);
        for (const product of products) {
            total_Quantity += Number(product.quantityRecieved);
            console.log(product, " WITH QUANTITY ", product.quantityRecieved);
        }
        console.log("Total Quantity", total_Quantity);
        await DB.addStock((lastStockID), total_Quantity, new Date(), supplier);
        for (const product of products) {
            // console.log(product);
            console.log("New Quantity", await DB.getProductQuantity(product.ProductID) + Number(product.quantityRecieved));
            await DB.updateProductQuantity(product.ProductID, (Number(await DB.getProductQuantity(product.ProductID)) + Number(product.quantityRecieved)));
            await DB.addProductToStock(lastStockID, product.ProductID);
        }
        let NotificationDesc = ``;
        let count = 1;
        for (const pro of products) {
            NotificationDesc = NotificationDesc + '|' + `${count++} ` + pro.Name;
        }
        await DB.addNotification('New Stock Added', `Total ${total_Quantity} Products Added Here's Summary ${NotificationDesc}`);
        res.status(200).json({ message: "Stock Added Successfully" });
    } catch (er) {
        res.status(400).json({ message: er.message });
    }
});
app.get('/admin/login', (req, res) => {
    res.render('pages/login');
});
app.get('/admin/register', Auth, (req, res) => {
    if (!req.session.user) {
        res.redirect('/admin/login');
        return;
    }
    res.render('pages/register');
});
app.post('/login', async (req, res) => {
    let { email, password } = req.body;

    let foundUser = await DB.getAdmin(email);
    console.log(foundUser.Email, foundUser.Password);
    console.log(foundUser);

    if (!foundUser) {
        return res.status(400).json({ success: false, message: 'Account not found!' })
    } else {
        if (foundUser.Password == password) {
            req.session.user = {
                id: foundUser.AdminID,
                name: foundUser.Name,
                email: foundUser.Email,
                password: foundUser.Password,
                profile_path: foundUser.Profile_Path,
            };
            res.redirect('/home');
        } else {
            return res.status(400).json({ success: false, message: 'Wrong Password!' })
        }
    }
});
app.post('/register', Auth, upload.single('image'), async (req, res) => {

    let { name, email, password } = req.body;
    const profile_path = req.file ? `/profiles/${req.file.filename}` : `/profiles/default.png`;

    console.log(profile_path, name, email, password);
    try {

        await DB.addAdmin(name, email, password, profile_path);
        // res.status(200).json({ success: true, message: 'Account Added Successfully' });
        res.redirect('/admin/login');
    } catch (er) {
        res.status(400).json({ success: false, message: er.message });
    }
});
app.get('/logout', Auth, (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
});


//Server Listening
app.listen(port, () => { console.log('Server Listening on port', port) });