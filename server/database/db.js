import mongoose from 'mongoose';

const Connection = async () => {
    const URL = "mongodb+srv://soham:ss12345@cluster0.2fkrg.mongodb.net/flipkart?retryWrites=true&w=majority&appName=Cluster0";

    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database Connected Successfully');
    } catch (error) {
        console.log('Error:', error.message);
    }
};

export default Connection;
