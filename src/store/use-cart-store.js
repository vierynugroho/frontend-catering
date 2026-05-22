import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cart: [],

  // Action: Tambah / On Add
  addToCart: (product) => {
    const { cart } = get();
    const isExist = cart.find((item) => item.id === product.id);
    const minOrder = product.min_order ?? 1;

    if (isExist) {
      set({
        cart: cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      });
    } else {
      set({
        cart: [
          ...cart,
          {
            id: product.id,
            quantity: minOrder,
            price: product.price,
            name: product.name,
            images: product.images,
            min_order: minOrder,
          },
        ],
      });
    }
  },

  // Action: Update Quantity Langsung (Input Manual)
  updateQuantity: (productId, newQuantity) => {
    const { cart } = get();
    const targetItem = cart.find((item) => item.id === productId);
    const minOrder = targetItem?.min_order ?? 1;

    // Jika 0 atau kurang, hapus dari cart
    if (newQuantity <= 0) {
      set({ cart: cart.filter((item) => item.id !== productId) });
      return;
    }

    // Jika kurang dari min_order, paksa ke min_order
    const safeQuantity = newQuantity < minOrder ? minOrder : newQuantity;

    set({
      cart: cart.map((item) =>
        item.id === productId ? { ...item, quantity: safeQuantity } : item,
      ),
    });
  },

  // Action: Kurang / On Delete
  removeFromCart: (productId) => {
    const { cart } = get();
    const targetItem = cart.find((item) => item.id === productId);
    const minOrder = targetItem?.min_order ?? 1;

    if (targetItem?.quantity <= minOrder) {
      set({ cart: cart.filter((item) => item.id !== productId) });
    } else {
      set({
        cart: cart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      });
    }
  },
  clearCart: () => set({ cart: [] }),
  // Selector: Menghitung Subtotal
  // Kamu bisa panggil ini langsung di UI: const subtotal = useCartStore(state => state.getSubtotal())
  getSubtotal: () => {
    const { cart } = get();
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },
}));

export default useCartStore;
