import http from "k6/http";
import { check, sleep } from "k6";

const getInt = (start, stop) => Math.floor(Math.random() * (stop - start) + start);
const toPopular = () => Math.random() < 0.7;
const getRID = () => ((toPopular()) ? getInt(9500000, 9501000) : getInt(1, 10000000));
const getIID = () => getInt(1, 5);

export let options = {
  vus: 2,
  duration: "30s",
  rps: 10
};

export default function() {
  const res = http.get(`http://ec2-13-52-81-151.us-west-1.compute.amazonaws.com:3002/restaurants/${getRID()}`);
  check(res, {
    "success": (r) => r.status == 200
  });
};
