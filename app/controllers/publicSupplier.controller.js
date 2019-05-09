const Supplier = require('./../models/supplier.model').Supplier;

exports.list = (req, res, next) => {
    //TODO: query and return results
    
    let suppliers = [
        {
            _id: '',
            name: 'Proveedor 1',
            public: 123.0,
            invitation: 234.0,
            noBid: 345.0,
            total: 555
        },
        {
            _id: '',
            name: 'Proveedor 2',
            public: 123.0,
            invitation: 234.0,
            noBid: 345.0,
            total: 555
        },
        {
            _id: '',
            name: 'Proveedor 3',
            public: 123.0,
            invitation: 234.0,
            noBid: 345.0,
            total: 555
        },
        {
            _id: '',
            name: 'Proveedor 4',
            public: 123.0,
            invitation: 234.0,
            noBid: 345.0,
            total: 555
        },
    ];
    
    let data = {
        totals: {
            totalCount: 23,
            publicCount: 12,
            invitationCount: 7,
            noBidCount: 4,
            total: 12345,
            public: 37712,
            invitation: 371792,
            noBid: 18487387,
        },
        suppliers: suppliers
    };
    
    return res.json({
        error: false,
        data: data
    });
};