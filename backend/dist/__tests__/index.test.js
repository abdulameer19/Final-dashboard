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
const index_1 = require("../graphql/index");
const product_model_1 = require("../models/product.model");
const user_model_1 = require("../models/user.model");
// Accessing the resolver functions
const getPieChartDataResolver = index_1.resolvers.Query.getPieChartData;
const getHeatMapDataResolver = index_1.resolvers.Query.getHeatMapData;
const getAgeCountDataResolver = index_1.resolvers.Query.getAgeCountData;
const getOccupationDataResolver = index_1.resolvers.Query.getOccupationData;
const getGenderDataResolver = index_1.resolvers.Query.getGenderData;
const getSalesVSTargetDataResolver = index_1.resolvers.Query.getSalesVSTargetData;
const getTop10ProductsResolver = index_1.resolvers.Query.getTop10Products;
describe("getPieChartData", () => {
    it("should return correct pie chart data", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocking the Product.find() function to return dummy data for testing
        const mockData = [
            { productCategory: "Category1" },
            { productCategory: "Category1" },
            { productCategory: "Category2" },
            // Add more data as needed...
        ];
        jest.spyOn(product_model_1.Product, "find").mockResolvedValue(mockData);
        // Execute the resolver function
        const result = yield getPieChartDataResolver(null);
        // Expectations for the result
        expect(result).toEqual({
            category: [
                { categoryName: "Category1", number: 2 },
                { categoryName: "Category2", number: 1 },
            ],
        });
    }));
});
describe("getHeatMapData", () => {
    it("should return correct heatmap data", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocking the User.find() function to return dummy data for testing
        const mockData = [
            { countryCode: "Country1" },
            { countryCode: "Country1" },
            { countryCode: "Country2" },
            // Add more data as needed...
        ];
        jest.spyOn(user_model_1.User, "find").mockResolvedValue(mockData);
        // Execute the resolver function
        const result = yield getHeatMapDataResolver(null);
        // Expectations for the result
        expect(result).toEqual({
            country: [
                { id: "Country1", value: 2 },
                { id: "Country2", value: 1 },
            ],
        });
    }));
});
describe("getAgeCountData", () => {
    it("should return correct age count data", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocking the User.find() function to return dummy data for testing
        const mockData = [
            { userAge: 15 },
            { userAge: 18 },
            { userAge: 30 },
            { userAge: 40 },
            // Add more data as needed...
        ];
        jest.spyOn(user_model_1.User, "find").mockResolvedValue(mockData);
        // Execute the resolver function
        const result = yield getAgeCountDataResolver(null);
        // Expectations for the result
        expect(result).toEqual({
            teen: 2,
            adult: 1,
            senior: 1,
        });
    }));
});
describe("getOccupationData", () => {
    it("should return correct occupation data", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocking the User.find() function to return dummy data for testing
        const mockData = [
            { occupation: "Engineer" },
            { occupation: "Teacher" },
            { occupation: "Engineer" },
            // Add more data as needed...
        ];
        jest.spyOn(user_model_1.User, "find").mockResolvedValue(mockData);
        // Execute the resolver function
        const result = yield getOccupationDataResolver(null);
        // Expectations for the result
        expect(result).toEqual([
            { occupationName: "Engineer", number: 2 },
            { occupationName: "Teacher", number: 1 },
            // Add more expectations for other occupations...
        ]);
    }));
});
describe("getGenderData", () => {
    it("should return correct gender data", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocking the User.find() function to return dummy data for testing
        const mockData = [
            { gender: "Male" },
            { gender: "Female" },
            { gender: "Other" },
            { gender: "Male" },
            // Add more data as needed...
        ];
        jest.spyOn(user_model_1.User, "find").mockResolvedValue(mockData);
        // Execute the resolver function
        const result = yield getGenderDataResolver(null);
        // Expectations for the result
        expect(result).toEqual({
            male: 2,
            female: 1,
            other: 1,
        });
    }));
});
describe("getSalesVSTargetData", () => {
    it("should return correct sales vs target data", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocking the Product.find() function to return dummy data for testing
        const mockData = [
            { productExpectedSale: 100, totalSoldQty: 80, productName: "Product1" },
            { productExpectedSale: 200, totalSoldQty: 150, productName: "Product2" },
            // Add more data as needed...
        ];
        jest.spyOn(product_model_1.Product, "find").mockResolvedValue(mockData);
        // Execute the resolver function
        const result = yield getSalesVSTargetDataResolver(null);
        // Expectations for the result
        expect(result).toEqual([
            {
                expectedSellProduct: 100,
                totalSellProduct: 80,
                productName: "Product1",
            },
            {
                expectedSellProduct: 200,
                totalSellProduct: 150,
                productName: "Product2",
            },
            // Add more expectations for other products...
        ]);
    }));
});
describe("getTop10Products", () => {
    it("should return correct top 10 products data", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocking the Product.find() function to return dummy data for testing
        const mockData = [
            { totalSoldQty: 50, productName: "Product1" },
            { totalSoldQty: 30, productName: "Product2" },
            // Add more data as needed...
        ];
        jest.spyOn(product_model_1.Product, "find").mockResolvedValue(mockData);
        // Execute the resolver function
        const result = yield getTop10ProductsResolver(null);
        // Expectations for the result
        expect(result).toEqual([
            { totalSoldQty: 50, productName: "Product1" },
            { totalSoldQty: 30, productName: "Product2" },
            // Add more expectations for other products...
        ]);
    }));
});
