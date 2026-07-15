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

    // Tidak pernah turun di bawah min_order (termasuk 0), paksa ke min_order
    const safeQuantity = newQuantity < minOrder ? minOrder : newQuantity;

    set({
      cart: cart.map((item) =>
        item.id === productId ? { ...item, quantity: safeQuantity } : item,
      ),
    });
  },

  // Action: Kurangi quantity (tidak pernah menghapus item / turun di bawah min_order)
  removeFromCart: (productId) => {
    const { cart } = get();
    const targetItem = cart.find((item) => item.id === productId);
    const minOrder = targetItem?.min_order ?? 1;

    if (!targetItem || targetItem.quantity <= minOrder) return;

    set({
      cart: cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    });
  },
  // Action: Hapus item dari cart sepenuhnya (tombol X)
  deleteFromCart: (productId) => {
    const { cart } = get();
    set({ cart: cart.filter((item) => item.id !== productId) });
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
