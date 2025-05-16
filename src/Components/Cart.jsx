import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";

const Cart = () => {
  const ENDPOINT = "http://localhost:3000/users";
  const [User, SetUser] = useState([]);
  const [loader, Setloader] = useState(true);
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [telefon, setTelefon] = useState("");

  useEffect(() => {
    axios.get(ENDPOINT).then(({ data }) => {
      SetUser(data);
      Setloader(false);
    });
  }, []);

  const ShowDelete = (id) => {
    axios.delete(ENDPOINT + "/" + id).then(({ data }) => {
      const b = User.filter((item) => item.id !== id);
      SetUser(b);
    });
  };

  const SubmitShow = (event) => {
    event.preventDefault();
    let arr = { ad, soyad, telefon };

    axios.post(ENDPOINT, arr).then(({ data }) => {
      SetUser([...User, data]);
      setAd("");
      setSoyad("");
      setTelefon("");
    });
  };

  return (
    <>
      <div className="w-[400px] bg-red-800 rounded-lg p-6 shadow-lg block">
        <form
          method="get"
          className="flex flex-col gap-4"
          onSubmit={SubmitShow}
        >
          <input
            type="text"
            placeholder="Ad"
            value={ad}
            onChange={(e) => setAd(e.target.value)}
            className="p-3 rounded-md border-2 border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
          />

          <input
            type="text"
            placeholder="Soyad"
            value={soyad}
            onChange={(e) => setSoyad(e.target.value)}
            className="p-3 rounded-md border-2 border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
          />

          <input
            type="number"
            placeholder="Telefon"
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
            className="p-3 rounded-md border-2 border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
          />
          <button
            type="submit"
            className="bg-amber-300 text-red-800 font-semibold py-3 rounded-md hover:bg-amber-400 transition"
          >
            Göndər
          </button>
        </form>
      </div>
      <div className="flex flex-col items-center gap-4 p-6">
        {loader ? (
          <motion.div
            className="w-16 h-16 border-4 border-amber-300 border-t-transparent rounded-full"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        ) : (
          User.map(({ id, ad, soyad, telefon }, index) => (
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
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Cart;
