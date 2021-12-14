import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../shared/shared-components/loadingSpinner/loadingSpinner";
import "./customers.css";

export default function Customers({setAuth}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await fetch("/api/customers", {
        method: "GET",
        headers: {
          jwt_token: localStorage.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    };
    fetchData();
  }, []);

  if (!data.length) {
    return <LoadingSpinner />;
  } else {
    return (
      <div className="customers">
        <h2>Customers</h2>
        <ul>
          {data.map((customer) => (
            <li key={customer.id}>
              {customer.firstName} {customer.lastName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
