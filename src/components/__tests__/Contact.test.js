import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import Contact from "../Contact";

describe("Contact Us Page Test Case", () => {
    // it is alias of test
    it("Should load contact us component", () => {
        render(<Contact />);
    
        const heading = screen.getByRole("heading");
    
        expect(heading).toBeInTheDocument();
    
    })
    
    test("Should load button inside contact us component", () => {
        render(<Contact />);
    
        const button = screen.getByRole("button",{name:"Submit"});
        
    
        // const button = screen.getByText("fghjhjh");
        
        expect(button).toBeInTheDocument();
    
    })
    
    test("Should load input inside contact us component", () => {
        render(<Contact />);
     
        const inputName = screen.getByPlaceholderText("name");
    
        expect(inputName).toBeInTheDocument();
    
    })
    
    test("Should load 2 input inside contact us component", () => {
        render(<Contact />);
     
        const inputBoxes = screen.getAllByRole("textbox")
    
        // console.log(inputBoxes.length)
    
        expect(inputBoxes.length).toBe(2)
        // expect(inputBoxes.length).toBe(3)
    
    })
})
