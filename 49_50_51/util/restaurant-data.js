const fs=require("fs");
const path=require("path");

const dataFilePath=path.join(__dirname,"..","data","restaurants.json");

const getRestaurantData=()=>{
    const fileData= fs.readFileSync(dataFilePath);
    const storedRestaurants=JSON.parse(fileData);
    return storedRestaurants;
};

const storeRestaurant=(storedRestaurants)=>{
    fs.writeFileSync(dataFilePath,JSON.stringify(storedRestaurants));
};

module.exports={
    getRestaurantData:getRestaurantData,
    storeRestaurant:storeRestaurant
};