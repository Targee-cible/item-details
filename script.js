import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  stages: [
    {duration: '1s', target: 100},
    {duration: '30s', target: 100}
  ],
  rps: 10000000
};

// GET REQUEST 
export default function() {
  const randomId = Math.floor(Math.random()*10000000)
  let res = http.get(`http://localhost:3001/api/items/${randomId}`);
  check(res, {
    "200 status": (r) => r.status == 200,
    "transaction time < 400ms": (r) => r.timings.duration < 400,
    "400ms < transaction time < 800ms": (r) => r.timings.duration >= 400 && r.timings.duration < 800,
    "800ms < transaction time < 1200ms": (r) => r.timings.duration >= 800 && r.timings.duration < 1200,
    "1200ms < transaction time < 1600ms": (r) => r.timings.duration >= 1200 && r.timings.duration < 1600,
    "1600ms < transaction time < 2000ms": (r) => r.timings.duration >= 1600 && r.timings.duration < 2000,
    "transaction time > 2000ms": (r) => r.timings.duration >= 2000
  })
  sleep(1);
};


// // POST REQUEST 
// export default function() {
//   var url = "http://localhost:3001/api/post";
//   var body = {	
//     "itemId": 8,
//     "question": "How are you", 
//     "asker": "Tiff",
//     "dateAsked": "2019-03-16T01:39:34.727Z",
//     "answer": "null",
//     "nameOfResponder": "null",
//     "dateAnswered": "null",
//     "helpfulCount":"null",
//     "unhelpfulCount": "null",
//     "teamMember": "false"
//   }
//   var params =  { headers: { "Content-Type": "application/json" } }
  
//   let res = http.post(url, JSON.stringify(body), params);
//   check(res, {
//     "200 status": (r) => r.status == 200,
//     "transaction time < 400ms": (r) => r.timings.duration < 400,
//     "400ms < transaction time < 800ms": (r) => r.timings.duration >= 400 && r.timings.duration < 800,
//     "800ms < transaction time < 1200ms": (r) => r.timings.duration >= 800 && r.timings.duration < 1200,
//     "1200ms < transaction time < 1600ms": (r) => r.timings.duration >= 1200 && r.timings.duration < 1600,
//     "1600ms < transaction time < 2000ms": (r) => r.timings.duration >= 1600 && r.timings.duration < 2000,
//     "transaction time > 2000ms": (r) => r.timings.duration >= 2000
//   })
//   sleep(1);
// };
