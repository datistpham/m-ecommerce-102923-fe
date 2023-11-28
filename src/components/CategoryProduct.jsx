import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import categoriesApi from "../api/categoryApi";
import productsApi from "../api/productsApi";
import Product from "./Product";
const CategoryProduct = () => {
  const [selectedCategory, setSeletedCategory] = useState();
  const [listProductByCategory, setListProductByCategory] = useState([]);
  const [productShow, setProductShow] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const handleMinPriceChange = (event) => {
    const newMinPrice = parseInt(event.target.value);
    setProductShow(listProductByCategory.filter(item => item.price <= maxPrice && item.price >= newMinPrice))

    setMinPrice(newMinPrice);

    // Kiểm tra nếu minPrice lớn hơn maxPrice thì điều chỉnh maxPrice
    if (newMinPrice > maxPrice) {
      setMaxPrice(newMinPrice);
    }
  };

  const handleMaxPriceChange = (event) => {
    const newMaxPrice = parseInt(event.target.value);
    setProductShow(listProductByCategory.filter(item => item.price <= newMaxPrice && item.price >= minPrice))
    setMaxPrice(newMaxPrice);

    // Kiểm tra nếu maxPrice nhỏ hơn minPrice thì điều chỉnh minPrice
    if (newMaxPrice < minPrice) {
      setMinPrice(newMaxPrice);
    }
  };
  useEffect(() => {
    (async () => {
      if (selectedCategory) {
        const result = await productsApi.getProductByCategory(selectedCategory);
        const uniqueBrands = Array.from(
          new Set(result.products.map((product) => product.brand))
        );
        setListProductByCategory(result.products);
        // Khởi tạo giá trị min và max ban đầu
        let localMinPrice = Number.MAX_SAFE_INTEGER;
        let localMaxPrice = Number.MIN_SAFE_INTEGER;

        // Duyệt qua mảng để tìm giá trị min và max
        result.products.forEach((product) => {
          const productPrice = product.price;

          // Tìm giá trị tối thiểu
          localMinPrice = Math.min(localMinPrice, productPrice);

          // Tìm giá trị tối đa
          localMaxPrice = Math.max(localMaxPrice, productPrice);
        });
        setMinPrice(localMinPrice);
        setMaxPrice(localMaxPrice);
        setListBrand(uniqueBrands);
      }
    })();
  }, [selectedCategory]);

  const filterProductByBrand = (brand) => {
    const filterProduct = listProductByCategory.filter(
      (item) => item.brand === brand
    );
    setProductShow(filterProduct);
    return filterProduct;
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="filter-container">
        <label htmlFor="minMaxPriceRange">Lọc theo giá:</label>
        <div className="range-container">
          <input
            type="range"
            id="minMaxPriceRange"
            min="0"
            max="50000000"
            step="1000000"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <input
            type="range"
            id="maxPriceRange"
            min="0"
            max="50000000"
            step="1000000"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
          <div className="range-values">
            <span>Min: {minPrice} VND</span>
            <span>Max: {maxPrice} VND</span>
          </div>
        </div>
      </div>
      <CategoryFilter
        setSelect={setSeletedCategory}
        select={selectedCategory}
      />
      {listBrand && (
        <>
          <h4 style={{ marginTop: 12, marginBottom: 12 }}>Hãng sản xuất</h4>
          <div>
            {listBrand.map((item, key) => (
              <Button
                key={key}
                variant="outline-secondary"
                onClick={() => filterProductByBrand(item)}
                // onClick={() => filterHandler(category)}
              >
                {item}
              </Button>
            ))}
          </div>
          <Row>
            {productShow.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default CategoryProduct;

function CategoryFilter(props) {
  const { setSelect, select } = props;
  const navigate = useNavigate();
  const [listCategory, setListCategory] = useState([]);
  const getListCategory = async () => {
    const result = await categoriesApi.getListCategories(8);
    console.log(result);
    setListCategory(result.categories);
  };
  useEffect(() => {
    getListCategory();
  }, []);

  const filterHandler = (category) => {
    setSelect(category._id);
    if (category === "all") {
      navigate("/");
      return;
    }
    // navigate("/?category=" + category.name);
  };

  return (
    <>
      {listCategory.map((category, key) => (
        <Button
          key={key}
          variant="outline-secondary"
          onClick={() => filterHandler(category)}
        >
          {category?.name}
        </Button>
      ))}
    </>
  );
}
