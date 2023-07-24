import { gql } from "graphql-tag";
import { User, IUser } from "../models/user.model";
import { IProduct, Product } from "../models/product.model";
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
interface User {
  userAge: number;
  occupation: string;
  gender: string;
  // Add other properties as needed
}

interface AgeCount {
  teen: number;
  adult: number;
  senior: number;
}

interface OccupationData {
  occupationName: string;
  number: number;
}

interface GenderData {
  male: number;
  female: number;
  other: number;
}
interface CategoryInfo {
  categoryName: string;
  number: number;
}
interface HeatMapData {
  id: string;
  value: number;
}
const resolvers = {
  Query: {
    getPieChartData: async (): Promise<{ category: CategoryInfo[] }> => {
      const data: IProduct[] | undefined = await Product.find();

      if (!data) {
        return { category: [] };
      }

      const categoryMap: Map<string, number> = new Map();

      data.forEach((element: IProduct) => {
        const productCategory: string | undefined = element.productCategory;

        if (productCategory !== undefined) {
          if (categoryMap.has(productCategory)) {
            categoryMap.set(
              productCategory,
              categoryMap.get(productCategory)! + 1
            );
          } else {
            categoryMap.set(productCategory, 1);
          }
        }
      });

      const category: CategoryInfo[] = Array.from(categoryMap.entries()).map(
        ([categoryName, number]) => ({
          categoryName,
          number,
        })
      );

      return { category };
    },
    getHeatMapData: async (): Promise<{ country: HeatMapData[] }> => {
      const data: any[] = await User.find(); // Replace 'User' with the correct type of your data

      const countryMap = new Map<string, number>();

      data.forEach((element: any) => {
        const countryCode: string = element.countryCode;
        countryMap.set(countryCode, (countryMap.get(countryCode) || 0) + 1);
      });

      const countryData: HeatMapData[] = Array.from(
        countryMap,
        ([id, value]) => ({ id, value })
      );

      return { country: countryData };
    },

    getAgeCountData: async (): Promise<AgeCount> => {
      const data: IUser[] = await User.find();
      const ageCount: AgeCount = {
        teen: 0,
        adult: 0,
        senior: 0,
      };
      data.forEach((element) => {
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

    getOccupationData: async (): Promise<OccupationData[]> => {
      const data: IUser[] = await User.find();
      let category: OccupationData[] = [];

      data.forEach((element) => {
        const existingCategory = category.find(
          (re) => re.occupationName === element.occupation
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

    getGenderData: async (): Promise<GenderData> => {
      const data: IUser[] = await User.find();
      return {
        male: data.filter((e) => e.gender === "Male").length,
        female: data.filter((e) => e.gender === "Female").length,
        other: data.filter((e) => e.gender === "Other").length,
      };
    },
    getSalesVSTargetData: async () => {
      const data = await Product.find();
      const returnData: any[] = data.map((e: any) => ({
        expectedSellProduct: e.productExpectedSale,
        totalSellProduct: e.totalSoldQty,
        productName: e.productName,
      }));
      return returnData;
    },

    getTop10Products: async () => {
      const data = await Product.find();
      const sortedProducts = data.sort(
        (a: any, b: any) => b.totalSoldQty - a.totalSoldQty
      );

      const top10Products = sortedProducts.slice(0, 10).map((e: any) => ({
        totalSoldQty: e.totalSoldQty,
        productName: e.productName,
      }));

      return top10Products;
    },

    getRevenueAnalysisData: async () => {
      const data = await Order.find().populate({ path: "productID" });

      const Analysis: any[] = [];
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
