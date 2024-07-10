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
import { useDispatch } from "react-redux";
import { addCategory, deleteCategory } from "../redux/reducers/categorySlice";

export default function Categorymaster() {
  //state
  const [message, setMessage] = useState(false);
  const [catData, setCatData] = useState();
  const dispatch = useDispatch();

  // validation
  const schema = yup
    .object({
      categoryNames: yup.string().required("Please Enter Category Name"),
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

  // submit
  const onSubmit = async (data) => {
    console.log(data);

    try {
      const docRef = await addDoc(collection(firestoreDb, "catergorymaster"), {
        catergoryName: data.categoryNames,
      });
      dispatch(addCategory(data));
      setTimeout(() => {
        setMessage(false);
      }, 4000);
      setMessage(true);
      reset();
      fetchCategoryList();
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

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

const handleDelete = async (e,id)=>{
  console.log(id);
  try {
    await deleteDoc(doc(firestoreDb, 'catergorymaster', id));
    // console.log(e.target.parentNode.parentNode.remove());
    e.target.parentNode.parentNode.remove()
    // dispatch(deleteCategory(id))
    console.log('Category successfully deleted!');
    setMessage('Category Deleted');

} catch (e) {
    console.error('Error deleting document: ', e);
    // setMessage('Error deleting library');
}
}

  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <h4 className="mb-5"> Category Master </h4>

        <div className="col-md-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-3">
              <label for="exampleInputEmail1 " className="mb-1">
                Category Name
              </label>
              <input
                type="text"
                className="form-control"
                {...register("categoryNames")}
                placeholder="Enter Category Name"
              />
              <p>{errors.categoryNames?.message}</p>
              {/* <small id="emailHelp" className="form-text text-muted">
                Please Enter Category Name
              </small> */}
            </div>
            {/* <div className="form-group mb-3">
            <label for="exampleInputPassword1" className="mb-1">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
            <small id="emailHelp" className="form-text text-muted">
              Please Enter Product Name
            </small>
          </div> */}
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>
          {message && (
            <div
              class="alert alert-success py-2 px-5"
              style={{ position: "fixed", top: "60px", right: "50px" }}
              role="alert"
            >
              Category Name Added
            </div>
          )}
        </div>

        <div className="col-md-6">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Sr No.</th>
                <th scope="col" className="d-none"> Category Id </th>
                <th scope="col">Category Master</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {catData &&
                catData.length > 0 &&
                catData.map((value, index) =>  
                  <tr key={value.id}>
                    <td>{index +1}</td>
                    <td className="d-none">{value.id}</td>
                    <td>{value.catergoryName}</td>
                    <td>
                      <button className="btn btn-sm btn-primary mx-2">
                        {" "}
                        Edit{" "}
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={(e)=>handleDelete(e,value.id)}>
                        {" "}
                        Delete{" "}
                      </button>
                    </td>
                  </tr> 
                 
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
