module.exports = {
    multiToObj: function(mongoose){
        return mongoose.map(mongoose => mongoose.toObject());
    },
    toObj: function(mongooes){
        return mongooes ? mongooes.toObject() : mongooes;
    }
}
