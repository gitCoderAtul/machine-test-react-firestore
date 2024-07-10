import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import firestoreDb from "../utilis/firebaseConfig";
import { addProduct } from "../redux/reducers/productSlice";
import { useDispatch } from "react-redux";


export default function Productmaster() {
  const [catData, setCatData] = useState();
  const [prodcutData, setProdcutData] = useState();

  const dispatch = useDispatch()

  // validation
  const schema = yup
    .object({
      categoryNames: yup.string().required("Please Select Category Name"),
      productNames: yup.string().required("Please Enter Product Name"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const docRef = await addDoc(collection(firestoreDb, "productmaster"), {
        catergoryName: data.categoryNames,
        productName: data.productNames,
      });
      // setMessage(true);
      dispatch(addProduct(data)); 
      reset();
      fetchProductList();
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.log(e);
    }
  };

  //fetch category
  const fetchCategoryList = async () => {
    const querySnapshot = await getDocs(
      collection(firestoreDb, "catergorymaster")
    );
    //  console.log('querySnapshot',querySnapshot);
    let category = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc);
      // console.log(doc.id);
      // console.log(doc.data());
      console.log(doc.id, "===>", doc.data());
      //  console.log(...doc.data());
      //  category.push({ id: doc.id, ...doc.data() });
      category.push({ id: doc.id, ...doc.data() });
    });
    setCatData(category);
    console.log("category", category);
  };

  //fetch product
  const fetchProductList = async () => {
    const querySnapshot = await getDocs(
      collection(firestoreDb, "productmaster")
    );
    let products = []; 
    querySnapshot.forEach((doc) => {
      // console.log(doc);
      // console.log(doc.id);
      // console.log(doc.data());
      console.log(doc.id, "===>", doc.data());
      //  console.log(...doc.data());
      //  products.push({ id: doc.id, ...doc.data() });
      products.push({ id: doc.id, ...doc.data() });
    });
    setProdcutData(products);
    console.log("product", products); 
  } 

  useEffect(() => {
    fetchCategoryList();
    fetchProductList();
  }, []);

  // delete
const handleDelete = async(e,id)=>{
  console.log('delete', id);
try{
  await deleteDoc(doc(firestoreDb, 'productmaster', id))
  e.target.parentNode.parentNode.remove()
}catch(e) {
  console.error('Error deleting document: ', e);
  // setMessage('Error deleting library');
}


}
  return (
    <div className="container mt-4">
      <div className="row">
        <h4 className="mb-5"> Product Master </h4>

        <div className="col-md-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-3">
              <label for="exampleInputEmail1 " className="mb-1">
                {" "}
                Category Name
              </label>
              <select className="form-control" {...register("categoryNames")}>
                <option> -- select category --</option>
                {catData &&
                  catData.length > 0 &&
                  catData.map((val) => (
                    // console.log(val)
                    <option key={val.id} value={val.catergoryName}>
                      {" "}
                      {val.catergoryName}{" "}
                    </option>
                  ))}
              </select>
              {/* <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Category Name"
            /> */}
              {/* <small id="emailHelp" className="form-text text-muted">
                Please Select Category Name
              </small> */}
            </div>
            <div className="form-group mb-3">
              <label for="exampleInputPassword1" className="mb-1">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                {...register("productNames")}
                placeholder="Enter Product Name"
              />
              <p>{errors.productNames?.message}</p>
            </div>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>
        </div>

        <div className="col-md-8">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Sr No.</th>
                <th scope="col" className="d-none">
                  {" "}
                  Product Id{" "}
                </th>
                <th scope="col">Category Master</th> 
                <th scope="col">Product Master</th>
                <th scope="col"> Action </th>
              </tr>
            </thead>
            <tbody>
              
                {
                  prodcutData && prodcutData.length>0 && prodcutData.map((val,index)=>
                    <tr>
                      <td>{index+1}</td>
                     <td className="d-none">{val.id}</td>
                     <td> {val.catergoryName} </td> 
                     <td> {val.productName}</td>
                     <td>
                  <button className="btn btn-sm btn-primary mx-2">
                    {" "}
                    Edit{" "}
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={(e)=>handleDelete(e,val.id)}> Delete </button>
                </td>
                </tr>
                  )
                }
                {/* <td>1</td>
                <td className="d-none">Cat id</td>
                <td>Cat Master</td>
                <td className="d-none">Pro id</td>
                <td>Pro master</td>
                <td>
                  <button className="btn btn-sm btn-primary mx-2">
                    {" "}
                    Edit{" "}
                  </button>
                  <button className="btn btn-sm btn-danger"> Delete </button>
                </td> */}
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
