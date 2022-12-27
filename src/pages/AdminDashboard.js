import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function AdminDashboard() {
  const [customerArr, setCustomerArr] = useState([]);
  const [orderArr, setOrderArr] = useState([]);

  const checkoutData = useSelector((state) => state.checkout);
  const { phone } = useSelector((state) => state.login);

  return (
    <>
      <div className="max-w-container mx-auto">
        <div className="flex justify-between mt-2 bg-green-300 p-2">
          <h3>Admin : Obaydullah</h3>
          <h3>email : obaydullah.2041@gmail.com</h3>
          <h4>Phone : 01963851464</h4>
        </div>

        <div className="flex justify-between">
          <div className="w-[50%] bg-orange-300 p-2">
            <h3>Customer List</h3>
            <hr />
            <div className="flex justify-between">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {checkoutData.map((customer, index) => (
                    <tr key={index}>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="w-[50%] bg-purple-300 p-2">
            <h3>Order List</h3>
            <hr />
            <div className="flex justify-between">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th>Name</th>
                    <th>Total Price</th>
                    <th>Quantity</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {checkoutData.map((customer, index) => (
                    <tr key={index}>
                      <td>{customer.name}</td>
                      <td>
                        {customer.cartItems.reduce(function (
                          accumulator,
                          currentValue
                        ) {
                          return (
                            accumulator +
                            currentValue.price * currentValue.quantity
                          );
                        },
                        0)}
                      </td>
                      <td>
                        {customer.cartItems.reduce(function (
                          accumulator,
                          currentValue
                        ) {
                          return accumulator + currentValue.quantity;
                        },
                        0)}
                      </td>
                      <td>{customer.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
