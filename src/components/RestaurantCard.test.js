import { render, screen } from "@testing-library/react"
import RestaurantCard from "./RestaurantCard"
import MOCK_DATA from "../components/mocks/resCarrdMock.json"
import "@testing-library/jest-dom"

it("should render RestaurantCard component with props", () => {
    render(<RestaurantCard resData={MOCK_DATA} />);

    const name = screen.getByText("Pizza Hut");

    expect(name).toBeInTheDocument();
})

// it("should render withPromoted RestaurantCard component with props", () => {
    
// })