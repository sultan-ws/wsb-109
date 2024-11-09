//admin controllers
const {
    testAdmin,
    adminLogin,
    updateAdmin,
    genrateOtp,
    updateEmail
} = require("./admin-panel/adminControllers");

//color controllers
const {
    activeColors,
    createColor
} = require("./admin-panel/colorControllers");

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
    activeParentCategory,
    permanentDeleteParentCategory,
    searchParentCategories
} = require("./admin-panel/parentCategoryControllers");

// product category controllers
const {
    createProductCategory,
    readProductCategories,
    activeProductCategoryByParentCategory
} = require("./admin-panel/productCategoryControllers");
const { createProduct, readProducts } = require("./admin-panel/productControllers");

//size controllers
const {
    activeSizes,
    createSize
} = require("./admin-panel/sizeControllers");

// **website controllers**
// products
const { 
    activeProductWebsite 
} = require("./website/productControllers");
const { genrateOtpUser, registerUser } = require("./website/userControllers");

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
    updateEmail,
    activeProductCategoryByParentCategory,
    createColor,
    activeColors,
    createSize,
    activeSizes,
    createProduct,
    readProducts,
    permanentDeleteParentCategory,
    searchParentCategories,
    activeProductWebsite,
    genrateOtpUser,
    registerUser
}