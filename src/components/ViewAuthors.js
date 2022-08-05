import { useState, useEffect } from "react";
import { getAllAuthorsService } from "../services/AuthorService";

const ViewAuthors = () => {

    const [allAuthors, setAllAuthors] = useState([]);

    useEffect(
        () => {

        }
        , []);

    const submitGetAllAuthors = (evt) => {
        evt.preventDefault();
        getAllAuthorsService()
            .then((response) => {
                setAllAuthors(response.data);
                console.log(response.data);
                console.log(allAuthors);
            })
            .catch((error) => {
                alert(error);
                setAllAuthors([]);
            });
    }

    return (
        <div style={{backgroundColor:"lightblue",backgroundRepeat:"no-repeat", backgroundSize:"contain"
    }}>
        <div className="container">
            <p className="display-4 text-primary py-3">View All Authors</p>
            <hr />
           </div>
            <div className="bg-alert alert-warning shadow shadow-regular mb-3 mt-3 px-3 py-3 pb-3 pt-3 col-6">
                <p className="lead">Get All Authors</p>
                <div className="form form-group" >
                    <input
                        type="button"
                        className="btn btn-outline-primary form-control mb-3 mt-3"
                        value="Get All Authors"
                        onMouseDown={submitGetAllAuthors}
                    />
                </div>
                <div>
                    <div> {(allAuthors) &&
                        <div>
                            <p className="text-primary text-center font-weight-bold lead">List of All Athors</p>
                            {
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Author Name</th>
                                        </tr>
                                    </thead>
                                    {allAuthors.map((a =>
                                        <tbody>
                                            <tr>
                                                <td>{a.authorName}</td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            }
                        </div>
                    }
                    </div>
                </div>
            </div>
        </div >

    )
}

export default ViewAuthors;
