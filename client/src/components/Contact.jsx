import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchLandlord() {
      try {
        const response = await fetch(`/api/listing/user/${listing.userRef}`);
        const data = await response.json();
        if (!data) {
          console.log(data.message);
        }
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLandlord();
  }, [listing.userRef]);

  function handleMessage(e) {
    setMessage(e.target.value);
  }

  return (
    <div className="flex flex-col gap-2">
      <p>
        Contact <span className="font-semibold">{landlord?.username}</span> for{" "}
        <span className="font-semibold">{listing.name.toLowerCase()}</span>
      </p>
      <textarea
        name="message"
        id="message"
        rows="2"
        placeholder="Enter your message here..."
        value={message}
        className="w-full border p-3 rounded-lg outline-none"
        onChange={handleMessage}
      ></textarea>
      <Link
        to={`mailto:${landlord?.email}?subject=Regarding ${listing.name}&body=${message}`}
        className="bg-slate-700 text-white text-center p-3 rounded-lg uppercase hover:opacity-95 w-56 self-center mt-2"
      >
        Send Message
      </Link>
    </div>
  );
};

export default Contact;
