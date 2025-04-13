const connection = require('./connection');
module.exports.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT p.*,c.Name AS C_NAME FROM products p INNER JOIN categories c ON c.CategoryID = p.CategoryID', (err, resutls, fields) => {
            if (err)
                reject(err);
            else
                resolve(resutls);
        });
    });
}
module.exports.getDamagedProducts = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT damaged_stock.*,damaged_stock.Quantity AS D_Quantity,products.*,categories.Name AS C_NAME FROM damaged_stock INNER JOIN products ON damaged_stock.ProductID = products.ProductID INNER JOIN categories ON products.CategoryID = categories.CategoryID;', (err, resutls, fields) => {
            if (err)
                reject(err);
            else
                resolve(resutls);
        });
    });
}
module.exports.getExpiredProducts = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM products WHERE ExpiryDate < current_date();', (err, resutls, fields) => {
            if (err)
                reject(err);
            else
                resolve(resutls);
        });
    });
}

module.exports.getProductsCount = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT SUM(Quantity) AS Total FROM products', (err, resutls, fields) => {
            if (err)
                reject(err);
            else
                resolve(resutls);
        });
    });
}
module.exports.getDamagedCount = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT SUM(Quantity) AS Total FROM damaged_stock', (err, resutls, fields) => {
            if (err)
                reject(err);
            else
                resolve(resutls);
        });
    });
}
module.exports.getExpiredCount = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT SUM(Quantity) AS Total FROM products WHERE ExpiryDate < current_date();', (err, resutls, fields) => {
            if (err)
                reject(err);
            else
                resolve(resutls);
        });
    });
}
module.exports.getLowCount = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT COUNT(*) AS Total FROM products WHERE Quantity < 50;', (err, resutls, fields) => {
            if (err)
                reject(err);
            else
                resolve(resutls);
        });
    });
}
module.exports.getProductDamagedQuantity = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT Quantity FROM damaged_stock WHERE ProductID = ?;', id, (err, resutls, fields) => {
            if (err)
                reject(err);
            else
                resolve(resutls[0].Quantity);
        });
    });
}
module.exports.findProductById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM products WHERE ProductID = ?;', id, (err, resutls, fields) => {
            if (err)
                reject(err);
            else
                resolve(resutls[0]);
        });
    });
}
module.exports.findProductsByName = (Name) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM products WHERE Name like ?;', `%${Name}%`, (err, resutls, fields) => {
            if (err)
                reject(err);
            else
                resolve(resutls);
        });
    });
}
module.exports.addDamaged = (id, quantity) => {
    return new Promise(async (resolve, reject) => {
        await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM damaged_stock WHERE ProductID = ?', id, (er, result, fields) => {
                if (result.length == 0) {
                    resolve(result)
                } else {
                    reject(result);
                }
            });
        }).then((result) => {
            connection.query('INSERT INTO damaged_stock (ProductID,Quantity) VALUES (?,?);', [id, quantity], (err, resutls, fields) => {
                if (err)
                    reject(err);
                else
                    resolve(resutls);
            });
        }).catch((result) => {
            connection.query('UPDATE damaged_stock SET Quantity = Quantity + ? WHERE ProductID = ?;', [quantity, id], (err, resutls, fields) => {
                if (err)
                    reject(err);
                else
                    resolve(resutls);
            });
        })
    });
}
module.exports.updateProductQuantity = (id, quantity) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE products SET Quantity = ? WHERE ProductID = ?;', [quantity, id], (err, resutls, fields) => {
            if (err)
                reject(err);
            else
                resolve(resutls);
        });
    });
}
module.exports.updateDamagedProductQuantity = (id, quantity) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE damaged_stock SET Quantity = ? WHERE ProductID = ?;', [quantity, id], (err, resutls, fields) => {
            if (err)
                reject(err);
            else
                resolve(resutls);
        });
    });
}
module.exports.getAllNotifications = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM notifications', (err, resutls, fields) => {
            if (err)
                reject(err);
            else
                resolve(resutls);
        });
    });
}
module.exports.getNotificationById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM notifications WHERE NotificationID = ?', id, (err, resutls, fields) => {
            if (err)
                reject(err);
            else
                resolve(resutls[0]);
        });
    });
}
module.exports.deleteNotificationById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM notifications WHERE NotificationID = ?', id, (err, resutls, fields) => {
            if (err)
                reject(err);
            else
                resolve(resutls[0]);
        });
    });
}
module.exports.connection = connection;


