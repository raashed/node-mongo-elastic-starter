const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
    name: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'countries'
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'states'
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cities'
    },
}, {
    timestamps: true
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
        console.log('zips: ', Date.now() - this._startTime);
    }
});

module.exports = model = mongoose.model('zips', schema);

module.exports.findAllData = value => {
    const data = {};
    if (value['country'])
        data['country'] = mongoose.Types.ObjectId(value['country']);

    if (value['state'])
        data['state'] = mongoose.Types.ObjectId(value['state']);

    if (value['search'])
        data['$or'] = [{
            name: new RegExp(value['search'].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi')
        }, {
            population: new RegExp(value['search'].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi')
        }, {
            code: new RegExp(value['search'].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi')
        },];

    return model.find(data).sort({'name': 1});
};
