import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const productsPerPage = 8; 
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://intern-task-api.bravo68web.workers.dev/api/products",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [user?.token]);

  if (!user) {
    return null;
  }

  const handleSearch = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value) {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredProducts);
    } else {
      setSearchResults(products); 
    }
    setCurrentPage(1); 
  };

  const displayedProducts = input ? searchResults : products;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = displayedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(displayedProducts.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto py-10 px-20">
      <div className="flex flex-col gap-10">
        <h1 className="font-bold text-md sm:text-xl md:text-2xl text-center">
          Logged in as <span className="text-blue-500">{user.email}</span>
        </h1>
        <input
          className="border-indigo-400 p-3 rounded-lg border-2 outline-none w-full"
          placeholder="Search..."
          value={input}
          onChange={handleSearch}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-7">
          {currentProducts.map((product, i) => (
            <div
              key={i}
              className="relative shadow-sm hover:shadow-md border-2 border-indigo-400 p-5 rounded-2xl flex flex-col items-center"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                />
                <span className="absolute bottom-5 -right-10 bg-indigo-800 text-white py-2 px-20 rotate-[-30deg] ">
                  ${product.price}
                </span>
              </div>
              <h3 className="font-bold mt-5 text-center">
                {product.title}
              </h3>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300' : 'bg-indigo-500 hover:bg-indigo-600'} text-white`}
          >
            Prev
          </button>
          <span className="text-xl">{currentPage} / {totalPages}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300' : 'bg-indigo-500 hover:bg-indigo-600'} text-white`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
