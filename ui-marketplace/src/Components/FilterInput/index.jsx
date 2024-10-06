export const FilterInput = ({ placeholder, value, onChange }) => (
  <div className="mb-10">
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
    />
  </div>
);
