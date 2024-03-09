import React, { useReducer } from "react";




const initialState = {
    products: [],
    filteredProducts: [],
    selectedBrand: "",
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return {
                ...state,
                products: action.payload,
            };
        case "FILTER_PRODUCTS":
            return {
                ...state,
                filteredProducts: state.products.filter(
                    (product) => product.brand === action.payload
                ),
            };
        case "SELECT_BRAND":
            return {
                ...state,
                selectedBrand: action.payload,
            };
        default:
            return state;
    }
};

const ProductFilter = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleSelectBrand = (event) => {
        dispatch({
            type: "SELECT_BRAND",
            payload: event.target.value,
        });
    };

    const filterProducts = () => {
        dispatch({
            type: "FILTER_PRODUCTS",
            payload: state.selectedBrand,
        });
    };

    return (
        <div>
            <h1>Product Filter</h1>
            <select value={state.selectedBrand} onChange={handleSelectBrand}>
                <option value="">All Brands</option>
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="Puma">Puma</option>
            </select>
            <button onClick={filterProducts}>Filter Products</button>
            <ul>
                {state.filteredProducts.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductFilter;