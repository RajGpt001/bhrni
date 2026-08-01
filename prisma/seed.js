/* eslint-disable */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var PrismaClient = require('@prisma/client').PrismaClient;
var PrismaSqlite = require('prisma-adapter-sqlite').PrismaSqlite;
var adapter = new PrismaSqlite({ url: './dev.db' });
var prisma = new PrismaClient({ adapter: adapter });
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var electronics, fashion, home, beauty, grocery, seller, productsToSeed, _i, productsToSeed_1, p, createdProduct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Seeding database...');
                    return [4 /*yield*/, prisma.category.upsert({
                            where: { slug: 'electronics' },
                            update: {},
                            create: { name: 'Electronics', slug: 'electronics', description: 'Gadgets, phones, and more.' }
                        })];
                case 1:
                    electronics = _a.sent();
                    return [4 /*yield*/, prisma.category.upsert({
                            where: { slug: 'fashion' },
                            update: {},
                            create: { name: 'Fashion', slug: 'fashion', description: 'Clothing and apparel.' }
                        })];
                case 2:
                    fashion = _a.sent();
                    return [4 /*yield*/, prisma.category.upsert({
                            where: { slug: 'home-kitchen' },
                            update: {},
                            create: { name: 'Home & Kitchen', slug: 'home-kitchen', description: 'Appliances and decor.' }
                        })];
                case 3:
                    home = _a.sent();
                    return [4 /*yield*/, prisma.category.upsert({
                            where: { slug: 'beauty' },
                            update: {},
                            create: { name: 'Beauty', slug: 'beauty', description: 'Cosmetics and personal care.' }
                        })];
                case 4:
                    beauty = _a.sent();
                    return [4 /*yield*/, prisma.category.upsert({
                            where: { slug: 'grocery' },
                            update: {},
                            create: { name: 'Grocery', slug: 'grocery', description: 'Daily essentials.' }
                        })];
                case 5:
                    grocery = _a.sent();
                    return [4 /*yield*/, prisma.seller.create({
                            data: {
                                name: 'Lyke Official Retail',
                                description: 'The official retail arm of Lyke India',
                                verified: true,
                            }
                        })];
                case 6:
                    seller = _a.sent();
                    productsToSeed = [
                        {
                            name: 'Smartphone Pro Max',
                            slug: 'smartphone-pro-max',
                            description: 'The latest flagship smartphone with an incredible camera.',
                            categoryId: electronics.id,
                            sellerId: seller.id,
                            mrp: 99999,
                            price: 89999,
                            featured: true,
                            imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351cb31b?w=800&q=80',
                            modelUrl: '/models/placeholder.glb',
                        },
                        {
                            name: 'Wireless Noise-Cancelling Headphones',
                            slug: 'wireless-headphones-nc',
                            description: 'Premium over-ear headphones.',
                            categoryId: electronics.id,
                            sellerId: seller.id,
                            mrp: 29999,
                            price: 19999,
                            featured: true,
                            imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80',
                            modelUrl: '/models/placeholder.glb',
                        },
                        {
                            name: 'Men\'s Casual Cotton Shirt',
                            slug: 'mens-casual-cotton-shirt',
                            description: 'Comfortable everyday wear.',
                            categoryId: fashion.id,
                            sellerId: seller.id,
                            mrp: 1999,
                            price: 999,
                            featured: false,
                            imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?w=800&q=80',
                        },
                        {
                            name: 'Smart 4K TV 55-inch',
                            slug: 'smart-4k-tv-55',
                            description: 'Stunning picture quality.',
                            categoryId: electronics.id,
                            sellerId: seller.id,
                            mrp: 54999,
                            price: 45999,
                            featured: true,
                            imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80',
                        },
                        {
                            name: 'Hydrating Face Serum',
                            slug: 'hydrating-face-serum',
                            description: 'Glow all day long.',
                            categoryId: beauty.id,
                            sellerId: seller.id,
                            mrp: 1299,
                            price: 899,
                            featured: false,
                            imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
                        },
                        {
                            name: 'Non-Stick Cookware Set',
                            slug: 'non-stick-cookware-set',
                            description: 'Cook like a pro.',
                            categoryId: home.id,
                            sellerId: seller.id,
                            mrp: 4999,
                            price: 2999,
                            featured: false,
                            imageUrl: 'https://images.unsplash.com/photo-1584990347449-a6a9b4414e86?w=800&q=80',
                        },
                    ];
                    _i = 0, productsToSeed_1 = productsToSeed;
                    _a.label = 7;
                case 7:
                    if (!(_i < productsToSeed_1.length)) return [3 /*break*/, 10];
                    p = productsToSeed_1[_i];
                    return [4 /*yield*/, prisma.product.upsert({
                            where: { slug: p.slug },
                            update: {},
                            create: {
                                name: p.name,
                                slug: p.slug,
                                description: p.description,
                                categoryId: p.categoryId,
                                sellerId: p.sellerId,
                                mrp: p.mrp,
                                price: p.price,
                                featured: p.featured,
                                modelUrl: p.modelUrl,
                                images: {
                                    create: [{ url: p.imageUrl, alt: p.name }]
                                }
                            }
                        })];
                case 8:
                    createdProduct = _a.sent();
                    console.log("Created product: ".concat(createdProduct.name));
                    _a.label = 9;
                case 9:
                    _i++;
                    return [3 /*break*/, 7];
                case 10:
                    console.log('Seeding complete.');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
