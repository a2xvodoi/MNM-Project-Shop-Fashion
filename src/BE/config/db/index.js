const mongoose = require('mongoose');

/**
 * Config connect with db
 */
async function connect(){
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CONNECTION}.ijmt3.mongodb.net/${process.env.DB_DATABASENAME}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('connect successfully!');
    } catch (error) {
        console.log('connect falure!' + error);
    }
};

module.exports = {connect};