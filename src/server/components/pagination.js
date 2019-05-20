/**
 * Genera un objeto con opciones de paginación por defecto.
 * @param req
 * @returns {{page: number, sort: {}, offset: number, limit: number, lean: boolean}}
 */
exports.getDefaultPaginationOptions = (req) => {
    let perPage = 10;
    let page = Number(req.query.page || 1);
    let sortField = req.query.sort || "createdAt";
    let typeSort = req.query.typeSort || "desc";
    let sortType = (typeSort === "desc") ? -1 : 1;

    let sort = {};
    sort[sortField] = sortType;

    let offset = (perPage * page) - perPage;

    let paginationOptions = {
        page: page,
        sort: sort,
        // offset: offset,
        limit: perPage,
        lean: true
    };
    
    return paginationOptions;
};