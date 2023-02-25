# Movie Application.

## CURRENLTY RUNNING AT

---

- https://lustrous-cranachan-916112.netlify.app/

### How to Run

---

- Clone this repo

- run this in terminal

```
cd ./movie-application
npm install
```

- create a file ".env" inside movie-application folder.

```
touch ./movie-application/.env
```

- Add your api key into ".env" file like this

```
REACT_APP_API_KEY="<<YOUR_KEY>>"
```

- Now Run

```
npm start
```

- DONE

### Application Features

---

- Views Popular Movies in main homepage.
- Users can search for Movies in search box.
- Users can view detail by clicking their card or by clicking play button in banner.
- Main page slider contains 10 current popular Movies.
- Users can filter the movie in search box with 'genre', 'year' and 'order'.
- Video Player plays a same video for all the movies.

### Application Technical Highlights

---

- Custom Carousel.
- Custom Video Player Controls.
- Used custom hook(useDimensions.js), promise api (Promise.all), useRef, useContext.
