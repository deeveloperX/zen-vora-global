import { useEffect, useState } from "react";
import { getServices } from "../api/services";

export default function useServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getServices()
      .then((items) => {
        if (active) setServices(items);
      })
      .catch((requestError) => {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Could not load services.",
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { services, loading, error };
}
