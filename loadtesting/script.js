import http from "k6/http";
import { check, sleep } from "k6";

const getInt = (start, stop) => Math.floor(Math.random() * (stop - start) + start);
const toPopular = () => Math.random() < 0.6;
const getRID = () => ((toPopular()) ? getInt(9000000, 10000000) : getInt(1, 10000000));
const getIID = () => getInt(1, 5);

export let options = {
  vus: 200,
  duration: "60s",
  // rps: 1500
};

export default function() {
  const res = http.get(`http://localhost:3002/restaurants/${getInt(1, 10000000)}`);
  check(res, {
    "success": (r) => r.status == 200
  });
};
