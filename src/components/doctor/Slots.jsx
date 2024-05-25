
import  { useEffect, useRef, useState } from "react";
import { getSlots } from "../../api/doctorApi";
import { jwtDecode } from "jwt-decode";
import { Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";

const Slots = () => {
  const [slot, setSlot] = useState([]);
  const [page, setPage] = useState(1);
  const [docId, setdocId] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 8;
  const containerRef = useRef(null);

  const getSlot = async (id, pageNumber) => {
    try {
      const result = await getSlots(id, pageNumber, pageSize);
      if (result?.data?.slot) {
        const slots = result?.data?.slot.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setSlot((prev) => [...prev, ...slots]);

        if (slots.length < pageSize) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("doctortoken");
    if (token) {
      const decode = jwtDecode(token);
      if (decode.role === "doctor") {
        setdocId(decode.id);
      }
    }
  }, []);

  useEffect(() => {
    if (docId && page >= 1) {
      getSlot(docId, page);
    }
  }, [docId, page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = containerRef.current.scrollHeight;
      const scrollTop = containerRef.current.scrollTop;
      const clientHeight = containerRef.current.clientHeight;

      if (scrollHeight - scrollTop - clientHeight < 100 && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const containerElement = containerRef.current;
    containerElement.addEventListener("scroll", handleScroll);

    return () => {
      containerElement.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore]);

  return (
    <div
      className=" shadow-sm shadow-black "
      id="parentScrollDiv"
      ref={containerRef}
      style={{ height: "500px", overflowY: "auto" }}
    >
      <div className="w-full grid grid-cols-4 gap-6 rounded 
      bg-gradient-to-r from-lime-200 via-lime-50 to-lime-200 p-10">
        {slot.length > 0 ? (
          slot.map((singleSlot, index) => (
            <Card
              key={`slot-${index}`}
              className="mt-6 bg-gradient-to-r from-lime-300 via-lime-100 to-lime-300 shadow-md shadow-black"
            >
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  Created Slots
                </Typography>
                <Typography>
                  <p className="flex">
                    Date:{" "}
                    <span>{new Date(singleSlot.date).toLocaleDateString()}</span>
                  </p>
                  <p className="flex">
                    Shift: <span>{singleSlot.shift}</span>
                  </p>
                  <p className="flex">
                    Available token: <span>{singleSlot.count}</span>
                  </p>
                </Typography>
              </CardBody>
              <CardFooter className="pt-0"></CardFooter>
            </Card>
          ))
        ) : (
          <span>
            <h1>No Slots created</h1>
          </span>
        )}
      </div>
      {!hasMore && <p className="text-center">No more bookings to load.</p>}
    </div>
  );
};

export default Slots;

