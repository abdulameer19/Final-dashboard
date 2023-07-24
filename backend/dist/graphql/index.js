"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
const user_model_1 = require("../models/user.model");
const product_model_1 = require("../models/product.model");
const order_model_1 = require("../models/order.model");
const typeDefs = (0, graphql_tag_1.gql) `
  type category {
    categoryName: String
    number: Int
  }

  type pieChart {
    category: [category]
  }

  type country {
    id: String
    value: Int
  }

  type heatMap {
    country: [country]
  }

  type ageCount {
    teen: String
    adult: String
    senior: String
  }

  type occupation {
    occupationName: String
    number: Int
  }

  type gender {
    male: Int
    female: Int
    other: Int
  }

  type salesVSTarget {
    totalSellProduct: Int
    expectedSellProduct: Int
    productName: String
  }

  type top10Products {
    totalSoldQty: Int
    productName: String
  }

  type revenueAnalysis {
    revenue: Int
    cost: Int
    profit: Int
    month: Int
    productName: String
  }

  type Query {
    getPieChartData: pieChart!
    getHeatMapData: heatMap!
    getAgeCountData: ageCount!
    getOccupationData: [occupation]!
    getGenderData: gender!
    getSalesVSTargetData: [salesVSTarget]!
    getTop10Products: [top10Products]!
    getRevenueAnalysisData: [revenueAnalysis]!
  }
`;
exports.typeDefs = typeDefs;
const resolvers = {
    Query: {
        getPieChartData: () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield product_model_1.Product.find();
            if (!data) {
                return { category: [] };
            }
            const categoryMap = new Map();
            data.forEach((element) => {
                const productCategory = element.productCategory;
                if (productCategory !== undefined) {
                    if (categoryMap.has(productCategory)) {
                        categoryMap.set(productCategory, categoryMap.get(productCategory) + 1);
                    }
                    else {
                        categoryMap.set(productCategory, 1);
                    }
                }
            });
            const category = Array.from(categoryMap.entries()).map(([categoryName, number]) => ({
                categoryName,
                number,
            }));
            return { category };
        }),
        getHeatMapData: () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield user_model_1.User.find(); // Replace 'User' with the correct type of your data
            const countryMap = new Map();
            data.forEach((element) => {
                const countryCode = element.countryCode;
                countryMap.set(countryCode, (countryMap.get(countryCode) || 0) + 1);
            });
            const countryData = Array.from(countryMap, ([id, value]) => ({ id, value }));
            return { country: countryData };
        }),
        getAgeCountData: () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield user_model_1.User.find();
            const ageCount = {
                teen: 0,
                adult: 0,
                senior: 0,
            };
            data.forEach((element) => {
                if (element.userAge >= 13 && element.userAge <= 19) {
                    ageCount.teen++;
                }
                else if (element.userAge > 19 && element.userAge <= 34) {
                    ageCount.adult++;
                }
                else if (element.userAge > 34) {
                    ageCount.senior++;
                }
            });
            return ageCount;
        }),
        getOccupationData: () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield user_model_1.User.find();
            let category = [];
            data.forEach((element) => {
                const existingCategory = category.find((re) => re.occupationName === element.occupation);
                if (existingCategory) {
                    existingCategory.number += 1;
                }
                else {
                    category.push({
                        occupationName: element.occupation,
                        number: 1,
                    });
                }
            });
            return category;
        }),
        getGenderData: () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield user_model_1.User.find();
            return {
                male: data.filter((e) => e.gender === "Male").length,
                female: data.filter((e) => e.gender === "Female").length,
                other: data.filter((e) => e.gender === "Other").length,
            };
        }),
        getSalesVSTargetData: () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield product_model_1.Product.find();
            const returnData = data.map((e) => ({
                expectedSellProduct: e.productExpectedSale,
                totalSellProduct: e.totalSoldQty,
                productName: e.productName,
            }));
            return returnData;
        }),
        getTop10Products: () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield product_model_1.Product.find();
            const sortedProducts = data.sort((a, b) => b.totalSoldQty - a.totalSoldQty);
            const top10Products = sortedProducts.slice(0, 10).map((e) => ({
                totalSoldQty: e.totalSoldQty,
                productName: e.productName,
            }));
            return top10Products;
        }),
        getRevenueAnalysisData: () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield order_model_1.Order.find().populate({ path: "productID" });
            const Analysis = [];
            data.forEach((element) => {
                const existingCategory = Analysis.find((re) => re.month === new Date(element.purchaseDate).getMonth());
                if (existingCategory) {
                    existingCategory.cost += element.productID.cost * element.quantity;
                    existingCategory.revenue +=
                        element.productID.productPrice * element.quantity;
                    existingCategory.profit +=
                        element.productID.productPrice * element.quantity -
                            element.productID.cost * element.quantity;
                }
                else {
                    Analysis.push({
                        revenue: element.productID.productPrice * element.quantity,
                        cost: element.productID.cost * element.quantity,
                        profit: element.productID.productPrice * element.quantity -
                            element.productID.cost * element.quantity,
                        month: new Date(element.purchaseDate).getMonth(),
                    });
                }
            });
            return Analysis;
        }),
    },
};
exports.resolvers = resolvers;
