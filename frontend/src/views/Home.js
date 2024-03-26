import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../Components/CategoryCard";
import NewsCard from "../Components/NewsCard";
import { getAll } from "../services/news";
import { getAllCategories } from "../services/category";
import Loading from "../Components/Loading";
import NotExists from "../Components/NotExists";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./swiper.css";
// import requiorange modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

const Home = ({ setMessage }) => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState({
    category: true,
    news: true,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await getAllCategories();
        const fetchedNews = await getAll();
        setCategories(fetchedCategories);
        setNews(fetchedNews);
        setIsLoading({ category: false, news: false });
      } catch (error) {
        setMessage({
          message: `${error.response.data.error}`,
          className: "error",
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col ">
      <div
        className="flex flex-col lg:flex-row justify-center -mx-10 -mt-10"
        style={{
          height: "93vh",
          backgroundImage: `url("/assets/hero.jpg")`,
          backgroundSize: "cover",
        }}
      >
        {/* <div className="my-4">
          <img
            className="min-w-sm md:max-w-md rounded-lg transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0"
            src="/assets/random-images/home-img.jpg"
            alt="img"
          />
        </div> */}
        <div className="m-auto p-4 space-x-2">
          <h1 className="mb-4 text-2xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Explore the Heartbeat of
            <span className="text-orange-600 dark:text-primary-400">
              {" "}
              Pyaris{" "}
            </span>
            Olympics
          </h1>
          <p className="text-lg font-normal text-center text-gray-500 lg:text-xl dark:text-gray-200">
            Embrace Unity, Diversity, and Sporting Excellence in Every Moment
          </p>
          <br />
          <Link
            to="#"
            style={{ left: "44.5%" }}
            className="absolute text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
          >
            Explore
          </Link>
        </div>
      </div>
      <div className="mt-6 ">
        <span className="text-wheatt font-bold md:text-2xl lg:text-3xl">
          Gallery
        </span>
        <hr className=" mt-4 h-1" />
        <div className="mySwiper">
          <Swiper
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            grabCursor={true}
            loop={true}
            centeorangeSlides={true}
            slidesPerView={"auto"}
            effect={"coverflow"}
            pagination={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            modules={[Autoplay, EffectCoverflow, Pagination]}
          >
            <SwiperSlide>
              <img src="/assets/slider-images/image1.jpg" alt="Slide 1" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/assets/slider-images/image2.jpg" alt="Slide 2" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/assets/slider-images/image3.jpg" alt="Slide 3" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/assets/slider-images/image4.jpg" alt="Slide 4" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/assets/slider-images/image5.jpg" alt="Slide 5" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/assets/slider-images/image6.jpg" alt="Slide 6" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/assets/slider-images/image7.jpg" alt="Slide 7" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/assets/slider-images/image8.jpeg" alt="Slide 8" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      {/* Videos */}
      <div className="mt-6">
        <span className="text-wheatt font-bold md:text-2xl lg:text-3xl">
          Videos
        </span>
        <hr className=" mt-4 h-1" />

        {isLoading.category ? (
          <Loading />
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-3 mt-8">
            {categories.map((category, index) => {
              if (index < 6)
                return (
                  <CategoryCard
                    key={category.id}
                    details={{
                      linkUrl: `/categories/${category.id}`,
                      imgUrl: category.image,
                      title: category.title,
                      description: category.description,
                      total_videos: category.videos.length,
                    }}
                  />
                );
            })}
          </div>
        ) : (
          <NotExists name="categories" />
        )}
      </div>
      {/* News */}
      <div className="mt-6">
        <span className="text-wheatt font-bold md:text-2xl lg:text-3xl">
          News
        </span>
        <hr className=" mt-4 h-1" />

        {isLoading.news ? (
          <Loading />
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-3 mt-8">
            {news.map((singleNews, index) => {
              if (index < 6)
                return (
                  <NewsCard
                    key={singleNews.id}
                    details={{
                      linkUrl: `/news/${singleNews.id}`,
                      imgUrl: singleNews.image,
                      title: singleNews.title,
                    }}
                  />
                );
            })}
          </div>
        ) : (
          <NotExists name="news" />
        )}
      </div>
    </div>
  );
};

export default Home;
