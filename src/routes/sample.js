var request = require("request");
var apiKey = "https://api.smartlinks.in/v1/";
var sample = function (app) {
  app.post("/v1/login", function (req, res) {
    console.log(req);
    if (req.body) {
      var formData = {
        username: req.body.username,
        password: req.body.password
      };
      invoke(apiKey + "login", "POST", formData, res);
    } else {
      res.send({
        error: true,
        message: "Login failed. Invalid credentials"
      });
    }
  });

  app.post("/v1/user/getconnected", function (req, res) {
    var formData = {
      username: req.body.username,
      lead_name: req.body.lead_name,
      lead_mobile: req.body.lead_mobile,
      lead_email: req.body.lead_email,
      lead_address: req.body.lead_address,
      lead_source: req.body.lead_source,
      lead_plan: req.body.lead_plan
    };
    invoke(apiKey + "user/getconnected", "POST", formData, res);
  });

  app.post("/v1/user/getplans", function (req, res) {
    invoke(apiKey + "user/getplans", "POST", null, res);
  });

  app.post("/v1/user/mytraffic", function (req, res) {
    var request = { qdate: req.body.qdate };
    invoke(
      apiKey + "user/mytraffic",
      "POST",
      request,
      res,
      req.headers.authorization
    );
  });

  app.post("/v1/user/myplan", function (req, res) {
    invoke(
      apiKey + "user/myplan",
      "POST",
      null,
      res,
      req.headers.authorization
    );
  });

  app.post("/v1/user/profile", function (req, res) {
    invoke(
      apiKey + "user/profile",
      "POST",
      null,
      res,
      req.headers.authorization
    );
  });

  app.post("/v1/user/payment", function (req, res) {
    invoke(
      apiKey + "user/payment",
      "POST",
      null,
      res,
      req.headers.authorization
    );
  });

  app.post("/v1/user/collectat", function (req, res) {
    const request = req.body ? { datetime: req.body.datetime } : null;
    invoke(
      apiKey + "user/collectat",
      "POST",
      request,
      res,
      req.headers.authorization
    );
  });

  app.post("/v1/support/newticket", function (req, res) {
    const request = req.body
      ? {
          cat: req.body.cat,
          subcat: req.body.subcat,
          comments: req.body.comments,
          username: req.body.username,
          mobile: req.body.mobile,
          email: req.body.email
        }
      : null;
    invoke(
      apiKey + "support/newticket",
      "POST",
      request,
      res,
      req.headers.authorization
    );
  });

  app.post("/v1/support/gettickets", function (req, res) {
    invoke(
      apiKey + "/support/gettickets",
      "POST",
      null,
      res,
      req.headers.authorization
    );
  });

  app.post("/v1/user/chpasswd", function (req, res) {
    const request = req.body
      ? {
          oldpasswd: req.body.oldpasswd,
          newpasswd: req.body.newpasswd
        }
      : null;
    invoke(
      apiKey + "user/chpasswd",
      "POST",
      request,
      res,
      req.headers.authorization
    );
  });

  app.post("/v1/user/forgotpassword", function (req, res) {
    const request = req.body
      ? {
          username: req.body.username,
          mobile: req.body.mobile,
          email: req.body.email,
          otp: ""
        }
      : null;
    //res.status = 200;
    //res.send({    "error": false,    "message": "New password activation code sent to your mobile."});
    invoke(apiKey + "user/forgotpassword", "POST", request, res);
  });

  app.post("/v1/user/generatepassword", function (req, res) {
    const request = req.body
      ? {
          username: req.body.username,
          actcode: req.body.actcode
        }
      : null;
    res.status = 200;
    res.send({ error: false, message: "New password sent to your mobile." });
    invoke(apiKey + "user/generatepassword", "POST", request, res);
  });

  app.get("/getplans", function (req, res) {
    request(
      {
        url: "http://api.smartlinks.in/v1/user/getplans",
        method: "POST",
        json: true //,
        //body: jsonObj
      },
      function (error, resp, body) {
        console.log(resp);
        console.log(error);
        if (error) {
          res.status = 500;
          res.send(error);
        } else {
          res.status = 200;
          res.send(resp.body);
        }
      }
    );
  });

  app.post("/v1/updateTrans", function (req, res) {
    if (req.body) {
      console.log(req.body);
    }
    console.log(req.headers);
    res.status = 200;
    res.send(req.body);
  });

  function invoke(url, method, req, res) {
    request(
      {
        url: url,
        method: method,
        json: true,
        formData: req
      },
      function (error, resp, body) {
        console.log(resp);
        if (error) {
          res.status = 500;
          res.send(error);
        } else {
          res.status = 200;
          res.send(resp.body);
        }
      }
    );
  }

  function invoke(url, method, req, res, authKey) {
    request(
      {
        url: url,
        method: method,
        json: true,
        formData: req,
        headers: {
          authorization: authKey
        }
      },
      function (error, resp, body) {
        console.log(resp);
        if (error) {
          res.status = 500;
          res.send(error);
        } else {
          res.status = 200;
          res.send(resp.body);
        }
      }
    );
  }
};

module.exports = sample;
