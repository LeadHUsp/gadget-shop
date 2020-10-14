import filterProductReducer, {
  setFilterItems,
  initAddCheckedItems,
  setCheckBoxParams,
  deleteCheckedItem,
  pushCheckedItem,
} from "../../redux/filterProductReducer";

let initialState = {
  filter_items: [],
  checkbox_params: {},
  price_params: "",
  sort_params: "",
};

test("filter items should be set", () => {
  let data = [
    {
      title: "Серия",
      param: "series",
      values: ["iPhone Xr", "iPhone 11"],
    },
  ];
  let action = setFilterItems(data);
  let newState = filterProductReducer(initialState, action);
  expect(newState.filter_items.length).toBe(1);
});
test("filter items after fetching should be contain in array of values object with key checked ", () => {
  let data = [
    {
      title: "Серия",
      param: "series",
      values: ["iPhone Xr", "iPhone 11"],
    },
  ];
  let action = setFilterItems(data);
  let newState = filterProductReducer(initialState, action);

  expect(newState.filter_items[0]).toHaveProperty("values", [
    {
      value_param: "iPhone Xr",
      checked: false,
    },
    {
      value_param: "iPhone 11",
      checked: false,
    },
  ]);
});

test("checkbox params should be set", () => {
  let parsedUrl = {
    series: ["iPhone Xr", "iPhone 11"],
  };
  let action = setCheckBoxParams(parsedUrl);
  let newState = filterProductReducer(initialState, action);
  expect(newState.checkbox_params).toHaveProperty("series", ["iPhone Xr", "iPhone 11"]);
});
test("if checkbox_prarams is array, filter_items should be change", () => {
  let state = {
    checkbox_params: {
      series: ["iPhone Xr", "iPhone 11"],
    },
    filter_items: [
      {
        title: "Серия",
        param: "series",
        values: [
          {
            value_param: "iPhone Xr",
            checked: false,
          },
          {
            value_param: "iPhone 11",
            checked: false,
          },
          {
            value_param: "iPhone 12",
            checked: false,
          },
        ],
      },
    ],
  };
  let action = initAddCheckedItems();
  let newState = filterProductReducer(state, action);
  expect(newState.filter_items[0].values).toEqual([
    {
      value_param: "iPhone Xr",
      checked: true,
    },
    {
      value_param: "iPhone 11",
      checked: true,
    },
    {
      value_param: "iPhone 12",
      checked: false,
    },
  ]);
});
