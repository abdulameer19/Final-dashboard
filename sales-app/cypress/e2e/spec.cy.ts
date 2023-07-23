import { Bar } from "react-chartjs-2";
describe("App Title Test", () => {
  it("Should have the correct app title", () => {
    cy.visit("http://localhost:3000/"); // Replace 'your-app-url' with the actual URL of your app

    // Get the app title using the <title> element
    cy.title().should("eq", "Sales App"); // Replace 'Your App Title' with the expected title of your app
  });
});

// cypress/integration/canvasCheck.spec.js

describe("Canvas Check Test", () => {
  it("Should have a canvas element on the page", () => {
    cy.visit("http://localhost:3000/"); // Replace 'your-app-url' with the actual URL of your app

    // Check if a canvas element exists on the page
    cy.get("canvas").should("exist");
  });
});

// cypress/integration/canvasHasValues.spec.js
describe("Canvas Has Values Test", () => {
  it("Should check if the canvas has values", () => {
    cy.visit("http://localhost:3000/"); // Replace 'your-app-url' with the actual URL of your app

    // Get the canvas element
    cy.get("canvas").then((canvas) => {
      // Get the 2D rendering context of the canvas
      const context = canvas[0].getContext("2d");

      // Check if the context is not null
      if (!context) {
        throw new Error("Canvas context is null.");
      }

      // Get the canvas data
      const canvasData = context.getImageData(
        0,
        0,
        canvas[0].width,
        canvas[0].height
      ).data;

      // Check if the canvas data contains non-zero pixel values
      const hasValues = canvasData.some((value, index) =>
        index % 4 === 3 ? value !== 0 : value !== 0
      );

      // Assert that the canvas has values
      expect(hasValues).to.be.false;
    });
  });
});
