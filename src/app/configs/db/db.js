const mongoose = require("mongoose");

const connect = async () => {
    try {
      await mongoose.connect("mongodb+srv://tuannaph21878:Ef2HsCwTcD285L@owennguyen.7btsgyp.mongodb.net/Sales_Manager?retryWrites=true&w=majority");
        console.log("connect successfully !");
    } catch (error) {
        console.log("connect fail");
    }
}

module.exports = {connect};
