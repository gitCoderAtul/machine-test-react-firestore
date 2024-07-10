import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import firestoreDb from "../utilis/firebaseConfig";

export default function Productlist() {
  const [prodcutData, setProdcutData] = useState([]);

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
const [dataToDisplay, setDataToDisplay] = useState([]);
const TOTAL_VALUES_PER_PAGE = 10;

  //fetch product
  const fetchProductList = async () => {
    const querySnapshot = await getDocs(
      collection(firestoreDb, "productmaster")
    );
    let prodcutData = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc);
      // console.log(doc.id);
      // console.log(doc.data());
      console.log(doc.id, "===>", doc.data());
      //  console.log(...doc.data());
      //  products.push({ id: doc.id, ...doc.data() });
      prodcutData.push({ id: doc.id, ...doc.data() });
    });
    setProdcutData(prodcutData);
    setDataToDisplay(prodcutData.slice(0, TOTAL_VALUES_PER_PAGE));
    console.log("product", prodcutData);
  };

  const goOnPrevPage = () => {
    if (currentPageNumber === 1) return;
    setCurrentPageNumber((prev) => prev - 1);
  };
  const goOnNextPage = () => {
    if (currentPageNumber === prodcutData.length / TOTAL_VALUES_PER_PAGE) return;
    setCurrentPageNumber((prev) => prev + 1);
  };

  useEffect(() => {
    const start = (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
    const end = currentPageNumber * TOTAL_VALUES_PER_PAGE;
    console.log("product----->", prodcutData);
     setDataToDisplay(prodcutData.slice(start, end));
  }, [currentPageNumber]);

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <h4 className="mb-5"> Products List </h4>

        <div className="col-md-8">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Sr No.</th>
                <th scope="col"> Product Id </th>
                <th scope="col">Product Master</th>
                {/* <th scope="col"> Category Id </th> */}
                <th scope="col">Category Master</th>
                <th scope="col"> Action </th>
              </tr>
            </thead>
            <tbody>
              {dataToDisplay &&
                dataToDisplay.length > 0 &&
                dataToDisplay.map((obj, index) => (
                    // console.log(obj)
                    <tr key={obj.id}>
                      <td>{index + 1}</td>
                      <td>{obj.id}</td>
                      <td>{obj.productName}</td>
                      <td>{obj.catergoryName}</td>
                      <td>
                        <button className="btn btn-sm btn-primary mx-2">
                          {" "}
                          Edit{" "}
                        </button>
                        <button className="btn btn-sm btn-danger">
                          {" "}
                          Delete{" "}
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>


          <nav aria-label="...">
            <ul className="pagination">
              <li className="page-item">
                <button onClick={goOnPrevPage} className="btn btn-sm btn-outline-dark">Prev</button> 
              </li> 
              <li className="page-item mx-2">
                <button onClick={goOnNextPage} className="btn btn-sm btn-outline-primary">Next</button> 
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
