//admin controllers
const {
    testAdmin,
    adminLogin,
    updateAdmin,
    genrateOtp,
    updateEmail
} = require("./admin-panel/adminControllers");

//parent category controllers
const {
    readParentCategory,
    createParentCategory,
    updateStatusParentCategory,
    deleteParentCategory,
    deleteMultipleParentCategories,
    parentCategoryById,
    updateParentCategory,
    deletedParentCategory,
    recoverParentCategory,
    activeParentCategory
} = require("./admin-panel/parentCategoryControllers");

// product category controllers
const {
    createProductCategory,
    readProductCategories
} = require("./admin-panel/productCategoryControllers");

module.exports = {
    testAdmin,
    adminLogin,
    createParentCategory,
    readParentCategory,
    updateStatusParentCategory,
    deleteParentCategory,
    deleteMultipleParentCategories,
    parentCategoryById,
    updateParentCategory,
    deletedParentCategory,
    recoverParentCategory,
    activeParentCategory,
    createProductCategory,
    readProductCategories,
    updateAdmin,
    genrateOtp,
    updateEmail
}