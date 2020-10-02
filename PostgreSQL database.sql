--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

-- Started on 2020-09-26 00:44:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 16408)
-- Name: director; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.director (
    directorid integer NOT NULL,
    name character varying(50) NOT NULL,
    bio character varying(1000),
    birthyear date,
    deathyear date
);


ALTER TABLE public.director OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16406)
-- Name: director_directorid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.director_directorid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.director_directorid_seq OWNER TO postgres;

--
-- TOC entry 3041 (class 0 OID 0)
-- Dependencies: 202
-- Name: director_directorid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.director_directorid_seq OWNED BY public.director.directorid;


--
-- TOC entry 201 (class 1259 OID 16397)
-- Name: genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genres (
    genreid integer NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(1000)
);


ALTER TABLE public.genres OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16395)
-- Name: genres_genreid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.genres_genreid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.genres_genreid_seq OWNER TO postgres;

--
-- TOC entry 3042 (class 0 OID 0)
-- Dependencies: 200
-- Name: genres_genreid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.genres_genreid_seq OWNED BY public.genres.genreid;


--
-- TOC entry 205 (class 1259 OID 16464)
-- Name: movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movies (
    movieid integer NOT NULL,
    title character varying(50) NOT NULL,
    description character varying(1000),
    directorid integer NOT NULL,
    genreid integer NOT NULL,
    imageurl character varying(300),
    featured boolean
);


ALTER TABLE public.movies OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16462)
-- Name: movies_movieid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movies_movieid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.movies_movieid_seq OWNER TO postgres;

--
-- TOC entry 3043 (class 0 OID 0)
-- Dependencies: 204
-- Name: movies_movieid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movies_movieid_seq OWNED BY public.movies.movieid;


--
-- TOC entry 207 (class 1259 OID 16485)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    birth_date date
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16493)
-- Name: users_movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_movies (
    usermovieid integer NOT NULL,
    userid integer,
    movieid integer
);


ALTER TABLE public.users_movies OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16491)
-- Name: users_movies_usermovieid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_movies_usermovieid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_movies_usermovieid_seq OWNER TO postgres;

--
-- TOC entry 3044 (class 0 OID 0)
-- Dependencies: 208
-- Name: users_movies_usermovieid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_movies_usermovieid_seq OWNED BY public.users_movies.usermovieid;


--
-- TOC entry 206 (class 1259 OID 16483)
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_userid_seq OWNER TO postgres;

--
-- TOC entry 3045 (class 0 OID 0)
-- Dependencies: 206
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- TOC entry 2878 (class 2604 OID 16411)
-- Name: director directorid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.director ALTER COLUMN directorid SET DEFAULT nextval('public.director_directorid_seq'::regclass);


--
-- TOC entry 2877 (class 2604 OID 16400)
-- Name: genres genreid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres ALTER COLUMN genreid SET DEFAULT nextval('public.genres_genreid_seq'::regclass);


--
-- TOC entry 2879 (class 2604 OID 16467)
-- Name: movies movieid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies ALTER COLUMN movieid SET DEFAULT nextval('public.movies_movieid_seq'::regclass);


--
-- TOC entry 2880 (class 2604 OID 16488)
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- TOC entry 2881 (class 2604 OID 16496)
-- Name: users_movies usermovieid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_movies ALTER COLUMN usermovieid SET DEFAULT nextval('public.users_movies_usermovieid_seq'::regclass);


--
-- TOC entry 3029 (class 0 OID 16408)
-- Dependencies: 203
-- Data for Name: director; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.director (directorid, name, bio, birthyear, deathyear) FROM stdin;
4	Jonathan Demme	Robert Jonathan Demme was an American director, producer, and screenwriter.	1944-01-01	2017-01-01
5	Judd Apatow	Judd Apatow is an American producer, writer, director, actor and stand-up comedian.	1967-01-01	\N
6	William Eubank	William Eubank is an American film director, screenwriter, and cinematographer	1982-12-15	\N
7	Kyle Newacheck	Kyle Newacheck  is an American television writer, director, producer and actor	1984-01-23	\N
8	David Frankel	David Frankel is an American film director, screenwriter and producer	1959-04-02	\N
9	Byron P. Howard	Byron P. Howard is an American film director, producer, screenwriter, animator, story artist and occasional voice actor at Walt Disney Animation Studios.	1968-12-26	\N
10	Todd Phillips	Todd Phillips is an American film director, producer, screenwriter, and actor.	1970-12-20	\N
11	Bryan Jay Singer	Bryan Jay Singer is an American director, producer and writer of film and television	1965-09-17	\N
12	Phyllida Lloyd	Phyllida Christian Lloyd, CBE is an English film director and producer, best known for Mamma Mia! and The Iron Lady.	1957-06-17	\N
\.


--
-- TOC entry 3027 (class 0 OID 16397)
-- Dependencies: 201
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genres (genreid, name, description) FROM stdin;
6	Animated	Animation is a method in which pictures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film.
7	Comedy	Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.
1	Thriller	Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience. Tension is created by delaying what the audience sees as inevitable, and is built through situations that are menacing or where escape seems impossible.
8	Drama	In film and television, drama is a category of narrative fiction intended to be more serious than humorous in tone
\.


--
-- TOC entry 3031 (class 0 OID 16464)
-- Dependencies: 205
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movies (movieid, title, description, directorid, genreid, imageurl, featured) FROM stdin;
5	Silence of the Lambs	A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.	4	1	silenceofthelambs.png	t
6	Underwater	Disaster strikes more than six miles below the ocean surface when water crashes through the walls of a drilling station. Led by their captain, the survivors realize that their only hope is to walk across the sea floor to reach the main part of the facility.	6	1	underwater.png	t
7	The Signal 	 A surprise awaits three college students (Brenton Thwaites, Beau Knapp, Olivia Cooke) who think they have tracked a rival computer hacker to a shed in the Nevada desert.	6	1	image.png	t
8	Murder Mystery 	 A New York cop and his wife go on a European vacation to reinvigorate the spark in their marriage. A chance encounter leads to them being framed for the murder of an elderly billionaire.	7	7	image.png	t
9	Devil wears prada 	   Andy (Anne Hathaway) is a recent college graduate with big dreams. Upon landing a job at prestigious Runway magazine, she finds herself the assistant to diabolical editor Miranda Priestly (Meryl Streep).	8	7	image.png	t
10	Marley & Me 	 Newlyweds John and Jenny Grogan (Owen Wilson, Jennifer Aniston) leave behind snowy Michigan and move to Florida, where they buy their first home and find jobs at competing newspapers.	8	7	image.png	t
11	Zootopia 	  From the largest elephant to the smallest shrew, the city of Zootopia is a mammal metropolis where various animals live and thrive. When Judy Hopps (Ginnifer Goodwin) becomes the first rabbit to join the police force, she quickly learns how tough it is to enforce the law.	9	6	image.png	t
12	Joker 	  Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he walks the streets of Gotham City. Arthur wears two masks -- the one he paints for his day job as a clown, and the guise he projects in a futile attempt to feel like he is part of the world around him.	10	8	image.png	t
14	Mama Mia	Donna (Meryl Streep), an independent hotelier in the Greek islands, is preparing for her daughter's wedding with the help of two old friends. Meanwhile Sophie, the spirited bride, has a plan.	12	7	image.png	t
\.


--
-- TOC entry 3033 (class 0 OID 16485)
-- Dependencies: 207
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (userid, username, password, email, birth_date) FROM stdin;
2	Jake Viewer	4567	jv@gmail.com	1986-02-02
3	Mary Viewer	8976	mv@gmail.com	2000-03-03
1	Amanda Viewer	1234	amanda@gmail.com	1987-01-01
\.


--
-- TOC entry 3035 (class 0 OID 16493)
-- Dependencies: 209
-- Data for Name: users_movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_movies (usermovieid, userid, movieid) FROM stdin;
1	1	14
2	2	12
3	3	11
\.


--
-- TOC entry 3046 (class 0 OID 0)
-- Dependencies: 202
-- Name: director_directorid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.director_directorid_seq', 12, true);


--
-- TOC entry 3047 (class 0 OID 0)
-- Dependencies: 200
-- Name: genres_genreid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genres_genreid_seq', 8, true);


--
-- TOC entry 3048 (class 0 OID 0)
-- Dependencies: 204
-- Name: movies_movieid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movies_movieid_seq', 14, true);


--
-- TOC entry 3049 (class 0 OID 0)
-- Dependencies: 208
-- Name: users_movies_usermovieid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_movies_usermovieid_seq', 3, true);


--
-- TOC entry 3050 (class 0 OID 0)
-- Dependencies: 206
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_userid_seq', 3, true);


--
-- TOC entry 2885 (class 2606 OID 16416)
-- Name: director director_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.director
    ADD CONSTRAINT director_pkey PRIMARY KEY (directorid);


--
-- TOC entry 2883 (class 2606 OID 16405)
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (genreid);


--
-- TOC entry 2887 (class 2606 OID 16472)
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (movieid);


--
-- TOC entry 2891 (class 2606 OID 16498)
-- Name: users_movies users_movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_movies
    ADD CONSTRAINT users_movies_pkey PRIMARY KEY (usermovieid);


--
-- TOC entry 2889 (class 2606 OID 16490)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- TOC entry 2893 (class 2606 OID 16478)
-- Name: movies directorkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT directorkey FOREIGN KEY (directorid) REFERENCES public.director(directorid);


--
-- TOC entry 2892 (class 2606 OID 16473)
-- Name: movies genrekey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT genrekey FOREIGN KEY (genreid) REFERENCES public.genres(genreid);


--
-- TOC entry 2895 (class 2606 OID 16504)
-- Name: users_movies moviekey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_movies
    ADD CONSTRAINT moviekey FOREIGN KEY (movieid) REFERENCES public.movies(movieid);


--
-- TOC entry 2894 (class 2606 OID 16499)
-- Name: users_movies userkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_movies
    ADD CONSTRAINT userkey FOREIGN KEY (userid) REFERENCES public.users(userid);


-- Completed on 2020-09-26 00:44:53

--
-- PostgreSQL database dump complete
--

