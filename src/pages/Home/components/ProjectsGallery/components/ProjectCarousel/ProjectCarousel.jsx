const BASE_IMAGE_PATH = "/src/assets/img/";

export const ProjectCarousel = ({ 
  images, 
  isOpen, 
  carouselId = "carouselProjects",
  activeSlide,
  onNext,
  onPrev
}) => {
  const handleNext = () => {
    const carouselElement = document.getElementById(carouselId);
    if (carouselElement && window.bootstrap) {
      const carousel = window.bootstrap.Carousel.getInstance(carouselElement);
      if (carousel) {
        carousel.next();
      }
    }
    if (onNext) onNext();
  };

  const handlePrev = () => {
    const carouselElement = document.getElementById(carouselId);
    if (carouselElement && window.bootstrap) {
      const carousel = window.bootstrap.Carousel.getInstance(carouselElement);
      if (carousel) {
        carousel.prev();
      }
    }
    if (onPrev) onPrev();
  };

  return (
    <div
      id={carouselId}
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="3000"
      data-bs-pause="hover"
      data-bs-wrap="true"
    >
      <div className="carousel-inner">
        {images.map((imgSrc, index) => (
          <div
            key={index}
            className={`carousel-item ${
              index === activeSlide ? "active" : ""
            }`}
          >
            <img
              src={`${BASE_IMAGE_PATH}${imgSrc}`}
              className="d-block w-100"
              style={{ aspectRatio: "16/8" }}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        onClick={handlePrev}
        data-bs-target={`#${carouselId}`}
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={handleNext}
        data-bs-target={`#${carouselId}`}
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};