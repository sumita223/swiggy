import { fireEvent, render } from "@testing-library/react"
import '@testing-library/jest-dom'
import Body from "../Body"
import MOCK_DATA from "../mocks/mockRestListData.json"
import {act} from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

import { act } from "react";

global.fetch= jest.fn(()=>{
    return Promise.resolve({
        json:()=>{
            return Promise.resolve(MOCK_DATA);
        }
    })
});

it("Should search Res List for burger text input", async()=>{

    await act(async ()=>
        render(
            <BrowserRouter>
            <Body/>
            </BrowserRouter>));

    const searchBtn = screen.getByRole("button",{name: "Search"});
    console.log(searchBtn);

    const searchInput = screen.getByTestId("searchInput")
    fireEvent.change(searchInput, {target: {value: "burger"}})
    fireEvent.change(searchBtn);

    const cards= screen.getAllByTestId("resCard");
    //expect(searchBtn).toBeInTheDocument();
    expect(cards.length).toBe(2);
    
});