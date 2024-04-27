module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
    const tags = require("../controllers/tag.controller.js");
    var router = require("express").Router();

    router.post("/", tutorials.create);
    router.get("/", tutorials.findAll);
    router.get("/:id", tutorials.findOne);
    router.put("/:id", tutorials.update);
    router.delete("/:id", tutorials.delete);
    router.delete("/", tutorials.deleteAll);
    router.get("/published/:id", tutorials.findAllPublished);

    router.post("/comment/:id", tutorials.createComment);

    router.post("/tag", tags.create);
    router.get("/tag", tags.findAll);

    router.post("/tag/tutorial", tags.addTutorial)

    app.use('/api/tutorials', router);
}