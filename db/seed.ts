import mongoose from "mongoose";
import Users from "../models/userModel";
import Product from "../models/productModel";

const adminUser = {
  userName: "JamieSellman",
  email: "jamie@jamie.com",
  password: "Jamie200!",
};

const today = new Date();

const exampleReview = {
  name: "A previous purchaser",
  review: "This was a really great product!",
  date: today.toLocaleDateString(),
  time: today.toLocaleTimeString(),
};

const productData = [
  {
    title: "Chocolate Box",
    image:
      "https://media.istockphoto.com/id/1341080014/fr/photo/bo%C3%AEte-avec-de-d%C3%A9licieux-bonbons-au-chocolat-sur-une-table-noire-%C3%A0-plat-espace-pour-le-texte.jpg?s=612x612&w=0&k=20&c=1Ut1a3JYtH18qURf7NGqpkqVWLSoJIRbhj2NvG9la68=",
    description:
      "Dive into our luxurious assortment of 24 chocolates, offering a journey from the deep, intense flavors of dark chocolate to the creamy delicacies of white chocolate. Inspired by the notion that life is akin to a box of chocolates, each piece is crafted to surprise and delight your senses. Prepare for an enchanting experience with every bite.",
    price: 39.99,
    unitsSold: 0,
    category: "Chocolate",
    reviews: [
      {
        name: "An admirer",
        review:
          "The chocolates were fine but the real star of the show is this website!!! Kudos to the dev team",
        date: today.toLocaleDateString(),
        time: today.toLocaleTimeString(),
      },
      exampleReview,
      {
        name: "Irene Jardin",
        review:
          "Ok to start my box arrived in mint condition, unfortunately mint condition is about the only flavour this box contained. These are not bad chocolates , actually they are beautifully made, they just lack variety, and with chocolate slabs taking up a quarter of the box, I can't say they are value for money.. ",
        date: today.toLocaleDateString(),
        time: today.toLocaleTimeString(),
      },
    ],
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/cd/Macarons%2C_French_made_mini_cakes.JPG",
    title: "Macaron Box",
    description:
      "Indulge in our exquisite box of Luxury Macarons, featuring an assortment of flavors that cater to every palate. From the vibrant tang of Lemon to the rich indulgence of Chocolate, the sweet bliss of Strawberry, and the exotic aroma of Pistachio, each macaron promises a burst of sophisticated taste and a silky-smooth texture. Perfect for gifting or treating yourself, this collection is a celebration of elegance and flavor.",
    price: 25.5,
    unitsSold: 0,
    category: "Pastries",
  },
  {
    title: "Croissant",
    image:
      "https://static01.nyt.com/images/2021/04/07/dining/06croissantsrex1/06croissantsrex1-square640.jpg",
    description:
      "Savor the unparalleled blend of buttery richness and chocolate decadence with our Gourmet Chocolate Croissant. Each croissant is meticulously handcrafted, marrying the delicate layers of a traditional French croissant with luscious, melt-in-your-mouth chocolate. Perfect for a luxurious breakfast or a sumptuous snack, this pastry is a testament to the art of French baking. Elevate your taste experience with every bite.",
    price: 0.9,
    unitsSold: 0,
    category: "Pastries",
    reviews: [
      {
        name: "Dom",
        review:
          "But all croissants are overpriced considering what is in them. Imagine if you hit it with a hammer, you would then see what you actually paid for, and find it is very little. But enjoyable to eat, makes you want a few more as not filling.",
        date: today.toLocaleDateString(),
        time: today.toLocaleTimeString(),
      },
    ],
  },
  {
    title: "Cheese Plate",
    image:
      "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2024-03/healthiest-cheese-mc-240306-88cd8a.jpg",
    description:
      "A delicious assortment of 7 different cheeses, including : Chedar, Brie, Camembert, compté, goat cheese, Saint-Marcelin, Manchego. The perfect plate to host a housewarming party or just a lovely get together with family or friends",
    price: 57.9,
    unitsSold: 0,
    category: "Cheese",
  },
  {
    title: "Pain Au Chocolat",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Pain_au_chocolat_Luc_Viatour.jpg/640px-Pain_au_chocolat_Luc_Viatour.jpg",
    description:
      "A delectable French pastry that combines the flakiness of a croissant with the indulgence of chocolate. What better combination could there be?",
    price: 0.9,
    unitsSold: 0,
    category: "Pastries",
  },
  {
    title: "Chocolate Truffle",
    image:
      "data:image/jpeg;base64,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",
    description:
      "A decadent delight for chocolate lovers, this truffle features layers of dark, milk, and white chocolate, each offering a distinct taste sensation. Perfectly balanced for a luxurious treat.",
    price: 1.5,
    unitsSold: 0,
    category: "Chocolate",
  },
  {
    title: "Brie Wheel",
    image:
      "data:image/jpeg;base64,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",
    description:
      "A classic French cheese known for its creamy texture and nutty, fruity flavor. This full wheel of Brie is perfect for cheese platters, appetizers, or as a gourmet snack.",
    price: 5.0,
    unitsSold: 0,
    category: "Cheese",
    reviews: [
      {
        name: "Karen",
        review: "Poor compared to English Somerset brie",
        date: today.toLocaleDateString(),
        time: today.toLocaleTimeString(),
      },
    ],
  },
  {
    title: "Mint Choc",
    image:
      "https://www.thereciperebel.com/wp-content/uploads/2016/12/no-bake-chocolate-mint-bars-www.thereciperebel.com-600-33-of-34.jpg",
    description:
      "A refreshing blend of smooth dark chocolate and crisp mint flavor, offering a cooling sensation with each bite. Perfect for a refreshing treat.",
    price: 1.2,
    unitsSold: 0,
    category: "Chocolate",
  },
  {
    title: "Caramel Crunch",
    image:
      "https://thescranline.com/wp-content/uploads/2023/03/CARAMEL-CRUNCH-BROWNIES-S-01.jpg",
    description:
      "A delightful treat featuring smooth milk chocolate infused with pieces of caramel and sea salt, offering a perfect balance of sweet and salty with a satisfying crunch.",
    price: 1.3,
    unitsSold: 0,
    category: "Chocolate",
  },
  {
    title: "Almond Croissant",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV0ejKofjj0l1MgpPuUg20mrXFYb9iD0_2UtiZOPshFA&s",
    description:
      "A luxurious pastry filled with almond cream and topped with sliced almonds and powdered sugar. It's rich, nutty, and perfectly flaky.",
    price: 2.7,
    unitsSold: 0,
    category: "Pastries",
  },
  {
    title: "Gorgonzola",
    image:
      "https://cheeselads.com/cdn/shop/products/Screenshot2021-08-30at11.10.40AM.png?v=1630293116&width=1080",
    description:
      "A soft and spreadable blue cheese with a sweet, mild flavor profile. Its creamy texture and distinctive veins offer a unique taste experience, ideal for cheese boards or as a gourmet ingredient.",
    price: 4.5,
    unitsSold: 0,
    category: "Cheese",
  },
  {
    title: "Pecan Tart",
    image:
      "https://www.tasteofhome.com/wp-content/uploads/2018/01/exps171354_TH163619D09_25_5b-2.jpg",
    description:
      "A classic dessert featuring a buttery crust filled with a sweet and sticky pecan filling. It's the perfect balance of textures and nutty flavors, ideal for any sweet tooth.",
    price: 3.0,
    unitsSold: 0,
    category: "Pastries",
  },
];

async function seed() {
  await mongoose.connect("mongodb://127.0.0.1:27017/shopdb");
  console.log("SEEDING HAS BEGUN! 🔥");

  // ! If you want to remove all the existing data in the db
  await mongoose.connection.db.dropDatabase();
  console.log("Remove existing data.");

  // ! Before we seed products, we want to seed a user.
  const user = await Users.create(adminUser);
  // console.log("Admin user is seed:", user);
  productData.forEach((product: any) => (product.user = user._id));

  const products = await Product.create(productData);
  // console.log(products);

  console.log("Disconnecting..");
  await mongoose.disconnect();
}

seed();
