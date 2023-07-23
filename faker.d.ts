declare module "faker" {
  interface Commerce {
    productName: () => string;
    department: () => string;
    price: () => string;
  }

  interface Datatype {
    number: (options?: { min?: number; max?: number }) => number;
  }

  interface Address {
    country: () => string;
  }

  interface Faker {
    commerce: Commerce;
    datatype: Datatype;
    address: Address;
  }

  const faker: Faker;

  export default faker;
}
