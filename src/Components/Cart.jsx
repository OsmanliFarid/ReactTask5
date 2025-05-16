import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoCreate } from "react-icons/io5";

const Cart = () => {
  const ENDPOINT = "http://localhost:3000/users";
  const [User, SetUser] = useState([]);

  useEffect(() => {
    axios.get(ENDPOINT).then(({ data }) => {
      SetUser(data);
    });
  }, []);
  const ShowDelete = (id) => {
    const b = User.filter((item) => item.id !== id);
    SetUser(b);
  };
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      {User.map(({ id, ad, soyad, telefon }, index) => (
        <div
          key={index}
          className="w-[400px] bg-[#5b5a5a] text-white rounded-[20px] shadow-lg p-6"
        >
          <p className="text-xl font-bold mb-2">
            👤 {ad} {soyad}
          </p>
          <p className="text-md text-gray-200 mb-4">📞 {telefon}</p>

          <div className="flex justify-end gap-4">
            <MdDelete
              onClick={() => ShowDelete(id)}
              className="text-2xl text-red-500 cursor-pointer"
            />
            <IoCreate className="text-2xl text-blue-400 cursor-pointer" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
