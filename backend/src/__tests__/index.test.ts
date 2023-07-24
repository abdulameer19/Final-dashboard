import { resolvers } from "../graphql/index";
import { Product } from "../models/product.model";
import { User } from "../models/user.model";
import { Order } from "../models/order.model";

// Accessing the resolver functions

const getPieChartDataResolver = resolvers.Query.getPieChartData;
const getHeatMapDataResolver = resolvers.Query.getHeatMapData;
const getAgeCountDataResolver = resolvers.Query.getAgeCountData;
const getOccupationDataResolver = resolvers.Query.getOccupationData;
const getGenderDataResolver = resolvers.Query.getGenderData;
const getSalesVSTargetDataResolver = resolvers.Query.getSalesVSTargetData;
const getTop10ProductsResolver = resolvers.Query.getTop10Products;

describe("getPieChartData", () => {
  it("should return correct pie chart data", async () => {
    // Mocking the Product.find() function to return dummy data for testing
    const mockData = [
      { productCategory: "Category1" },
      { productCategory: "Category1" },
      { productCategory: "Category2" },
      // Add more data as needed...
    ];

    jest.spyOn(Product, "find").mockResolvedValue(mockData);

    // Execute the resolver function
    const result = await getPieChartDataResolver();

    // Expectations for the result
    expect(result).toEqual({
      category: [
        { categoryName: "Category1", number: 2 },
        { categoryName: "Category2", number: 1 },
        // Add more category data as needed...
      ],
    });
  });
});

describe("getHeatMapData", () => {
  it("should return correct heatmap data", async () => {
    // Mocking the User.find() function to return dummy data for testing
    const mockData = [
      { countryCode: "Country1" },
      { countryCode: "Country1" },
      { countryCode: "Country2" },
      // Add more data as needed...
    ];

    jest.spyOn(User, "find").mockResolvedValue(mockData);

    // Execute the resolver function
    const result = await getHeatMapDataResolver();

    // Expectations for the result
    expect(result).toEqual({
      country: [
        { id: "Country1", value: 2 },
        { id: "Country2", value: 1 },
      ],
    });
  });
});

describe("getAgeCountData", () => {
  it("should return correct age count data", async () => {
    // Mocking the User.find() function to return dummy data for testing
    const mockData = [
      { userAge: 15 },
      { userAge: 18 },
      { userAge: 30 },
      { userAge: 40 },
      // Add more data as needed...
    ];

    jest.spyOn(User, "find").mockResolvedValue(mockData);

    // Execute the resolver function
    const result = await resolvers.Query.getAgeCountData();

    // Expectations for the result
    expect(result).toEqual({
      teen: 2,
      adult: 1,
      senior: 1,
    });
  });
});

describe("getOccupationData", () => {
  it("should return correct occupation data", async () => {
    // Mocking the User.find() function to return dummy data for testing
    const mockData = [
      { occupation: "Engineer" },
      { occupation: "Teacher" },
      { occupation: "Engineer" },
      // Add more data as needed...
    ];

    jest.spyOn(User, "find").mockResolvedValue(mockData);

    // Execute the resolver function
    const result = await resolvers.Query.getOccupationData();

    // Expectations for the result
    expect(result).toEqual([
      { occupationName: "Engineer", number: 2 },
      { occupationName: "Teacher", number: 1 },
      // Add more expectations for other occupations...
    ]);
  });
});

describe("getGenderData", () => {
  it("should return correct gender data", async () => {
    // Mocking the User.find() function to return dummy data for testing
    const mockData = [
      { gender: "Male" },
      { gender: "Female" },
      { gender: "Other" },
      { gender: "Male" },
      // Add more data as needed...
    ];

    jest.spyOn(User, "find").mockResolvedValue(mockData);

    // Execute the resolver function
    const result = await resolvers.Query.getGenderData();

    // Expectations for the result
    expect(result).toEqual({
      male: 2,
      female: 1,
      other: 1,
    });
  });
});

describe("getTop10Products", () => {
  it("should return correct top 10 products data", async () => {
    const mockData = [
      { totalSoldQty: 50, productName: "Product1" },
      { totalSoldQty: 30, productName: "Product2" },
      { totalSoldQty: 20, productName: "Product3" },
      // Add more data as needed...
    ];

    // Mock the Product.find() function to return the mock data
    jest.spyOn(Product, "find").mockResolvedValue(mockData);

    // Execute the resolver function
    const result = await getTop10ProductsResolver();

    // Expectations for the result
    expect(result).toEqual([
      { totalSoldQty: 50, productName: "Product1" },
      { totalSoldQty: 30, productName: "Product2" },
      { totalSoldQty: 20, productName: "Product3" },
      // Add more expectations for other products...
    ]);
  });
});
