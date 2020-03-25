import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory, useParams } from "react-router-dom";
import axios from "axios";

const UpdateMovie = props => {
  //   console.log(props.movies);
  const { push } = useHistory();
  const match = useRouteMatch();
  const { id } = useParams();
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: []
  });

  useEffect(() => {
    let movieToUpdate = props.movies.find(e => `${e.id}` === id);

    if (movieToUpdate) {
      setMovie(movieToUpdate);
    }
  }, [props.movies, id]);

  const changeHandler = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }
    setMovie({
      ...movie,
      [e.target.name]: value
    });
  };

  const handleSubmit = e => {
    console.log(id);
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, {
        title: movie.title,
        director: movie.director,
        metascore: movie.metascore,
        stars: movie.stars
      })
      .then(res => {
        props.setMovieList(res.data);
        console.log(res.data);
        push("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Update Movie</h1>
      <form className="update-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={changeHandler}
          value={movie.title}
        />
        <br />
        <input
          type="text"
          name="director"
          placeholder="Director"
          onChange={changeHandler}
          value={movie.director}
        />
        <br />
        {/* <input
          type="text"
          name="metascore"
          placeholder="Metascore"
          onChange={changeHandler}
          value={movie.metascore}
        />
        <br />
        <input
          type="text"
          name="stars"
          placeholder="Stars"
          onChange={changeHandler}
          value={movie.stars}
        /> */}
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
