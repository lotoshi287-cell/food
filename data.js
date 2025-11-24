// --- 1. Food Categories ---
const foodCategories = [
    'All',
    'Main Dishes',
    'Appetizers',
    'Salads',
    'Desserts',
    'Beverages',
    'Vegan',
    'Specials'
];

// --- 2. Food Items (50+ Products) ---
const foodItems = [
    // --- MAIN DISHES (10 items) ---
    { id: 'MD01', name: 'Gourmet Truffle Burger', price: 24.99, image: 'img/Truffle Burger.png', type: 'Main Dishes', category: 'Main Dishes', description: 'Wagyu beef patty, fontina cheese, black truffle aioli, brioche bun.', isPopular: true },
    { id: 'MD02', name: 'Seared Scallops', price: 32.50, image: 'img/Seared-Scallops.jpg', type: 'Main Dishes', category: 'Main Dishes', description: 'Served with saffron risotto and asparagus spears.', isPopular: true },
    { id: 'MD03', name: 'Slow-Cooked Lamb Shank', price: 28.99, image: 'img/Lamb Shank.jpg', type: 'Main Dishes', category: 'Main Dishes', description: 'Braised in red wine, served with creamy polenta.', isPopular: false },
    { id: 'MD04', name: 'Chicken Florentine', price: 22.00, image: 'img/Chicken-Florentine.jpg', type: 'Main Dishes', category: 'Main Dishes', description: 'Chicken breast stuffed with spinach and ricotta, white wine sauce.', isPopular: true },
    { id: 'MD05', name: 'Pesto Shrimp Pasta', price: 26.50, image: 'img/pesto-pasta.jpg', type: 'Main Dishes', category: 'Main Dishes', description: 'Linguine tossed in homemade basil pesto with grilled shrimp.', isPopular: false },
    { id: 'MD06', name: 'Ribeye Steak (10oz)', price: 45.00, image: 'img/Ribeye-Steak.jpg', type: 'Main Dishes', category: 'Main Dishes', description: 'Grilled to perfection, served with garlic mashed potatoes.', isPopular: true },
    { id: 'MD07', name: 'Vegetable Tagine', price: 18.99, image: 'img/Veg+Tagine.jpg', type: 'Vegan', category: 'Main Dishes', description: 'Moroccan spiced vegetable stew with couscous.', isPopular: false },
    { id: 'MD08', name: 'Salmon Teriyaki', price: 27.99, image: 'img/Salmon+Teriyaki.jpg', type: 'Main Dishes', category: 'Main Dishes', description: 'Glazed salmon filet with sticky rice and sautéed bok choy.', isPopular: true },
    { id: 'MD09', name: 'Beef Lok Lak', price: 11.99, image: 'img/Beef Lok Lak.jpg', type: 'Main Dishes', category: 'Main Dishes', description: 'Local beef fillet cubes cooked in a tangy sauce with watercress, onions, tomatoes, served with fried egg, and lime pepper dip', isPopular: false },
    { id: 'MD10', name: 'Kampot Pepper Seafood', price: 11.99, image: 'img/Kampot Pepper Seafood.jpg', type: 'Main Dishes', category: 'Main Dishes', description: 'img/Beef Lok Lak.jpgWok-fried seafood tossed with Kampot green pepper, broccoli, cauliflower, and red capsicum with oyster sauce', isPopular: false },
    { id: 'MD11', name: 'Amok', price: 9.99, image: 'img/Amok.jpg', type: 'Main Dishes', category: 'Main Dishes', description: 'A must-try Khmer delicacy, fish amok in lemongrass, Amok gravy, noni leaves, whisked with egg and roasted peanut', isPopular: false },
    { id: 'MD12', name: 'Fresh Spring Rolls with Shrimp', price: 6.99, image: 'img/Fresh Spring Rolls with Shrimp.jpg', type: 'Main Dishes', category: 'Main Dishes', description: 'Vegetables, local herbs, shrimp, wrapped in rice paper served with sweet and sour penut auce', isPopular: true },
    { id: 'MD13', name: 'Pink Pomelo Salad with River Lobster', price: 7.50, image: 'img/Pink Pomelo Salad with River Lobster.jpg', type: 'Main Dishes', category: 'Main Dishes', description: 'Countryside pink pomelo, combined with dry coconut, tri-color capsicums, local herbs and Khmer dressing, served with pan-seared river lobster and roasted coconut ', isPopular: false },
    { id: 'MD14', name: 'Prahok Ktis', price: 9.99, image: 'img/Prahok Ktis.jpg', type: 'Main Dishes', category: 'Main Dishes', description: 'Tonlé Sap fish fillet and minced pork simmered in coconut milk with locally-produced fishpaste and tamarind juice, served withseasonal fresh vegetables', isPopular: false },

    // --- APPETIZERS (10 items) ---
    { id: 'AP01', name: 'Caprese Skewers', price: 12.00, image: 'img/Caprese+Skewers.jpg', type: 'Appetizers', category: 'Appetizers', description: 'Cherry tomatoes, mozzarella balls, fresh basil, balsamic glaze.', isPopular: true },
    { id: 'AP02', name: 'Crab Cakes', price: 16.99, image: 'img/Crab+Cakes.jpg', type: 'Appetizers', category: 'Appetizers', description: 'Served with house-made remoulade sauce.', isPopular: true },
    { id: 'AP03', name: 'Bruschetta Trio', price: 10.50, image: 'img/Bruschetta.jpg', type: 'Appetizers', category: 'Appetizers', description: 'Classic tomato, mushroom & goat cheese, and fig & prosciutto.', isPopular: false },
    { id: 'AP04', name: 'Spicy Edamame', price: 7.00, image: 'img/Spicy+Edamame.jpg', type: 'Vegan', category: 'Appetizers', description: 'Steamed edamame tossed with chili flakes and sea salt.', isPopular: false },
    { id: 'AP05', name: 'Beef Carpaccio', price: 18.00, image: 'img/Beef+Carpaccio.jpg', type: 'Appetizers', category: 'Appetizers', description: 'Thinly sliced raw beef, arugula, parmesan, and capers.', isPopular: false },
    { id: 'AP06', name: 'Cheese Board', price: 21.00, image: 'img/Cheese+Board.jpeg', type: 'Appetizers', category: 'Appetizers', description: 'Artisan selection of three cheeses, nuts, and jam.', isPopular: true },
    { id: 'AP07', name: 'Coconut Shrimp', price: 14.50, image: 'img/Coconut+Shrimp.png', type: 'Appetizers', category: 'Appetizers', description: 'Crispy fried shrimp with sweet chili dipping sauce.', isPopular: false },
    { id: 'AP08', name: 'Tuna Tartare', price: 19.50, image: 'img/Tuna+Tartare.png', type: 'Appetizers', category: 'Appetizers', description: 'Diced raw tuna mixed with avocado and soy ginger dressing.', isPopular: true },
    { id: 'AP09', name: 'Garlic Knots (6)', price: 8.00, image: 'img/Garlic+Knots.png', type: 'Appetizers', category: 'Appetizers', description: 'Served with marinara dipping sauce.', isPopular: false },
    { id: 'AP10', name: 'Fried Calamari', price: 15.00, image: 'img/text=Calamari.jpg', type: 'Appetizers', category: 'Appetizers', description: 'Lightly battered and fried, served with lemon aioli.', isPopular: true },

    // --- SALADS (8 items) ---
    { id: 'SA01', name: 'Classic Caesar Salad', price: 14.00, image: 'salad/Caesar+Salad.jpg', type: 'Salads', category: 'Salads', description: 'Romaine lettuce, croutons, Parmesan, classic Caesar dressing.', isPopular: false },
    { id: 'SA02', name: 'Arugula & Pear Salad', price: 16.50, image: 'salad/Arugula+Salad.jpg', type: 'Salads', category: 'Salads', description: 'Arugula, sliced pears, walnuts, goat cheese, champagne vinaigrette.', isPopular: true },
    { id: 'SA03', name: 'Quinoa Power Bowl', price: 17.99, image: 'salad/Quinoa+Bowl.jpg', type: 'Vegan', category: 'Salads', description: 'Quinoa, black beans, corn, avocado, lime dressing.', isPopular: true },
    { id: 'SA04', name: 'Greek Salad', price: 15.00, image: 'salad/Greek+Salad.jpg', type: 'Salads', category: 'Salads', description: 'Cucumbers, tomatoes, olives, red onion, feta cheese.', isPopular: false },
    { id: 'SA05', name: 'Cobb Salad', price: 18.00, image: 'salad/Cobb+Salad.jpg', type: 'Salads', category: 'Salads', description: 'Chicken, bacon, egg, avocado, blue cheese, vinaigrette.', isPopular: false },
    { id: 'SA06', name: 'Beet & Feta Salad', price: 14.50, image: 'salad/Beet+Salad.jpg', type: 'Salads', category: 'Salads', description: 'Roasted beets, crumbled feta, pistachios, honey dressing.', isPopular: true },
    { id: 'SA07', name: 'Spinach and Strawberry Salad', price: 13.50, image: 'salad/Spinach+Salad.jpg', type: 'Salads', category: 'Salads', description: 'Spinach, sliced strawberries, pecans, poppy seed dressing.', isPopular: false },
    { id: 'SA08', name: 'Grilled Halloumi Salad', price: 17.00, image: 'salad/Halloumi+Salad.jpg', type: 'Salads', category: 'Salads', description: 'Mixed greens with warm grilled halloumi cheese and sun-dried tomatoes.', isPopular: false },
    { id: 'SA09', name: 'Green Mango Salad', price: 6.99, image: 'salad/Green Mango Salad.jpg', type: 'Salads', category: 'Salads', description: 'Green mango combined with Mekong smoked fish, sundried shrimps and mixed Khmer herbs combined with local favorites', isPopular: false },
    { id: 'SA10', name: 'Duck Breast Salad', price: 6.99, image: 'salad/Duck Breast Salad.jpg', type: 'Salads', category: 'Salads', description: 'Pan-fried duck breast served with hearts of palm, carrots, and Khmer dressing with organic mint leaves', isPopular: false },
    { id: 'SA11', name: 'Fish Salad & Crispy Rice', price: 6.99, image: 'salad/Fish Salad & Crispy Rice.jpg', type: 'Salads', category: 'Salads', description: '(Traditional wedding) Marinated fish fillet, lemon slices, beansprouts, long beans, three capsicums, red cabbages, local mixed herbs, crispy rice and Khmer dressing', isPopular: false },
    { id: 'SA12', name: 'Pork Larb', price: 6.99, image: 'salad/Pork Larb.jpg', type: 'Salads', category: 'Salads', description: 'Pan-fried minced pork mixed with Khmer herbs, toasted rice powder, flaked chili, served with fresh vegetables and larb sauce', isPopular: false },



    // --- DESSERTS (16 items) ---
    { id: 'DE01', name: 'Lava Chocolate Cake', price: 11.00, image: 'Desserts/Lava+Cake.jpg', type: 'Desserts', category: 'Desserts', description: 'Warm molten center, served with vanilla bean ice cream.', isPopular: true },
    { id: 'DE02', name: 'Tiramisu', price: 9.50, image: 'Desserts/Tiramisu.jpg', type: 'Desserts', category: 'Desserts', description: 'Classic Italian coffee-flavored dessert.', isPopular: true },
    { id: 'DE03', name: 'Crème Brûlée', price: 10.00, image: 'Desserts/Cheesecake.jpg', type: 'Desserts', category: 'Desserts', description: 'Vanilla custard base with a crisp caramelized sugar top.', isPopular: false },
    { id: 'DE04', name: 'Key Lime Pie', price: 8.50, image: 'Desserts/Key+Lime+Pie.jpg', type: 'Desserts', category: 'Desserts', description: 'Tart and creamy, graham cracker crust.', isPopular: false },
    { id: 'DE05', name: 'Seasonal Fruit Tart', price: 12.00, image: 'Desserts/Fruit+Tart.jpg', type: 'Desserts', category: 'Desserts', description: 'Fresh seasonal berries on a light pastry cream.', isPopular: false },
    { id: 'DE06', name: 'Apple Crumble', price: 9.00, image: 'Desserts/Apple+Crumble.jpg', type: 'Desserts', category: 'Desserts', description: 'Warm baked apples with a crunchy oat topping.', isPopular: true },
    { id: 'DE07', name: 'Sankhya Lapov', price: 2.50, image: 'Desserts/Sankhya Lapov.jpg', type: 'Desserts', category: 'Desserts', description: 'This custard includes coconut milk or cream, palm sugar, eggs, and a pinch of salt. Other than the post-time of the meal, people also consume this dish during special occasions.', isPopular: false },
    { id: 'DE08', name: 'Cheesecake Slice', price: 11.50, image: 'Desserts/Cheesecake.jpg', type: 'Desserts', category: 'Desserts', description: 'New York style cheesecake with strawberry sauce.', isPopular: false },
    { id: 'DE09', name: 'Nom Lort ', price: 3.00, image: 'Desserts/Nom Lort.jpg', type: 'Desserts', category: 'Desserts', description: 'The Cambodians often enjoy Nom Lort on special occasions or as a daily treat. This Khmer dessert has a characteristic green color and unique aroma from pandan leaf extract.', isPopular: false },
    { id: 'DE10', name: 'Num Chak Kachan ', price: 3.00, image: 'Desserts/Num Chak Kachan.jpg', type: 'Desserts', category: 'Desserts', description: 'It is a delicious Cambodian dessert that is soft, smooth, and easy to eat.', isPopular: false },
    { id: 'DE11', name: 'Nom Akor ', price: 2.50, image: 'Desserts/Nom Akor.jpg', type: 'Desserts', category: 'Desserts', description: 'It is made primarily from rice flour, coconut milk, and palm sugar, which contribute to its distinctive taste. ', isPopular: false },
    { id: 'DE12', name: 'Nom Kong ', price: 2.50, image: 'Desserts/Nom Kong.jpg', type: 'Desserts', category: 'Desserts', description: 'It is a cake made of rice flour, sweetened with jaggery, and sprinkled with sesame seeds. ', isPopular: false },
    { id: 'DE13', name: 'Num Ansom Chek', price: 2.50, image: 'Desserts/Num Ansom Chek.jpg', type: 'Desserts', category: 'Desserts', description: 'Num Ansom Chek is a type of sticky rice cake wrapped in banana leaves.', isPopular: false },
    { id: 'DE14', name: 'Banh Janeuk ', price: 2.50, image: 'Desserts/Banh Janeuk.jpg', type: 'Desserts', category: 'Desserts', description: 'Banh Janeuk is a famous Cambodian dessert with green bean filling. ', isPopular: false },
    { id: 'DE15', name: 'Mango Sticky Rice ', price: 2.50, image: 'Desserts/Mango Sticky Rice.jpg', type: 'Desserts', category: 'Desserts', description: 'Rice cakes filled with banana and wrapped in banana leaves are steamed to create another of Cambodia’s favorite sweet treats. ', isPopular: false },
    { id: 'DE16', name: 'Num Plae Ai', price: 2.50, image: 'Desserts/Num Plae Ai.jpg', type: 'Desserts', category: 'Desserts', description: 'Glutinous or Sweet Rice Balls are little glutinous rice balls filled with sweet palm sugar and grated coconut fillings, prepared with glutinous rice flour. The freshly grated coconut scrapings are then generously applied to the sweet rice balls.', isPopular: false },

    // --- BEVERAGES (8 items) ---
    { id: 'BE01', name: 'Espresso', price: 2.00, image: 'BEVERAGES/Espresso.jpg', type: 'Beverages', category: 'Beverages', description: 'Single shot of rich espresso.', isPopular: false },
    { id: 'BE02', name: 'Fresh Orange Juice', price: 3.00, image: 'BEVERAGES/Fresh Orange Juice.jpg', type: 'Beverages', category: 'Beverages', description: 'Freshly squeezed, no added sugar.', isPopular: true },
    { id: 'BE03', name: 'Iced Green Tea', price: 2.50, image: 'BEVERAGES/Iced Green Tea.jpg', type: 'Beverages', category: 'Beverages', description: 'Lightly sweetened green tea.', isPopular: false },
    { id: 'BE04', name: 'Coconut Water', price: 2.50, image: 'BEVERAGES/coconut water.jpg', type: 'Beverages', category: 'Beverages', description: 'Fresh Coconut water', isPopular: false },
    { id: 'BE05', name: 'Blue Mojito (Mocktail)', price: 5.00, image: 'BEVERAGES/Blue Mojito (Mocktail).jpg', type: 'Beverages', category: 'Beverages', description: 'Blueberry, simple syrup, and soda water.', isPopular: true },
    { id: 'BE06', name: 'Latte', price: 2.00, image: 'BEVERAGES/Latte.jpg', type: 'Beverages', category: 'Beverages', description: 'Steamed milk with a shot of espresso.', isPopular: false },
    { id: 'BE07', name: 'Chocolate Latte', price: 2.00, image: 'BEVERAGES/chocolate latte.jpg', type: 'Beverages', category: 'Beverages', description: 'chocolate with milk', isPopular: false },
    { id: 'BE08', name: 'Passion soda', price: 2.00, image: 'BEVERAGES/passion soda.jpg', type: 'Beverages', category: 'Beverages', description: 'Passion juice with soda', isPopular: false },

    // --- VEGAN/EXTRAS (8 items, for 50+ total) ---
    { id: 'VG01', name: 'Black Bean Tacos', price: 16.00, image: 'VEGANEXTRAS/Black Bean Tacos.jpg', type: 'Vegan', category: 'Vegan', description: 'Three soft tacos with spiced black beans, pico, and vegan sour cream.', isPopular: true },
    { id: 'VG02', name: 'Avocado Toast', price: 11.50, image: 'VEGANEXTRAS/Avocado Toast.png', type: 'Vegan', category: 'Appetizers', description: 'Sourdough toast topped with mashed avocado, chili flakes, and sprouts.', isPopular: true },
    { id: 'VG03', name: 'Lentil Soup', price: 9.00, image: 'VEGANEXTRAS/Lentil Soup.jpg', type: 'Vegan', category: 'Appetizers', description: 'Hearty soup with red lentils and vegetables.', isPopular: false },
    { id: 'VG04', name: 'Vegan Chocolate Mousse', price: 10.50, image: 'VEGANEXTRAS/Vegan Chocolate Mousse.jpg', type: 'Vegan', category: 'Vegan', description: 'Rich, dairy-free chocolate mousse.', isPopular: false },
    { id: 'VG05', name: 'Fish Proma Omelette', price: 9.99, image: 'img/Fish Proma Omelette.jpg', type: 'Vegan', category: 'Main Dishes', description: 'Fish proma with chopped pork, egg, shallot, garlic and spring onions, served with local fresh vegetables', isPopular: true },
    { id: 'SP01', name: 'Chef\'s Surf & Turf', price: 55.00, image: 'VEGANEXTRAS/Surf & Turf.jpg', type: 'Specials', category: 'Specials', description: 'Filet mignon and lobster tail, seasonal vegetables.', isPopular: true },
    { id: 'SP02', name: 'Spicy Tuna Roll', price: 18.00, image: 'VEGANEXTRAS/Spicy Tuna Roll.jpg', type: 'Specials', category: 'Specials', description: 'Fresh tuna, spicy mayo, cucumber, wrapped in seaweed and rice.', isPopular: false },
    { id: 'SP07', name: 'Machou Ktis', price: 8.99, image: 'img/Machou Ktis.jpg', type: 'Specials', category: 'Main Dishes', description: 'Boneless chicken cooked with Khmer spices, Prahok, , fresh eggplants, pineapple, simmered in coconut cream with sweet basils', isPopular: true },
    { id: 'SP08', name: 'Limited Edition Cocktail', price: 15.00, image: 'VEGANEXTRAS/Limited Edition Cocktail.jpg', type: 'Specials', category: 'Beverages', description: 'A unique mixologist creation available this week only.', isPopular: false },
    { id: 'EX01', name: 'Sweet Potato Fries', price: 7.00, image: 'VEGANEXTRAS/Sweet Potato Fries.jpg', type: 'Appetizers', category: 'Appetizers', description: 'Served with chipotle mayo.', isPopular: false },
    { id: 'EX02', name: 'House Bread Basket', price: 5.00, image: 'VEGANEXTRAS/House Bread Basket.jpg', type: 'Appetizers', category: 'Appetizers', description: 'Assorted fresh baked breads with butter.', isPopular: false },

];

// Export the data so the main script can use it
window.foodCategories = foodCategories;
window.foodItems = foodItems;