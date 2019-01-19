import http from "k6/http";
import { check, sleep } from "k6";

const getInt = (start, stop) => Math.floor(Math.random() * (stop - start) + start);
const toPopular = () => Math.random() < 0.6;
const getRID = () => ((toPopular()) ? getInt(9500000, 9501000) : getInt(1, 10000000));
const getIID = () => getInt(1, 5);

export let options = {
  vus: 200,
  duration: "300s",
  // rps: 1
};

export default function() {
  const newOrder = {
    totalPrice: 35.06,
    item_id: getIID(),
    quantity: getInt(1, 5),
    choices: [],
    specialInstructions: '...',
  };
  const headers = {
    'Content-Type': 'application/json',
  }
  const res = http.post(`http://localhost:3002/restaurants/${getRID()}/order`, JSON.stringify(newOrder), { headers });
  check(res, {
    "success": (r) => r.status == 201
  });
};
// const params = [
//   req.params.id,
//   1,
//   new Date(),
//   req.body.totalPrice,
//   req.body.item_id,
//   req.body.quantity,
//   JSON.stringify(req.body.choices),
//   req.body.specialInstructions,
// ];
