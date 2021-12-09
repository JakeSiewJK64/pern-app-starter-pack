import React, { useEffect, useState } from 'react';
import './customers.css';

export default function Customers() {

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await fetch('/api/customers')
                .then(res => res.json())
                .then(data => {
                    setData(data);
                });
        };
        fetchData();
    }, []);

    if (!data.length) {
        return (<p>loading...</p>)
    } else {
        return (
            <div className="customers">
                <h2>Customers</h2>
                <ul>
                    {
                        data.map(customer => <li key={customer.id}>{customer.firstName} {customer.lastName}</li>)
                    }
                </ul>
            </div>
        )
    };
}