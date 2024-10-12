//admin controllers
const {
    testAdmin,
    adminLogin
} = require("./admin-panel/adminControllers");
const {
    readParentCategory,
    createParentCategory,
    updateStatusParentCategory
} = require("./admin-panel/parentCategoryControllers");

module.exports = {
    testAdmin,
    adminLogin,
    createParentCategory,
    readParentCategory,
    updateStatusParentCategory
}