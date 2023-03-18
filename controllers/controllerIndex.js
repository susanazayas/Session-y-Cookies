const { validationResult } = require("express-validator");

module.exports = {
      index: (req, res) => {
            res.render("index", { title: "Session y Cookies", session: req.session });
      },
      processData: (req, res) => {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                  let color = "";
                  if (req.body.nameColor == "Azul") {
                        color = "bg-primary";
                  } else if (req.body.nameColor == "Gris") {
                        color = "bg-secondary";
                  } else if (req.body.nameColor == "Verde") {
                        color = "bg-success";
                  } else if (req.body.nameColor == "Rojo") {
                        color = "bg-danger";
                  } else {
                        color = "bg-warning";
                  }

                  const data = {
                        ...req.body,
                  };

                  req.session.color = color;

                  if (req.body.remember) {
                        let duracionSesion = new Date(Date.now() + 1200000);
                        res.cookie("color", req.session.color, { expires: duracionSesion, httpOnly: true });
                  }

                  res.render("index", { title: "Session y Cookies", data, session: req.session });
            } else {
                  res.render("index", {
                        title: "Session y Cookies",
                        errors: errors.mapped(),
                        old: req.body,
                        session: req.session,
                  });
            }
      },
      visita: (req, res) => {
            res.render("visita", { title: "Gracias por visitarnos", session: req.session });
      },
      olvidar: (req, res) => {
            
            req.session.destroy();
            if (req.cookies.color) {
                  
                  res.cookie("color", "", { maxAge: -1 });
            }
            return res.redirect("/");
      },
};
