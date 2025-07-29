"use client";

type CartModalProps = {
  onClose: () => void;
  position: { top: number; left: number };
};

export default function CartModal({ onClose, position }: CartModalProps) {
  return (
    <div
      className="absolute bg-white shadow-lg rounded-lg w-72 p-4 z-50"
      style={{
        top: position.top,
        left: position.left,
        position: "fixed", 
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button onClick={onClose} className="text-gray-500 text-sm">
          Close
        </button>
      </div>

   
      <p className="text-gray-700">Cart items will show here</p>

      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded">
        Checkout
      </button>
    </div>
  );
}
