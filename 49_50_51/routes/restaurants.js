const express = require("express");

const uuid = require("uuid");
const router = express.Router();

const { getRestaurantData, storeRestaurant } = require("../util/restaurant-data");

router.get("/restaurants", (req, res) => {
    let order = req.query.order;
    const storedRestaurants = getRestaurantData();
    
    if(order!=="asc" && order!=="desc")order="asc";

    storedRestaurants.sort((resA, resB) => {
        if (
            (order === "asc" && resA.name > resB.name) 
            || 
            (order==="desc" && resB.name > resA.name)
            ) return 1;
        return -1;
    });

    res.render("restaurants",
        {
            numberOfRestaurants: storedRestaurants.length,
            restaurants: storedRestaurants,
            nextOrder:((order==="asc")?"desc":"asc")
        }
    );
});

router.get("/restaurant/:resId", (req, res) => {
    const restaurantId = req.params.resId;
    const storedRestaurants = getRestaurantData();

    for (const restaurant of storedRestaurants) {
        if (restaurant.Id === restaurantId) {
            return res.render("restaurant-detail", { restaurant: restaurant });
        }
    }
    res.status(404).render("404");
});

router.get("/confirm", (req, res) => {
    res.render("confirm");
});

router.get("/recommend", (req, res) => {
    res.render("recommend");
});

router.post("/recommend", (req, res) => {
    const restaurant = req.body;
    restaurant.Id = uuid.v4();
    const storedRestaurants = getRestaurantData();
    storedRestaurants.push(restaurant);
    storeRestaurant(storedRestaurants);
    res.redirect("/confirm");
});

module.exports = router;