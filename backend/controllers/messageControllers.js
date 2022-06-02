const Chat = require('../models/chatModel')
const Message = require('../models/messageModel')
const User = require('../models/userModel')



const allMessage = async (req, res) => {
    try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
    
}

const sendMessage = async (req, res) => {
    const { content, chatId } = req.body;

 //   console.log("Chat In saned message")

    if (!content || !chatId) {
        console.log("Details not provided properly");
        res.status(400);
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    } 

    try {
        var message = await Message.create(newMessage);
        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        console.log("1. "+message);

        message = await User.populate(message, {
            path: "chat.users",
            select: "name pic email",
        });
        console.log("2. " + message);
        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message })
        res.json(message);
        
        
    }
    catch (err) {
       res.status(400);
      throw new Error(err.message);
        
        
    }
}
module.exports = { sendMessage, allMessage};