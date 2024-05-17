import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const ListingCard = ({ listing }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden rounded-lg min-w-[300px] max-w-[300px] sm:min-h-[400px] sm:max-h-[400px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[180px] sm:max-h-[200px] sm:min-h-[200px] min-w-80 max-w-80 object-cover hover:scale-105 transition-scale duration-300 "
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="font-semibold text-lg text-slate-700 truncate">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="text-green-700 h-4 w-4" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-700 line-clamp-2">
            {listing.description}
          </p>
          <p className="font-semibold text-slate-600 mt-2">
            ₹{" "}
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-IN")
              : listing.regularPrice.toLocaleString("en-IN")}
              {listing.type === 'rent' ? '/ month' : '/-'}
          </p>
          <div className="text-slate-700 flex gap-3">
            <div className="font-bold text-xs">
                {listing.bedrooms > 1? `${listing.bedrooms} beds` : `${listing.bedrooms} bed` }
            </div>
            <div className="font-bold text-xs">
                {listing.bathrooms > 1? `${listing.bathrooms} baths` : `${listing.bathrooms} bath` }
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
