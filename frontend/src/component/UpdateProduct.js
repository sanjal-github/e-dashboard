import React,{useEffect} from "react"
import {useParams,useNavigate } from "react-router-dom";
//import { useNavigate  } from "react-router-dom"

const UpdateProduct = () => {
    const [name,setName] = React.useState('');
    const [price,setPrice] = React.useState('');
    const [category,setCategory] = React.useState('');
    const [company,setCompany] = React.useState('');
    const [error,setError]=React.useState(false);
    const params = useParams();
    let navigate = useNavigate();

  useEffect(()=>
  {
     getProductDetails();

  },[])

  const getProductDetails = async()=>
  {
    console.warn(params);
    let result = await fetch(`http://localhost:4011/product/${params.id}`,{
        headers:{
            authorization:`bearer:${JSON.parse(localStorage.getItem('token'))}`
        }
    });
    result= await result.json();
    console.warn(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);

  }
      const updateProduct= async()=>
      {
          console.warn(!name)
        if(!name || !price || !category || !company)
        {
            setError(true);
            return false ;
        }
        console.warn(name,price,category,company);
        let result = await fetch(`http://localhost:4011/product/${params.id}`,
        {
            
            method:"put",
            body:JSON.stringify({name,price,category,company}),
             headers:{
                'Content-Type':'application/json',
                 //authorization:`bearer:${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log("The Result:")
        console.log(result)
        console.log(result.name)
        if(result)
        {
        navigate("/") 
        }           
        
      }
    return (

        <div className="product">
            <h1>Update Product</h1>
            <input type="text" placeholder="Input Product Name:" className="inputB" value={name}
            onChange={(e)=>setName(e.target.value)}/>
            {error && !name && <span className="invalid-input">Enter Valid Name</span>} 

            <input type="text" placeholder="Input Product Price:" className="inputB" value={price}
            onChange={(e)=>setPrice(e.target.value)} />
            {error && !price && <span className="invalid-input">Enter Valid Price</span>} 


            <input type="text" placeholder="Input Product Category:" className="inputB" value={category}
            onChange={(e)=>setCategory(e.target.value)}/>
            {error && !category && <span className="invalid-input">Enter Valid Category</span>}

            <input type="text" placeholder="Input Product Company:" className="inputB" value={company}
             onChange={(e)=>setCompany(e.target.value)}/>
             {error && !company && <span className="invalid-input">Enter Valid Company</span>} 

            <button onClick={updateProduct}>Update Product</button>
        </div>
    )

}

export default UpdateProduct;

