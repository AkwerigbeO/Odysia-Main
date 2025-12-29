const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config({ path: path.join(__dirname, '.env') });

const resetPassword = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const email = 'yyakd@mailto.plus';
        const user = await User.findOne({ email });

        if (!user) {
            console.log('User not found');
            process.exit(1);
        }

        user.password = 'password123';
        // Note: The User model pre-save hook will hash this password!
        await user.save();

        console.log(`Password for ${user.name} (${user.email}) reset to: password123`);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

resetPassword();
