import { act, fireEvent, render } from "@testing-library/react";
import RestaurantMenu from "../RestaurantMenu";
import { json } from "react-router-dom";
import MOCK_DATA from "../mocks/mockResMenu.json"
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
global.fetch = jest.fn(()=>{
    return Promise.resolve({
        json: ()=> Promise.resolve(MOCK_DATA)
    })
})

it("Should load Restaurant Cart component", async()=>{
    await act(async()=>render(
        <Provider store={appStore}>
        <RestaurantMenu/>
        </Provider>));

const accordionHeader= screen.getByText("Drinks (9)");
fireEvent.click(accordionHeader);
});