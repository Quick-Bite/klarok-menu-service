import http from "k6/http";
import { check, sleep } from "k6";

const getInt = (start, stop) => Math.floor(Math.random() * (stop - start) + start);
const toPopular = () => Math.random() < 0.7;
const getRID = () => ((toPopular()) ? getInt(9500000, 9501000) : getInt(1, 10000000));
const getIID = () => getInt(1, 5);

export let options = {
  vus: 200,
  duration: "300s",
  // rps: 1500
};

export default function() {
  const res = http.get(`http://localhost:3002/restaurants/${getRID()}`);
  check(res, {
    "success": (r) => r.status == 200
  });
};
