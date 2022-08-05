import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Book from "../models/Book";
import Category from "../models/Category";
import { fetchCategoryByName } from "../redux/CategorySlice";
import { getCategoryByIdService, getCategoryByNameService, getAllCategoryService, addCategoryService } from "../services/CategoryService";
import {getAllBooksService} from "../services/BookService";



const CategoryData = () => {

    const [name ,setName] = useState('');
    const [category, setCategory] = useState(new Category());
    const [categoryToBeAdded, setCategoryToBeAdded] = useState(new Category());
    const [book, setBook] = useState(new Book());
    const [allCategory, setAllCategory] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
   
    // fetch data from store
    const categoryDataFromStore = useSelector((store) => { return store.category.categoryObj; });
    // send data to store - steps - 1, 2
    // step 1
    const dispatch = useDispatch();

    useEffect(
        () => {

        }
        , []);

    const handleChange = (evt) => {
        console.log(evt.target.name);
        console.log(evt.target.value);
        setName(evt.target.value);
    }

    const handleAddCategory = (c) => {
        console.log(c.target.name);
        console.log(c.target.value);
        setCategoryToBeAdded({
            ...categoryToBeAdded,
            [c.target.name]: c.target.value
        });

        setBook({
            ...book,
            [c.target.name]: c.target.value
        });
    }
   
    const submitGetCategoryByName = (evt) => {
        console.log(name);
        evt.preventDefault();
        getCategoryByNameService(name)
            .then((response) => {
                console.log(response.data);
                setCategory(response.data);
                dispatch(fetchCategoryByName(response.data)); // step 2
                setName('');
            })
            .catch((error) => {
                alert(error);
                setCategory(new Category());
                setName('');
            })
    }
   
    const submitGetAllCategory = (evt) => {
        evt.preventDefault();
        getAllCategoryService()
            .then((response) => {
                setAllCategory(response.data);
                console.log(response.data);
                console.log(allCategory);
            })
            .catch((error) => {
                alert(error);
                setAllCategory([]);
            });
    }
   
    const submitGetAllBooks= (evt) => {
        evt.preventDefault();
        getAllBooksService()
            .then((response) => {
                setAllBooks(response.data);
                console.log(response.data);
                console.log(allBooks);
            })
            .catch((error) => {
                alert(error);
                setAllBooks([]);
            });
    }
   
    const submitAddCategory = (evt) => {
        evt.preventDefault();
        let categoryTemp = { ...categoryToBeAdded, book };
        addCategoryService(categoryTemp)
            .then((response) => {
                console.log(response.data);
                alert(`Category with author name ${response.data.authorName} with authorId ${response.data.categoryId} added successfully.`);
            })
            .catch(() => {
                setCategoryToBeAdded(new Category());
                categoryTemp = '';
                alert("Category could not be added.");
            });
    }
   
    return (
        <div style={{backgroundColor:"lightblue",backgroundRepeat:"no-repeat", backgroundSize:"contain"
    }}>
        <div className="container">
            <p className="display-4 text-primary py-3">CategoryData</p>
            <hr />
           
            <div className="bg-alert alert-success shadow shadow-regular mb-3 mt-3 px-3 py-3 pb-3 pt-3 col-6">
                <p className="lead">Find an Category</p>
                <div>
                    <form className="form form-group">
                        <input
                            type="text"
                            className="form-control mb-3 mt-3"
                            id="categoryName"
                            value={name}
                            placeholder="Enter Category name"
                            onChange={handleChange}
                            autoFocus />
                        <input type="submit" className="form-control mb-3 mt-3 btn btn-outline-primary" value="Get Category" onClick={submitGetCategoryByName} />
                    </form>
                </div>
                <div> {(category.categoryName) &&
                    <div>
                        <p className="lead text-primary">Category Details from State Object</p>
                        <p>Category Id: {category.categoryId} </p>
                        <p>Category Name: {category.categoryName} </p>
                        <table className="table">
                                    <thead>
                                        <tr>
                                            <th>BookId</th>
                                            <th>BookName</th>
                                            <th>Price</th>
                                            <th>AuthorId</th>
                                            <th>AuthorName</th>
                                            <th>Rating</th>
                                        </tr>
                                    </thead>
                        {category.books.map((b => <tbody>
                        <tr>
                        <td>{b.bookId}</td>
                        <td>{b.bookName}</td>
                        <td>{b.price}</td>
                        <td>{b.author.authorId}</td>
                        <td>{b.author.authorName}</td>
                        <td>{b.rating}</td>
                        </tr>
                        </tbody>
                         ))}
                       </table> 
                    </div>
                }
                </div>
                <div> {(categoryDataFromStore.categoryName) &&
                    <div>
                        <p className="lead text-primary">Category Details from Store</p>
                        <p>Author Id: {categoryDataFromStore.categoryId} </p>
                        <p>Author Name: {categoryDataFromStore.categoryName} </p>
                     
                       <p>{(categoryDataFromStore.books && categoryDataFromStore.books.bookId)}</p>
                       <p>{(categoryDataFromStore.books && categoryDataFromStore.books.bookName)}</p>
                       <p>{(categoryDataFromStore.books && categoryDataFromStore.books.price)}</p>
                       <p>{(categoryDataFromStore.books && categoryDataFromStore.books.authorId)}</p>
                       <p>{(categoryDataFromStore.books && categoryDataFromStore.books.authorName)}</p>
                       <p>{(categoryDataFromStore.books && categoryDataFromStore.books.rating)}</p>
                       
                    </div>
                }
                </div>
            </div>
           
        </div >
        </div>
    );
}

export default CategoryData;

