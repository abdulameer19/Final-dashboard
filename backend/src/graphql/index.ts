import { gql } from "graphql-tag";
import { User } from "../models/user.model";
import { Product } from "../models/product.model";
import { Order } from "../models/order.model";

const typeDefs = gql`
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
interface RevenueAnalysis {
  revenue: number;
  cost: number;
  profit: number;
  month: number;
  productName: string;
}
interface ProductCategory {
  productCategory: string;
}

interface CategoryData {
  categoryName: string;
  number: number;
}

const resolvers = {
  Query: {
    getPieChartData: async (_: any) => {
      const data = await Product.find();
      let category: any = [];

      data.forEach((element: any) => {
        const existingCategory = category.find(
          (re: any) => re.categoryName === element.productCategory
        );

        if (existingCategory) {
          existingCategory.number += 1;
        } else {
          category.push({
            categoryName: element.productCategory,
            number: 1,
          });
        }
      });
      return { category: category };
    },
    getHeatMapData: async (_: any) => {
      const data = await User.find();
      let category: any = [];

      data.forEach((element: any) => {
        const existingCategory = category.find(
          (re: any) => re.id === element.countryCode
        );

        if (existingCategory) {
          existingCategory.value += 1;
        } else {
          category.push({
            id: element.countryCode,
            value: 1,
          });
        }
      });
      return { country: category };
    },
    getAgeCountData: async (_: any) => {
      const data = await User.find();
      const ageCount = {
        teen: 0,
        adult: 0,
        senior: 0,
      };
      data.forEach((element: any) => {
        if (element.userAge >= 13 && element.userAge <= 19) {
          ageCount.teen++;
        } else if (element.userAge > 19 && element.userAge <= 34) {
          ageCount.adult++;
        } else if (element.userAge > 34) {
          ageCount.senior++;
        }
      });
      return ageCount;
    },
    getOccupationData: async (_: any) => {
      const data = await User.find();
      let category: any = [];

      data.forEach((element: any) => {
        const existingCategory = category.find(
          (re: any) => re.occupationName === element.occupation
        );

        if (existingCategory) {
          existingCategory.number += 1;
        } else {
          category.push({
            occupationName: element.occupation,
            number: 1,
          });
        }
      });
      return category;
    },

    getGenderData: async (_: any) => {
      const data = await User.find();
      return {
        male: data.filter((e: any) => e.gender === "Male").length,
        female: data.filter((e: any) => e.gender === "Female").length,
        other: data.filter((e: any) => e.gender === "Other").length,
      };
    },

    getSalesVSTargetData: async (_: any) => {
      const data = await Product.find();
      let returnData: any = [];
      data.forEach((e: any) => {
        returnData.push({
          expectedSellProduct: e.productExpectedSale,
          totalSellProduct: e.totalSoldQty,
          productName: e.productName,
        });
      });

      return returnData;
    },

    getTop10Products: async (_: any) => {
      const data = await Product.find();
      const sortedProducts = data.sort(
        (a: any, b: any) => b.totalSoldQty - a.totalSoldQty
      );

      return sortedProducts.map((e: any) => {
        return { totalSoldQty: e.totalSoldQty, productName: e.productName };
      });
    },

    getRevenueAnalysisData: async (_: any) => {
      const data = await Order.find().populate({ path: "productID" });

      let Analysis: any = [];
      data.forEach((element: any) => {
        const existingCategory = Analysis.find(
          (re: any) => re.month === new Date(element.purchaseDate).getMonth()
        );

        if (existingCategory) {
          existingCategory.cost += element.productID.cost * element.quantity;
          existingCategory.revenue +=
            element.productID.productPrice * element.quantity;
          existingCategory.profit +=
            element.productID.productPrice * element.quantity -
            element.productID.cost * element.quantity;
        } else {
          Analysis.push({
            revenue: element.productID.productPrice * element.quantity,
            cost: element.productID.cost * element.quantity,
            profit:
              element.productID.productPrice * element.quantity -
              element.productID.cost * element.quantity,
            month: new Date(element.purchaseDate).getMonth(),
          });
        }
      });

      return Analysis;
    },
  },
};

export { typeDefs, resolvers };
