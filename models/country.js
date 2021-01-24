const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    population: {
        type: String,
    },
    alpha_3: {
        type: String,
    },
    alpha_2: {
        type: String,
    },
    phone: {
        type: String,
    },
    tld: {
        type: String,
    },
    unNumeric: {
        type: String,
    },
    profile_1: {
        type: String,
    },
    profile_2: {
        type: String,
    },
    profile_3: {
        type: String,
    }
}, {
    timestamps: true,
});

schema.methods.toJSON = function () {
    let obj = this.toObject();

    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;

    return obj;
};

schema.pre('find', function () {
    this._startTime = Date.now();
});

schema.post('find', function () {
    if (this._startTime != null) {
        console.log('countries: ', Date.now() - this._startTime);
    }
});

module.exports = model = mongoose.model('countries', schema);

module.exports.findAllData = value => {
    const data = {};
    if (value['search'])
        data['$or'] = [{
            id: new RegExp(value['search'].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi')
        }, {
            name: new RegExp(value['search'].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi')
        }, {
            population: new RegExp(value['search'].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi')
        }, {
            alpha_3: new RegExp(value['search'].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi')
        }, {
            alpha_2: new RegExp(value['search'].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi')
        }, {
            phone: new RegExp(value['search'].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi')
        }, {
            timeZone: new RegExp(value['search'].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi')
        }, {
            tld: new RegExp(value['search'].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi')
        }, {
            unNumeric: new RegExp(value['search'].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi')
        }, {
            profile_1: new RegExp(value['search'].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi')
        }, {
            profile_2: new RegExp(value['search'].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi')
        }, {
            profile_3: new RegExp(value['search'].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi')
        }];

    return model.find(data).sort({'name': 1});
};
