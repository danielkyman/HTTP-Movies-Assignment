import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const UpdateMovie = props => {
  //   console.log(props.movies);
  const { push } = useHistory();
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const movieToUpdate = props.movies.find(e => `${e.id}` === id);
    if (movieToUpdate) {
      setMovie(movieToUpdate);
    }
  }, [props.movies, id]);

  const changeHandler = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "metascore") {
      value = parseInt(value, 0);
    }
    if (e.target.name === "stars") {
      value = value.split(",");
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
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        props.setMovieList([
          res.data,
          ...props.movies.filter(e => `${e.id}` !== id)
        ]);
        console.log(res.data);
        push("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Update Movie</h1>
      <form className="update-form" onSubmit={handleSubmit}>
        <label htmlFor="title">
          Name: sdfs
          <input
            type="text"
            name="title"
            value={movie.title}
            id="title"
            onChange={changeHandler}
          />
        </label>
        <br />
        <label htmlFor="director">
          Director:{" "}
          <input
            type="text"
            name="director"
            value={movie.director}
            id="director"
            onChange={changeHandler}
          />
        </label>
        <br />
        <label htmlFor="metascore">
          Metascore:{" "}
          <input
            type="text"
            name="metascore"
            value={movie.metascore}
            id="metascore"
            onChange={changeHandler}
          />
        </label>
        <br />
        <label htmlFor="stars">
          Stars:{" "}
          <input
            type="text"
            name="stars"
            value={movie.stars}
            id="stars"
            onChange={changeHandler}
          />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
