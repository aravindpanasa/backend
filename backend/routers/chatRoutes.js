const express = require("express");
const { auth } = require('../middleware/authMiddleware');
const {
    accessChat,
    fetchChats,
    createGroupChat,
    removeFromGroup,
    addToGroup,
    renameGroup,
} = require("../controllers/chatController");



const router = express.Router();

//Router.route("/").post(auth, accessChat);
//console.log("Chat rpoutes");

router.post('/', auth, accessChat);
router.route("/").get(auth, fetchChats);
router.route("/group").post(auth, createGroupChat);
router.route("/rename").put(auth, renameGroup);
router.route("/groupremove").put(auth, removeFromGroup);
router.route("/groupadd").put(auth, addToGroup);

module.exports = router;