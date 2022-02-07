import "./App.css";
import React, { useState, useEffect, Fragment, useCallback } from "react";
import { useNavigate, Route, Routes, Link } from "react-router-dom";
import { useQuery } from "react-query";
import Navbar from "./components/NavBar/Navbar";
import Search from "./components/search/Search";
import Movies from "./components/Movies/Movies";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/Login";
import Signup from "./components/Signup/Signup";
import { loginContext } from "./components/contexts/loginContext";
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import CssLoader from "./components/CssLoader/CssLoader";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Footer from "./components/Footer/Footer";
import Popular from "./components/Movies/Popular/Popular";

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [username, setUsername] = useState(null);
  const [auth, setAuth] = useState(null);
  const [id, setId] = useState(null);

  const filterMovies = (searchKey) => {
    let tempMovies = movies.filter((movie) => {
      return movie.title.toLowerCase().includes(searchKey.toLowerCase());
    });
    setFilteredMovies(tempMovies);
  };

  const navigate = useNavigate();

  // useEffect(() => {
  //   let token = localStorage.getItem("accesstoken");
  //   if (!token) {
  //     setAuth(false);
  //     navigate("/login");
  //   } else {
  //     // const foundUser = JSON.parse(token)
  //     setAuth(true);
  //     navigate("/");
  //   }
  //   // if(token){
  //   //   setAuth(true)
  //   // }
  // }, []);

  const { error, isSuccess, isLoading } = useQuery(
    "fetchingMovieData",
    async () => {
      //for movies
      const res1 = await fetch(
        `${process.env.REACT_APP_API_KEY_DISCOVER_MOVIES}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
      );
      const data1 = await res1.json();
      console.log(data1);
      setMovies(data1.results);
      setFilteredMovies(data1.results);

      // for popular movies
      const res2 = await fetch(
        `${process.env.REACT_APP_API_URL}popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );
      const data2 = await res2.json();
      console.log(data2);
      setPopular(data2.results);

      //for top rated movies
      const res3 = await fetch(
        `${process.env.REACT_APP_API_URL}top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );
      const data3 = await res3.json();
      console.log(data3);
      setTopRated(data3.results);

      // for upcoming movies
      const res4 = await fetch(
        `${process.env.REACT_APP_API_URL}now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );
      const data4 = await res4.json();
      console.log(data4);
      setNowPlaying(data4.results);

      //for upcoming movies
      const res5 = await fetch(
        `${process.env.REACT_APP_API_URL}upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );
      const data5 = await res5.json();
      console.log(data5);
      setUpComing(data5.results);
    }
  );

  console.log(isSuccess);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      // width:1000,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  if (isLoading) return <CssLoader />;

  if (error) return error.message;

  const styles  = {
    margin:'100px 20px',
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    gap:'10px'
    // gridTemplateRows:'repeat(4,1fr)',
    // maxWidth:'100%',
    // gap:"10px"
  }

  return (
    <div>
      <loginContext.Provider
        value={{ username, setUsername, auth, setAuth, id, setId }}
      >
        <Navbar auth={auth} setAuth={setAuth} username={username} />
        <Routes>
          {/* <Route element={<ProtectedRoutes auth={auth} />}> */}
          <Route
            exact
            path="/"
            element={
              <Fragment>
                <Search filterMovies={filterMovies} />
                {/* for popular movies */}
                <div className="popularDiv">
                  <div className="popular">
                    <h2>Popular Movies</h2>
                    <Link to="/popular" className="link">
                      View More
                    </Link>
                  </div>
                  <hr className="hr" />
                  <div className="popularMovies">
                    <Carousel responsive={responsive}>
                      {popular.slice(0, 10).map((movie) => {
                        return (
                          <Movies
                            imagePath={movie["backdrop_path"]}
                            key={movie.id}
                          />
                        );
                      })}
                    </Carousel>
                  </div>
                </div>

                {/* top rated movies */}
                <div className="popularDiv">
                  <div className="popular">
                    <h2>Top Rated Movies</h2>
                    <Link to="/topRated" className="link">
                      View More
                    </Link>
                  </div>
                  <hr className="hr" />
                  <div className="popularMovies">
                    <Carousel responsive={responsive}>
                      {topRated.slice(0, 10).map((movie) => {
                        return (
                          <Movies
                            imagePath={movie["backdrop_path"]}
                            key={movie.id}
                          />
                        );
                      })}
                    </Carousel>
                  </div>
                </div>

                {/* for now playing movies */}
                <div className="popularDiv">
                  <div className="popular">
                    <h2>Now playing Movies</h2>
                    <Link to="/nowPlaying" className="link">
                      View More
                    </Link>
                  </div>
                  <hr className="hr" />
                  <div className="popularMovies">
                    <Carousel responsive={responsive}>
                      {nowPlaying.slice(0, 10).map((movie) => {
                        return (
                          <Movies
                            imagePath={movie["backdrop_path"]}
                            key={movie.id}
                          />
                        );
                      })}
                    </Carousel>
                  </div>
                </div>

                {/* for upcoming movies */}
                <div className="popularDiv">
                  <div className="popular">
                    <h2>Upcoming Movies</h2>
                    <Link to="/upcoming" className="link">
                      View More
                    </Link>
                  </div>
                  <hr className="hr" />
                  <div className="popularMovies">
                    <Carousel responsive={responsive}>
                      {upComing.slice(0, 10).map((movie) => {
                        return (
                          <Movies
                            imagePath={movie["backdrop_path"]}
                            key={movie.id}
                          />
                        );
                      })}
                    </Carousel>
                  </div>
                </div>
              </Fragment>
            }
          ></Route>
          <Route exact path="/:id" element={<MovieDetails />}></Route>
          <Route
            exact
            path="/popular"
            element={popular.map((movie) => {
              return (
                <div>
                  <Movies
                    imagePath={movie["backdrop_path"]}
                    key={movie.id}
                    title={movie.title}
                    overview={movie.overview}
                  />
                </div>
              );
            })}
          ></Route>
          <Route
            exact
            path="/topRated"
            element={topRated.map((movie) => {
              return (
                <Movies
                  imagePath={movie["backdrop_path"]}
                  key={movie.id}
                  title={movie.title}
                  overview={movie.overview}
                />
              );
            })}
          ></Route>
          <Route
            exact
            path="/upcoming"
            element={upComing.map((movie) => {
              return (
                <Movies
                  imagePath={movie["backdrop_path"]}
                  key={movie.id}
                  title={movie.title}
                  overview={movie.overview}
                />
              );
            })}
          ></Route>
          <Route
            exact
            path="/nowPlaying"
            element={nowPlaying.map((movie) => {
              return (
                <Movies
                  imagePath={movie["backdrop_path"]}
                  key={movie.id}
                  title={movie.title}
                  overview={movie.overview}
                />
              );
            })}
          ></Route>
          {/* </Route> */}

          <>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
          </>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </loginContext.Provider>
    </div>
  );
}

export default App;
