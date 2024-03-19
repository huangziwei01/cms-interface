const axios = require("axios").default;
const fs = require("fs");

const uploadService = require("../service/upload.service");
const goodsService = require("../service/goods.service");
const { APP_HOST, APP_PORT } = require("../app/config");

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImNvZGVyd2h5Iiwicm9sZSI6eyJpZCI6MSwibmFtZSI6Iui2hee6p-euoeeQhuWRmCJ9LCJpYXQiOjE2NzU4NDMzMzIsImV4cCI6MTY3ODQzNTMzMn0.cviW5RRMoqsDo3ea3PjYauZ4OoXJ7DdVdNPel9cJkHDhBLMz8aNm3H0mfjjNyekiGbalDNZNDw6HokWb28hoKu-gHKOVZoJCm62fyoOMtHbaidE_U4S1rPwf0GfpT4WwaIN8a14meg0VJXw5m7xz43OFGZeK5kN682tO7hCSW38";

function init() {
  axios({
    method: "post",
    url: "http://152.136.185.210:4000/goods/list",
    data: {
      offset: 0,
      size: 200,
    },
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    let arr = res.data.data.list;
    a(arr);
  });
}
// init();
async function a(arr) {
  for (const item of arr) {
    let obj = {};
    for (const key in item) {
      if (key !== "createAt" && key !== "updateAt" && key !== "id") {
        obj[key] = item[key];
      }
    }
    console.log(obj);
    const result = await goodsService.create(obj);
    console.log(result.insertId);
    b(result.insertId, obj.imgUrl);
  }
}

async function b(id, img) {
  axios
    .get(img, {
      responseType: "arraybuffer",
    })
    .then(function (res) {
      const size = res.headers.size;
      const mimetype = res.headers["content-type"];
      const filename = new Date().getTime();
      const path = `./uploads/goodsPhoto/${filename}`;
      fs.writeFile(path, res.data, function (err) {
        if (err) throw err;
        console.log("保存成功");
      });

      uploadService.createGoodsPhoto(id, mimetype, filename, size);

      const photoUrl = `${APP_HOST}:${APP_PORT}/goods/${id}/photo`;
      goodsService.update(id, {
        imgUrl: photoUrl,
      });
    });
}
