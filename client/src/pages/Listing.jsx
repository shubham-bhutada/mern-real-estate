import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/common/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchListing() {
      try {
        setLoading(true);
        const response = await fetch(`/api/listing/${listingId}`);
        const data = await response.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          console.log(data.message);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }

    fetchListing();
  }, [listingId]);

  return (
    <main>
      {loading && <Loader />}
      {error && (
        <div className="flex flex-col gap-3 mt-7">
          <p className="text-2xl text-center text-slate-700">
            Something went wrong!
          </p>
          <button
            onClick={() => navigate("/")}
            className="border bg-blue-400 w-fit self-center p-3 rounded-lg"
          >
            Go back home
          </button>
        </div>
      )}
      {listing && !error && !loading && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </main>
  );
};

export default Listing;
