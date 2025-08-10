import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from "react";

// =================================================================================

const INITIAL_CART = [];
const INITIAL_STATE = {
  cart: INITIAL_CART,
  searchVal: "",
  orderDetails: {
    name: "",
    email: "",
    contact: "",
    address: "",
  },
};

const AppContext = createContext({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_CART_AMOUNT": {
      let cartList = state.cart;
      let cartItem = action.payload;
      let exist = cartList.find((item) => item.id === cartItem.id);

      if (cartItem.qty < 1) {
        const filteredCart = cartList.filter((item) => item.id !== cartItem.id);
        return { ...state, cart: filteredCart };
      }

      if (exist) {
        const newCart = cartList.map((item) =>
          item.id === cartItem.id ? { ...item, qty: cartItem.qty } : item
        );
        return { ...state, cart: newCart };
      }

      return { ...state, cart: [...cartList, cartItem] };
    }

    case "SET_SEARCH_VAL":
      return { ...state, searchVal: action.searchVal };

    case "SET_ORDER_DETAILS":
      return { ...state, orderDetails: action.payload };

    case "EMPTY_CART":
      return { ...state, cart: [] };

    case "HYDRATE": // load from localStorage
      return action.payload;

    default:
      return state;
  }
};

// =======================================================

// ======================== Provider ========================
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // Load and hydrate with deserialization
  useEffect(() => {
    (async () => {
      try {
        const stored = localStorage.getItem("appState");
        if (stored) {
          const parsed = JSON.parse(stored);
          // Convert serialized files back to File objects
          const hydratedState = convertSerializableToFiles(parsed);
          dispatch({ type: "HYDRATE", payload: hydratedState });
        }
      } catch (err) {
        console.error("Failed to load state from localStorage", err);
      }
    })();
  }, []);

  // Save state with serialization of files
  useEffect(() => {
    (async () => {
      try {
        // console.log("Persisting the App State");
        const serializableState = await convertFilesToSerializable(state);
        // console.log(serializableState);
        localStorage.setItem("appState", JSON.stringify(serializableState));
        // console.log("Persisted the App State");
      } catch (err) {
        console.error("Failed to save state to localStorage", err);
      }
    })();
  }, [state]);

  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result); // result includes data URL prefix!
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// Convert all File objects inside an object to { __isFile: true, name, type, data: base64 }
const convertFilesToSerializable = async (obj) => {
  if (obj instanceof File) {
    const base64 = await fileToBase64(obj);
    return {
      __isFile: true,
      name: obj.name,
      type: obj.type,
      data: base64,
    };
  }

  if (Array.isArray(obj)) {
    return Promise.all(obj.map((item) => convertFilesToSerializable(item)));
  }

  if (obj !== null && typeof obj === "object") {
    const entries = await Promise.all(
      Object.entries(obj).map(async ([key, value]) => [
        key,
        await convertFilesToSerializable(value),
      ])
    );
    return Object.fromEntries(entries);
  }

  return obj; // primitives unchanged
};

// Convert back from { __isFile: true, name, type, data } to File object recursively
const convertSerializableToFiles = (obj) => {
  if (
    obj &&
    typeof obj === "object" &&
    obj.__isFile &&
    typeof obj.data === "string"
  ) {
    return base64ToFile(obj.data, obj.name, obj.type);
  }

  if (Array.isArray(obj)) {
    return obj.map(convertSerializableToFiles);
  }

  if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        convertSerializableToFiles(value),
      ])
    );
  }

  return obj;
};

const base64ToFile = (base64String, fileName, mimeType) => {
  const arr = base64String.split(",");
  const mime = arr[0].match(/:(.*?);/)[1] || mimeType;
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
};

export const useAppContext = () => useContext(AppContext);
export default AppContext;
