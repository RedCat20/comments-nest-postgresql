// export const getSubCategoriesRecursive = async (category) => {
//     let subCategories = await commentRepository.category.findAll({
//         where: {
//             parentId: category.id
//         },
//         raw : true
//     });
//
//     if (subCategories.length > 0) {
//         const promises = [];
//         subCategories.forEach(category => {
//             promises.push(getSubCategoriesRecursive(category));
//         });
//         category['subCategories'] = await Promise.all(promises);
//     }
//     else category['subCategories'] = [];
//     return category;
// };