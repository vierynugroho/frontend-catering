import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cart: [],

  // Action: Tambah / On Add
  addToCart: (product) => {
    const { cart } = get();
    const isExist = cart.find((item) => item.id === product.id);

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
            quantity: 1,
            price: product.price,
            name: product.name,
            images: product.images,
          },
        ],
      });
    }
  },

  // Action: Update Quantity Langsung (Input Manual)
  updateQuantity: (productId, newQuantity) => {
    const { cart } = get();

    // Validasi: Jika quantity 0 atau kurang, hapus dari cart
    if (newQuantity <= 0) {
      set({ cart: cart.filter((item) => item.id !== productId) });
      return;
    }

    set({
      cart: cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    });
  },

  // Action: Kurang / On Delete
  removeFromCart: (productId) => {
    const { cart } = get();
    const targetItem = cart.find((item) => item.id === productId);

    if (targetItem?.quantity === 1) {
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
